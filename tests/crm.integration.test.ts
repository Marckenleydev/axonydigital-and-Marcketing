import assert from "node:assert/strict";
import { spawn, spawnSync, type ChildProcess } from "node:child_process";
import { once } from "node:events";
import { randomBytes } from "node:crypto";
import { setTimeout as delay } from "node:timers/promises";
import { after, before, test } from "node:test";
import mongoose from "mongoose";
import { encode } from "next-auth/jwt";
import bcrypt from "bcryptjs";
import CrmUser from "@/models/CrmUser";
import Lead from "@/models/Lead";
import LeadConflict from "@/models/LeadConflict";
import Client from "@/models/Client";
import Project from "@/models/Project";
import ClientConversionConflict from "@/models/ClientConversionConflict";
import Task from "@/models/Task";
import CrmNotification from "@/models/CrmNotification";
import CrmSecurityState from "@/models/CrmSecurityState";
import { recordRelatedTaskActivity } from "@/lib/server/task-activity";

try { process.loadEnvFile(".env.local"); }
catch (error) { if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error; }

const uri = process.env.CRM_TEST_MONGODB_URI;
if (!uri) throw new Error("Set CRM_TEST_MONGODB_URI to the dedicated CRM_TEST_MONGODB_URI database before running npm test.");
let parsedUri: URL;
try { parsedUri = new URL(uri); } catch { throw new Error("CRM_TEST_MONGODB_URI is not a valid MongoDB URI."); }
if (!parsedUri.pathname.endsWith("/CRM_TEST_MONGODB_URI")) {
  throw new Error("CRM integration tests only run against the database named CRM_TEST_MONGODB_URI; production database names are rejected.");
}

const tag = `crmtest${Date.now()}${randomBytes(3).toString("hex")}`;
const secret = randomBytes(48).toString("base64url");
const port = 32170 + (Number(process.pid) % 500);
const base = `http://127.0.0.1:${port}`;
let app: ChildProcess | undefined;
let leadsAdmin: InstanceType<typeof CrmUser>;
let manager: InstanceType<typeof CrmUser>;
let teamA: InstanceType<typeof CrmUser>;
let teamB: InstanceType<typeof CrmUser>;
let ipCounter = 1;

function email(label: string) { return `${tag}-${label}@example.invalid`; }
function phone(number: number) { return `+1555${String(number).padStart(7, "0")}`; }
function makeLead(name: string, suffix: string, extra: Record<string, unknown> = {}) {
  return { name, email: email(suffix), source: "Website", status: "New", priority: "Normal", ...extra };
}

async function cookieFor(user: InstanceType<typeof CrmUser>) {
  const claims = { sub: String(user._id), name: user.name, email: user.email, role: user.role };
  const plainName = "authjs.session-token";
  const secureName = "__Secure-authjs.session-token";
  const [plain, secure] = await Promise.all([
    encode({ token: claims, secret, salt: plainName, maxAge: 8 * 60 * 60 }),
    encode({ token: claims, secret, salt: secureName, maxAge: 8 * 60 * 60 }),
  ]);
  return `${plainName}=${plain}; ${secureName}=${secure}`;
}

async function cookieForClaim(id: string, role: "administrator" | "manager" | "team_member") {
  const plainName = "authjs.session-token";
  const secureName = "__Secure-authjs.session-token";
  const claims = { sub: id, name: "Failure Test", email: email("failure-session"), role };
  const [plain, secure] = await Promise.all([
    encode({ token: claims, secret, salt: plainName, maxAge: 8 * 60 * 60 }),
    encode({ token: claims, secret, salt: secureName, maxAge: 8 * 60 * 60 }),
  ]);
  return `${plainName}=${plain}; ${secureName}=${secure}`;
}

async function api(path: string, options: RequestInit = {}, user?: InstanceType<typeof CrmUser>) {
  const headers = new Headers(options.headers);
  if (user) headers.set("cookie", await cookieFor(user));
  if (options.body && !headers.has("content-type")) headers.set("content-type", "application/json");
  return fetch(`${base}${path}`, { ...options, headers });
}

async function json<T>(response: Response): Promise<T> { return response.json() as Promise<T>; }
function nextAddress() { return `198.51.100.${ipCounter++}`; }
function publicPayload(label: string, overrides: Record<string, unknown> = {}) {
  return {
    name: `Public ${label}`, email: email(`public-${label}`), phone: phone(ipCounter + 1000),
    website: "example.com", budget: "AED 5k-15k", services: ["Website development"],
    ...overrides,
  };
}
async function publicSubmit(payload: unknown, address = nextAddress()) {
  return fetch(`${base}/api/lead`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": address },
    body: JSON.stringify(payload),
  });
}

function startNextServer(portNumber: number, databaseUri: string, authSecret: string) {
  const child = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", String(portNumber)], {
    cwd: process.cwd(),
    env: {
      ...process.env,
      NODE_ENV: "production",
      PORT: String(portNumber),
      MONGODB_URI: databaseUri,
      AUTH_SECRET: authSecret,
      AUTH_URL: `http://127.0.0.1:${portNumber}`,
      LEAD_WEBHOOK_URL: "",
      NEXT_TELEMETRY_DISABLED: "1",
    },
    stdio: ["ignore", "ignore", "ignore"],
  });
  return child;
}

async function waitForServer(child: ChildProcess, origin: string) {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (child.exitCode !== null) throw new Error("Next.js test server exited before becoming ready.");
    try {
      const response = await fetch(`${origin}/api/crm/leads`, { signal: AbortSignal.timeout(1000) });
      if (response.status === 401) return;
    } catch { /* server is still starting */ }
    await delay(500);
  }
  throw new Error("Next.js test server did not become ready.");
}

async function stopServer(child?: ChildProcess) {
  if (!child || child.exitCode !== null) return;
  child.kill("SIGTERM");
  await Promise.race([once(child, "exit"), delay(5000)]);
  if (child.exitCode === null) child.kill("SIGKILL");
}

before(async () => {
  try {
    await mongoose.connect(uri, { bufferCommands: false, serverSelectionTimeoutMS: 10_000 });
  } catch {
    throw new Error("Could not connect to the configured dedicated CRM test database. Check its credentials, network access, and Atlas IP allowlist.");
  }

  const sync = spawnSync("npm", ["run", "crm:sync-indexes"], {
    cwd: process.cwd(),
    env: { ...process.env, CRM_TEST_MONGODB_URI: uri, AUTH_SECRET: secret },
    encoding: "utf8",
    timeout: 30_000,
  });
  if (sync.status !== 0) throw new Error("CRM index synchronization failed against the dedicated test database.");

  const actualIndexes = await Lead.collection.indexes();
  const names = new Set(actualIndexes.map((index) => index.name));
  for (const name of ["lead_normalized_email_unique", "lead_normalized_phone_unique", "lead_status_created", "lead_owner_status", "lead_source_created", "lead_follow_up", "lead_search_text"]) {
    assert.ok(names.has(name), `missing expected lead index: ${name}`);
  }
  const uniqueEmailIndex = actualIndexes.find((index) => index.name === "lead_normalized_email_unique");
  const uniquePhoneIndex = actualIndexes.find((index) => index.name === "lead_normalized_phone_unique");
  assert.equal(uniqueEmailIndex?.unique, true);
  assert.equal(uniqueEmailIndex?.sparse, true);
  assert.equal(uniquePhoneIndex?.unique, true);
  assert.equal(uniquePhoneIndex?.sparse, true);
  for (const name of ["public_lead_limit_ttl", "lead_conflict_review_queue"]) {
    const collection = name === "public_lead_limit_ttl" ? mongoose.connection.collection("publicleadlimits") : mongoose.connection.collection("leadconflicts");
    const indexNames = new Set((await collection.indexes()).map((index) => index.name));
    assert.ok(indexNames.has(name), `missing expected supporting index: ${name}`);
  }
  const clientIndexes = new Set((await Client.collection.indexes()).map((index) => index.name));
  for (const name of ["client_normalized_email_unique", "client_normalized_phone_unique", "client_status_created", "client_owner_updated", "client_search_text"]) assert.ok(clientIndexes.has(name), `missing expected client index: ${name}`);
  assert.equal((await Client.collection.indexes()).find((index) => index.name === "client_normalized_email_unique")?.unique, true);
  const projectIndexes = new Set((await Project.collection.indexes()).map((index) => index.name));
  for (const name of ["project_client_due", "project_status_due", "project_manager_due", "project_member_due", "project_search_text"]) assert.ok(projectIndexes.has(name), `missing expected project index: ${name}`);
  const conflictIndexes = new Set((await ClientConversionConflict.collection.indexes()).map((index) => index.name));
  for (const name of ["client_conversion_conflict_lead", "client_conversion_conflict_queue"]) assert.ok(conflictIndexes.has(name), `missing expected conversion-conflict index: ${name}`);
  const taskIndexes = new Set((await Task.collection.indexes()).map((index) => index.name));
  for (const name of ["task_assignee_status_due", "task_creator_created", "task_project_due", "task_client_due", "task_lead_due", "task_deadline_status", "task_assignee_completed", "task_search_text"]) assert.ok(taskIndexes.has(name), `missing expected task index: ${name}`);
  const notificationIndexes = new Set((await CrmNotification.collection.indexes()).map((index) => index.name));
  for (const name of ["crm_notification_dedupe_unique", "crm_notification_inbox"]) assert.ok(notificationIndexes.has(name), `missing expected notification index: ${name}`);
  assert.equal((await CrmNotification.collection.indexes()).find((index) => index.name === "crm_notification_dedupe_unique")?.unique, true);

  const passwordHash = await bcrypt.hash(randomBytes(32).toString("hex"), 4);
  [leadsAdmin, manager, teamA, teamB] = await CrmUser.create([
    { name: "Test Admin", email: email("administrator"), passwordHash, role: "administrator", active: true },
    { name: "Test Manager", email: email("manager"), passwordHash, role: "manager", active: true },
    { name: "Test Team A", email: email("team-a"), passwordHash, role: "team_member", active: true },
    { name: "Test Team B", email: email("team-b"), passwordHash, role: "team_member", active: true },
  ]);

  app = startNextServer(port, uri, secret);
  await waitForServer(app, base);
}, { timeout: 60_000 });

after(async () => {
  await stopServer(app);
  if (mongoose.connection.readyState === 1) {
    await Promise.all([
      Lead.deleteMany({ normalizedEmail: { $regex: tag } }),
      LeadConflict.deleteMany({ email: { $regex: tag } }),
      Client.deleteMany({ $or: [{ normalizedEmail: { $regex: tag } }, { contactName: { $regex: tag } }] }),
      Project.deleteMany({ name: { $regex: tag } }),
      ClientConversionConflict.deleteMany({ email: { $regex: tag } }),
      Task.deleteMany({ title: { $regex: tag } }),
      CrmNotification.deleteMany({ $or: [{ recipient: { $in: [leadsAdmin?._id, manager?._id, teamA?._id, teamB?._id] } }, { dedupeKey: { $regex: tag } }] }),
      CrmUser.deleteMany({ email: { $regex: tag } }),
    ]);
  }
  await mongoose.disconnect();
});

test("task APIs enforce scope, validate references, track history, filter, paginate, and create idempotent due notices", { timeout: 90_000 }, async () => {
  assert.equal((await api("/api/crm/tasks")).status, 401);
  assert.equal((await api("/api/crm/team")).status, 401);
  const leadResponse = await api("/api/crm/leads", { method: "POST", body: JSON.stringify(makeLead(`Task lead ${tag}`, "task-lead", { assignedTo: String(teamA._id) })) }, manager);
  const leadId = (await json<{ lead: { id: string } }>(leadResponse)).lead.id;
  const invalid = await api("/api/crm/tasks", { method: "POST", body: JSON.stringify({ title: "Invalid reference", lead: "000000000000000000000001" }) }, manager);
  assert.equal(invalid.status, 400);
  const dueDate = new Date(Date.now() + 60 * 60 * 1000).toISOString();
  const taskResponse = await api("/api/crm/tasks", { method: "POST", body: JSON.stringify({ title: `Task ${tag} Due`, description: "Integration task", priority: "High", lead: leadId, assignee: String(teamA._id), dueDate }) }, manager);
  assert.equal(taskResponse.status, 201);
  const taskId = (await json<{ task: { id: string } }>(taskResponse)).task.id;
  assert.equal((await api(`/api/crm/tasks/${taskId}`, {}, teamB)).status, 404);
  assert.equal((await api(`/api/crm/tasks/${taskId}`, {}, teamA)).status, 200);
  assert.equal((await api(`/api/crm/tasks/${taskId}`, { method: "PATCH", body: JSON.stringify({ priority: "Urgent" }) }, teamA)).status, 403);
  assert.equal((await api(`/api/crm/tasks/${taskId}/comments`, { method: "POST", body: JSON.stringify({ comment: "Forged actor", actorId: String(teamB._id) }) }, teamA)).status, 201);
  const detail = await json<{ task: { activities: { type: string; actorId: string; details: string }[] } }>(await api(`/api/crm/tasks/${taskId}`, {}, teamA));
  assert.ok(detail.task.activities.some((entry) => entry.type === "comment" && entry.actorId === String(teamA._id) && entry.details === "Forged actor"));
  assert.equal((await api(`/api/crm/tasks/${taskId}`, { method: "PATCH", body: JSON.stringify({ status: "Completed" }) }, teamA)).status, 200);
  assert.equal((await api(`/api/crm/tasks/${taskId}`, { method: "PATCH", body: JSON.stringify({ status: "Todo" }) }, teamA)).status, 200);
  const taskSearch = await json<{ tasks: { _id: string; overdue: boolean }[]; pagination: { total: number; pages: number } }>(await api(`/api/crm/tasks?q=${encodeURIComponent(tag)}&status=Todo&priority=High&assignee=${teamA._id}&limit=1&page=1`, {}, manager));
  assert.ok(taskSearch.pagination.total >= 1);
  assert.equal(taskSearch.tasks[0]._id, taskId);
  assert.equal(taskSearch.tasks[0].overdue, false);
  const noticeResponse = await api("/api/crm/notifications", {}, teamA);
  assert.equal(noticeResponse.status, 200);
  const noticeData = await json<{ notifications: { _id: string; href: string; readAt?: string }[]; unread: number }>(noticeResponse);
  const notice = noticeData.notifications.find((item) => item.href === `/admin/tasks/${taskId}`);
  assert.ok(notice);
  const firstCount = await CrmNotification.countDocuments({ recordId: taskId, kind: "task_due_soon" });
  await api("/api/crm/notifications", {}, teamA);
  assert.equal(await CrmNotification.countDocuments({ recordId: taskId, kind: "task_due_soon" }), firstCount);
  assert.equal((await api(`/api/crm/notifications/${notice!._id}`, { method: "PATCH", body: JSON.stringify({ read: true }) }, teamB)).status, 404);
  assert.equal((await api(`/api/crm/notifications/${notice!._id}`, { method: "PATCH", body: JSON.stringify({ read: true, actor: String(teamB._id) }) }, teamA)).status, 200);
  assert.equal((await api(`/api/crm/tasks/${taskId}`, { method: "PATCH", body: JSON.stringify({ archived: true }) }, manager)).status, 200);
  assert.equal((await api(`/api/crm/tasks/${taskId}`, {}, teamA)).status, 404);
  assert.equal((await api(`/api/crm/tasks/${taskId}`, { method: "PATCH", body: JSON.stringify({ archived: false }) }, manager)).status, 200);
  const linkedLead = await Lead.findById(leadId).lean();
  assert.ok(linkedLead?.activities.some((entry) => entry.type === "task_created"));
  assert.equal((await api("/api/crm/tasks?status=bad", {}, manager)).status, 400);
  assert.equal((await api("/api/crm/tasks/invalid-id", {}, manager)).status, 404);
});

test("task updates roll back when a related timeline write fails", { timeout: 60_000 }, async () => {
  const leadResponse = await api("/api/crm/leads", { method: "POST", body: JSON.stringify(makeLead(`Atomic task lead ${tag}`, "atomic-task-lead")) }, manager);
  const leadId = (await json<{ lead: { id: string } }>(leadResponse)).lead.id;
  const created = await api("/api/crm/tasks", { method: "POST", body: JSON.stringify({ title: `Atomic task ${tag}`, lead: leadId, status: "Todo" }) }, manager);
  assert.equal(created.status, 201);
  const taskId = (await json<{ task: { id: string } }>(created)).task.id;

  // Simulate the linked record disappearing between task creation and a later
  // activity write. The transaction must reject the update and roll it back.
  await Lead.deleteOne({ _id: leadId });
  const update = await api(`/api/crm/tasks/${taskId}`, { method: "PATCH", body: JSON.stringify({ status: "Completed" }) }, manager);
  assert.equal(update.status, 400); // Reference validation blocks a known missing relation.
  const taskDocument = await Task.findById(taskId);
  assert.ok(taskDocument);
  const session = await mongoose.startSession();
  await assert.rejects(session.withTransaction(async () => {
    await Task.updateOne({ _id: taskId }, { $set: { status: "Completed" } }, { session });
    await recordRelatedTaskActivity(taskDocument!, { id: String(manager._id), name: manager.name, email: manager.email, role: "manager" }, { type: "completed", details: "Simulated status change.", createdAt: new Date() }, session);
  }));
  await session.endSession();
  const persisted = await Task.findById(taskId).lean();
  assert.equal(persisted?.status, "Todo");
  assert.equal(persisted?.activities.some((entry) => entry.type === "completed"), false);
});

test("team members lose task and report access when a linked record is reassigned", { timeout: 60_000 }, async () => {
  const leadResponse = await api("/api/crm/leads", { method: "POST", body: JSON.stringify(makeLead(`Scoped task lead ${tag}`, "scoped-task-lead", { assignedTo: String(teamA._id) })) }, manager);
  const leadId = (await json<{ lead: { id: string } }>(leadResponse)).lead.id;
  const created = await api("/api/crm/tasks", { method: "POST", body: JSON.stringify({ title: `Scoped task ${tag}`, lead: leadId, assignee: String(teamA._id) }) }, manager);
  assert.equal(created.status, 201);
  const taskId = (await json<{ task: { id: string } }>(created)).task.id;
  assert.equal((await api(`/api/crm/tasks/${taskId}`, {}, teamA)).status, 200);
  const reportBefore = await json<{ tasksByStatus: Record<string, number> }>(await api("/api/crm/reports?from=2026-10-21&to=2026-10-21", {}, teamA));

  const reassigned = await api(`/api/crm/leads/${leadId}`, { method: "PATCH", body: JSON.stringify({ assignedTo: String(teamB._id) }) }, manager);
  assert.equal(reassigned.status, 200);
  assert.equal((await api(`/api/crm/tasks/${taskId}`, {}, teamA)).status, 404);
  const taskList = await json<{ tasks: { _id: string }[] }>(await api(`/api/crm/tasks?q=${encodeURIComponent(tag)}`, {}, teamA));
  assert.equal(taskList.tasks.some((task) => task._id === taskId), false);
  const report = await json<{ tasksByStatus: Record<string, number> }>(await api("/api/crm/reports?from=2026-10-21&to=2026-10-21", {}, teamA));
  assert.equal(report.tasksByStatus.Todo ?? 0, (reportBefore.tasksByStatus.Todo ?? 0) - 1);
});

test("team APIs are administrator-only, return safe fields, and revoke deactivated sessions", { timeout: 60_000 }, async () => {
  assert.equal((await api("/api/crm/team", {}, manager)).status, 403);
  assert.equal((await api("/api/crm/team", {}, teamA)).status, 403);
  const data = await json<{ members: { _id: string; email: string; passwordHash?: string }[] }>(await api("/api/crm/team?q=Test%20Team%20B", {}, leadsAdmin));
  const target = data.members.find((member) => member._id === String(teamB._id));
  assert.ok(target);
  assert.equal("passwordHash" in target!, false);
  assert.equal((await api(`/api/crm/team/${teamB._id}`, { method: "PATCH", body: JSON.stringify({ role: "administrator" }) }, teamB)).status, 403);
  assert.equal((await api(`/api/crm/team/${leadsAdmin._id}`, { method: "PATCH", body: JSON.stringify({ role: "manager" }) }, leadsAdmin)).status, 403);
  assert.equal((await api(`/api/crm/team/${teamB._id}`, { method: "PATCH", body: JSON.stringify({ active: false }) }, leadsAdmin)).status, 200);
  assert.equal((await api("/api/crm/tasks", {}, teamB)).status, 401);
  assert.equal((await api(`/api/crm/team/${teamB._id}`, { method: "PATCH", body: JSON.stringify({ active: true }) }, leadsAdmin)).status, 200);
  const invalidId = await api("/api/crm/team/not-an-id", {}, leadsAdmin);
  assert.equal(invalidId.status, 404);
  assert.ok(await CrmSecurityState.exists({ key: "team-admin-mutation-lock" }));
});

test("reports API validates ranges, protects roles, and scopes member aggregates to assigned records", { timeout: 60_000 }, async () => {
  assert.equal((await api("/api/crm/reports")).status, 401);
  assert.equal((await api("/api/crm/reports?from=bad&to=2026-10-21", {}, manager)).status, 400);
  const today = new Date().toISOString().slice(0, 10);
  const from = await api("/api/crm/leads", { method: "POST", body: JSON.stringify(makeLead(`Report assigned ${tag}`, "report-assigned", { assignedTo: String(teamA._id), status: "Qualified", interestedServices: ["Website development"], nextFollowUpAt: new Date(Date.now() + 24 * 60 * 60 * 1000) })) }, manager);
  assert.equal(from.status, 201);
  const outside = await api("/api/crm/leads", { method: "POST", body: JSON.stringify(makeLead(`Report private ${tag}`, "report-private", { status: "New" })) }, manager);
  assert.equal(outside.status, 201);
  const [teamReportResponse, managerReportResponse] = await Promise.all([
    api(`/api/crm/reports?from=${today}&to=${today}`, {}, teamA),
    api(`/api/crm/reports?from=${today}&to=${today}`, {}, manager),
  ]);
  assert.equal(teamReportResponse.status, 200);
  assert.equal(managerReportResponse.status, 200);
  const [teamReport, managerReport] = await Promise.all([json<any>(teamReportResponse), json<any>(managerReportResponse)]);
  assert.equal(teamReport.kpis.totalLeads, await Lead.countDocuments({ archived: false, assignedTo: teamA._id }));
  assert.equal(managerReport.kpis.totalLeads, await Lead.countDocuments({ archived: false }));
  assert.ok(teamReport.kpis.totalLeads < managerReport.kpis.totalLeads);
  const dayStart = new Date(`${today}T00:00:00.000Z`); const nextDay = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);
  assert.equal(teamReport.kpis.newLeads, await Lead.countDocuments({ archived: false, assignedTo: teamA._id, createdAt: { $gte: dayStart, $lt: nextDay } }));
  assert.equal(teamReport.leadsByStatus.Qualified, await Lead.countDocuments({ archived: false, assignedTo: teamA._id, status: "Qualified" }));
  assert.equal(teamReport.servicesInterest.find((row: { service: string }) => row.service === "Website development")?.count, 1);
  assert.equal(Object.hasOwn(teamReport.teamWorkload[0] ?? {}, "name"), false);
  const serialized = JSON.stringify(teamReport);
  assert.equal(serialized.includes("email"), false);
  assert.equal(serialized.includes("phone"), false);
  assert.ok(teamReport.upcomingFollowUps.some((lead: { name: string }) => lead.name === `Report assigned ${tag}`));
  const emptyResponse = await api(`/api/crm/reports?from=${today}&to=${today}`, {}, teamB);
  const emptyReport = await json<any>(emptyResponse);
  assert.equal(emptyReport.kpis.totalLeads, await Lead.countDocuments({ archived: false, assignedTo: teamB._id }));
  if (emptyReport.kpis.newLeads === 0) assert.equal(emptyReport.kpis.conversionRate, null);
});

test("authenticated lead CRUD, assigned team access, filters, history, archive, and restore", { timeout: 60_000 }, async (t) => {
  const activeLeadsBefore = await Lead.countDocuments({ archived: false, assignedTo: teamB._id });
  const unauthenticated = await api("/api/crm/leads");
  assert.equal(unauthenticated.status, 401);
  assert.equal((await api("/api/crm/leads", { method: "POST", body: JSON.stringify(makeLead("Unauthenticated", "unauth")) })).status, 401);
  assert.equal((await api("/api/crm/leads/000000000000000000000001", { method: "PATCH", body: JSON.stringify({ status: "Won" }) })).status, 401);
  assert.equal((await api("/api/crm/leads/conflicts", {})).status, 401);
  assert.equal((await api("/api/crm/leads/owners", {})).status, 401);

  const createdResponse = await api("/api/crm/leads", {
    method: "POST",
    body: JSON.stringify(makeLead(`Probe ${tag} Assigned`, "assigned", { assignedTo: String(teamA._id), interestedServices: ["Google Ads management"] })),
  }, manager);
  assert.equal(createdResponse.status, 201);
  const created = await json<{ lead: { id: string } }>(createdResponse);
  const leadId = created.lead.id;
  const loadedResponse = await api(`/api/crm/leads/${leadId}`, {}, leadsAdmin);
  assert.equal(loadedResponse.status, 200);
  assert.equal((await json<{ lead: { name: string } }>(loadedResponse)).lead.name, `Probe ${tag} Assigned`);

  const teamList = await json<{ leads: { _id: string }[] }>(await api("/api/crm/leads", {}, teamA));
  assert.ok(teamList.leads.some((lead) => lead._id === leadId));
  const unassignedTeamList = await json<{ leads: { _id: string }[] }>(await api("/api/crm/leads", {}, teamB));
  assert.ok(!unassignedTeamList.leads.some((lead) => lead._id === leadId));
  assert.equal((await api(`/api/crm/leads/${leadId}`, {}, teamB)).status, 404);
  assert.equal((await api(`/api/crm/leads/${leadId}`, { method: "PATCH", body: JSON.stringify({ status: "Lost" }) }, teamB)).status, 404);
  assert.equal((await api(`/api/crm/leads/${leadId}`, { method: "DELETE" }, teamA)).status, 403);

  const ownershipAttempt = await api(`/api/crm/leads/${leadId}`, {
    method: "PATCH", body: JSON.stringify({ assignedTo: String(teamB._id) }),
  }, teamA);
  assert.equal(ownershipAttempt.status, 403);
  const teamEdit = await api(`/api/crm/leads/${leadId}`, {
    method: "PATCH", body: JSON.stringify({ status: "Qualified", notes: "Team update recorded.", nextFollowUpAt: "2030-01-15T00:00:00.000Z" }),
  }, teamA);
  assert.equal(teamEdit.status, 200);
  const detail = await json<{ lead: { status: string; notes: string; nextFollowUpAt: string; activities: { actorName: string; type: string }[] } }>(await api(`/api/crm/leads/${leadId}`, {}, leadsAdmin));
  assert.equal(detail.lead.status, "Qualified");
  assert.equal(detail.lead.notes, "Team update recorded.");
  assert.equal(new Date(detail.lead.nextFollowUpAt).toISOString(), "2030-01-15T00:00:00.000Z");
  assert.ok(detail.lead.activities.some((activity) => activity.actorName === teamA.name && activity.type === "status_changed"));
  assert.ok(detail.lead.activities.some((activity) => activity.actorName === teamA.name && activity.type === "note"));

  const adminResponse = await api(`/api/crm/leads/${leadId}`, { method: "PATCH", body: JSON.stringify({ assignedTo: String(teamB._id), priority: "Urgent" }) }, leadsAdmin);
  assert.equal(adminResponse.status, 200);
  const archived = await api(`/api/crm/leads/${leadId}`, { method: "DELETE" }, manager);
  assert.equal(archived.status, 200);
  assert.equal((await api(`/api/crm/leads/${leadId}`, {}, teamB)).status, 200);
  const activeAfterArchive = await json<{ pagination: { total: number } }>(await api(`/api/crm/leads?owner=${teamB._id}`, {}, manager));
  assert.equal(activeAfterArchive.pagination.total, activeLeadsBefore);
  const archivedList = await json<{ leads: { _id: string }[] }>(await api(`/api/crm/leads?archived=true&owner=${teamB._id}`, {}, manager));
  assert.ok(archivedList.leads.some((lead) => lead._id === leadId));
  const restored = await api(`/api/crm/leads/${leadId}`, { method: "PATCH", body: JSON.stringify({ archived: false }) }, leadsAdmin);
  assert.equal(restored.status, 200);
  const activeAfterRestore = await json<{ pagination: { total: number }; leads: { _id: string }[] }>(await api(`/api/crm/leads?owner=${teamB._id}`, {}, manager));
  assert.equal(activeAfterRestore.pagination.total, activeLeadsBefore + 1);
  assert.ok(activeAfterRestore.leads.some((lead) => lead._id === leadId));

  for (const [index, suffix, status, source] of [
    [0, "alpha", "Qualified", "Google"], [1, "bravo", "Contacted", "Website"],
    [2, "charlie", "Qualified", "Google"], [3, "delta", "Qualified", "Referral"],
  ] as const) {
    const response = await api("/api/crm/leads", {
      method: "POST", body: JSON.stringify(makeLead(`Probe ${tag} ${suffix}`, `filter-${index}`, { status, source, assignedTo: String(teamA._id) })),
    }, leadsAdmin);
    assert.equal(response.status, 201);
  }
  const emailSearchResponse = await api("/api/crm/leads", {
    method: "POST", body: JSON.stringify(makeLead("Email Search Contact", "email-search", { email: `needlematch${tag}@example.invalid`, phone: phone(71001) })),
  }, leadsAdmin);
  assert.equal(emailSearchResponse.status, 201);
  const emailSearch = await json<{ leads: { name: string }[] }>(await api(`/api/crm/leads?q=needlematch${tag}`, {}, manager));
  assert.ok(emailSearch.leads.some((lead) => lead.name === "Email Search Contact"));
  const phoneSearch = await json<{ leads: { name: string }[] }>(await api(`/api/crm/leads?q=${encodeURIComponent(phone(71001))}`, {}, manager));
  assert.ok(phoneSearch.leads.some((lead) => lead.name === "Email Search Contact"));
  const search = await json<{ leads: { name: string }[]; pagination: { total: number; pages: number } }>(await api(`/api/crm/leads?q=Probe%20${tag}&status=Qualified&source=Google&sort=name&order=asc&page=1&limit=1`, {}, manager));
  assert.equal(search.pagination.total, 2);
  assert.equal(search.pagination.pages, 2);
  assert.match(search.leads[0].name, /alpha$/);
  const secondPage = await json<{ leads: { name: string }[] }>(await api(`/api/crm/leads?q=Probe%20${tag}&status=Qualified&source=Google&sort=name&order=asc&page=2&limit=1`, {}, manager));
  assert.match(secondPage.leads[0].name, /charlie$/);

  const conflictAccess = await api("/api/crm/leads/conflicts", {}, teamA);
  assert.equal(conflictAccess.status, 403);
  const secretsResponse = await api("/api/crm/leads/owners", {}, manager);
  const secretBody = await secretsResponse.text();
  assert.equal(secretsResponse.status, 200);
  assert.ok(!secretBody.includes("passwordHash"));
});

test("public contact submissions normalize, deduplicate, flag conflicts, and handle concurrent races", { timeout: 60_000 }, async () => {
  const first = publicPayload("repeat", { email: `  ${email("repeat").toUpperCase()}  `, phone: "+1 (555) 111-2233" });
  const firstResponse = await publicSubmit(first);
  assert.equal(firstResponse.status, 200);
  assert.deepEqual(await json(firstResponse), { ok: true });
  const repeatedByEmail = await publicSubmit({ ...first, name: "Repeat Contact", email: email("repeat").toUpperCase(), phone: "+1 (555) 987-6543" });
  assert.equal(repeatedByEmail.status, 200);
  const repeatedByPhone = await publicSubmit({ ...first, name: "Phone Match", email: email("new-alias"), phone: "+1 555 111 2233" });
  assert.equal(repeatedByPhone.status, 200);
  const repeatedLead = await Lead.findOne({ normalizedEmail: email("repeat") }).lean();
  assert.ok(repeatedLead);
  assert.equal(repeatedLead.inquiries.length, 3);
  assert.ok(repeatedLead.activities.some((activity) => activity.type === "repeat_inquiry"));

  const conflictA = await api("/api/crm/leads", { method: "POST", body: JSON.stringify(makeLead(`Probe ${tag} Conflict A`, "conflict-a", { phone: phone(80001) })) }, leadsAdmin);
  const conflictB = await api("/api/crm/leads", { method: "POST", body: JSON.stringify(makeLead(`Probe ${tag} Conflict B`, "conflict-b", { phone: phone(80002) })) }, leadsAdmin);
  assert.equal(conflictA.status, 201); assert.equal(conflictB.status, 201);
  const conflictPayload = publicPayload("conflict", { email: email("conflict-a"), phone: phone(80002) });
  const conflictResponse = await publicSubmit(conflictPayload);
  const conflictText = await conflictResponse.text();
  assert.equal(conflictResponse.status, 200);
  assert.deepEqual(JSON.parse(conflictText), { ok: true });
  assert.ok(!conflictText.includes(email("conflict-a")) && !conflictText.includes(phone(80002)));
  assert.equal(await LeadConflict.countDocuments({ email: email("conflict-a"), status: "pending" }), 1);
  assert.equal((await api("/api/crm/leads/conflicts", {}, teamA)).status, 403);
  const conflictQueue = await json<{ conflicts: { _id: string; submittedName: string }[] }>(await api("/api/crm/leads/conflicts", {}, manager));
  const conflict = conflictQueue.conflicts.find((item) => item.submittedName === "Public conflict");
  assert.ok(conflict);
  assert.equal((await api(`/api/crm/leads/conflicts/${conflict._id}`, { method: "PATCH", body: JSON.stringify({ status: "resolved" }) }, teamA)).status, 403);
  const reviewed = await api(`/api/crm/leads/conflicts/${conflict._id}`, { method: "PATCH", body: JSON.stringify({ status: "resolved" }) }, manager);
  assert.equal(reviewed.status, 200);

  const concurrentPayload = publicPayload("concurrent", { email: email("concurrent"), phone: phone(80003) });
  const concurrentResponses = await Promise.all(Array.from({ length: 8 }, () => publicSubmit(concurrentPayload)));
  assert.ok(concurrentResponses.every((response) => response.status === 200));
  const concurrentMatches = await Lead.find({ normalizedEmail: email("concurrent") }).lean();
  assert.equal(concurrentMatches.length, 1);
  assert.equal(concurrentMatches[0].inquiries.length, 8);

  const honeypot = await publicSubmit({ company: "bot", invalid: true });
  assert.equal(honeypot.status, 200);
  assert.deepEqual(await json(honeypot), { ok: true });
  const tooLarge = await fetch(`${base}/api/lead`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name: "x".repeat(20_000) }) });
  assert.equal(tooLarge.status, 413);

  const repeatedIp = nextAddress();
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const invalid = await publicSubmit({ name: "x" }, repeatedIp);
    assert.equal(invalid.status, 400);
  }
  const afterInvalidFlood = await publicSubmit(publicPayload("rate-limit"), repeatedIp);
  assert.equal(afterInvalidFlood.status, 429);
});

test("client API validates, scopes access, searches, paginates, edits, archives, and restores", { timeout: 60_000 }, async () => {
  assert.equal((await api("/api/crm/clients")).status, 401);
  assert.equal((await api("/api/crm/clients", { method: "POST", body: JSON.stringify({ contactName: "No Session", email: email("client-unauth") }) })).status, 401);
  const first = await api("/api/crm/clients", { method: "POST", body: JSON.stringify({ contactName: `Client ${tag} Alpha`, companyName: `Company ${tag}`, email: `  ${email("client-alpha").toUpperCase()} `, phone: "+1 (555) 123-4567", servicesPurchased: ["Website development"], accountOwner: String(teamA._id), engagementValue: 12000 }) }, leadsAdmin);
  assert.equal(first.status, 201);
  const { client: created } = await json<{ client: { id: string } }>(first);
  const id = created.id;
  const detail = await api(`/api/crm/clients/${id}`, {}, teamA);
  assert.equal(detail.status, 200);
  const loaded = await json<{ client: any; projects: unknown[] }>(detail);
  assert.equal(loaded.client.normalizedEmail, email("client-alpha"));
  assert.equal(loaded.client.normalizedPhone, "+15551234567");
  assert.equal((await api(`/api/crm/clients/${id}`, {}, teamB)).status, 404);
  assert.equal((await api(`/api/crm/clients/${id}`, { method: "PATCH", body: JSON.stringify({ status: "Paused" }) }, teamA)).status, 403);
  assert.equal((await api("/api/crm/clients", { method: "POST", body: JSON.stringify({ contactName: "Duplicate Client", email: email("client-alpha") }) }, manager)).status, 409);
  const update = await api(`/api/crm/clients/${id}`, { method: "PATCH", body: JSON.stringify({ status: "Paused", internalNotes: "Client update tested." }) }, manager);
  assert.equal(update.status, 200);
  const q = await json<{ clients: any[]; pagination: { total: number; pages: number } }>(await api(`/api/crm/clients?q=${encodeURIComponent(tag)}&status=Paused&sort=contactName&order=asc&page=1&limit=1`, {}, manager));
  assert.ok(q.pagination.total >= 1); assert.ok(q.pagination.pages >= 1);
  const secondClient = await api("/api/crm/clients", { method: "POST", body: JSON.stringify({ contactName: `Client ${tag} Beta`, email: email("client-beta"), accountOwner: String(teamA._id), status: "Paused" }) }, leadsAdmin);
  assert.equal(secondClient.status, 201);
  const pageOne = await json<{ clients: any[]; pagination: { total: number; pages: number } }>(await api(`/api/crm/clients?q=${encodeURIComponent(tag)}&status=Paused&sort=contactName&order=asc&page=1&limit=1`, {}, manager));
  const pageTwo = await json<{ clients: any[]; pagination: { total: number; pages: number } }>(await api(`/api/crm/clients?q=${encodeURIComponent(tag)}&status=Paused&sort=contactName&order=asc&page=2&limit=1`, {}, manager));
  assert.ok(pageOne.pagination.total >= 2 && pageOne.pagination.pages >= 2);
  assert.notEqual(pageOne.clients[0]._id, pageTwo.clients[0]._id);
  const archived = await api(`/api/crm/clients/${id}`, { method: "DELETE" }, leadsAdmin); assert.equal(archived.status, 200);
  assert.equal((await api(`/api/crm/clients/${id}`, {}, teamA)).status, 200);
  assert.equal((await json<{ pagination: { total: number } }>(await api(`/api/crm/clients?owner=${teamA._id}&archived=true`, {}, manager))).pagination.total >= 1, true);
  assert.equal((await api(`/api/crm/clients/${id}`, { method: "PATCH", body: JSON.stringify({ archived: false }) }, leadsAdmin)).status, 200);
  assert.equal((await api("/api/crm/clients?status=Nope", {}, manager)).status, 400);
});

test("project API validates relationships, role scope, search, pagination, activity, archive, and restore", { timeout: 60_000 }, async () => {
  const clientResponse = await api("/api/crm/clients", { method: "POST", body: JSON.stringify({ contactName: `Project Client ${tag}`, email: email("project-client"), accountOwner: String(teamA._id) }) }, leadsAdmin);
  assert.equal(clientResponse.status, 201);
  const clientId = (await json<{ client: { id: string } }>(clientResponse)).client.id;
  const invalid = await api("/api/crm/projects", { method: "POST", body: JSON.stringify({ name: "Broken Project", client: "000000000000000000000001" }) }, leadsAdmin);
  assert.equal(invalid.status, 400);
  const createdResponse = await api("/api/crm/projects", { method: "POST", body: JSON.stringify({ name: `Project ${tag} Alpha`, client: clientId, projectManager: String(teamA._id), teamMembers: [String(teamA._id)], services: ["Google Ads management"], startDate: "2026-01-01", dueDate: "2026-12-31", status: "Planning", progress: 10, deliverables: ["Campaign launch"] }) }, leadsAdmin);
  assert.equal(createdResponse.status, 201);
  const projectId = (await json<{ project: { id: string } }>(createdResponse)).project.id;
  const secondProject = await api("/api/crm/projects", { method: "POST", body: JSON.stringify({ name: `Project ${tag} Beta`, client: clientId, projectManager: String(teamA._id), teamMembers: [], status: "In Progress", progress: 20 }) }, leadsAdmin);
  assert.equal(secondProject.status, 201);
  const secondProjectId = (await json<{ project: { id: string } }>(secondProject)).project.id;
  assert.equal((await api(`/api/crm/projects/${projectId}`, {}, teamA)).status, 200);
  assert.equal((await api(`/api/crm/projects/${projectId}`, {}, teamB)).status, 404);
  assert.equal((await api(`/api/crm/projects/${projectId}`, { method: "PATCH", body: JSON.stringify({ client: clientId }) }, teamA)).status, 403);
  assert.equal((await api(`/api/crm/clients/${clientId}`, { method: "DELETE" }, leadsAdmin)).status, 409);
  assert.equal((await api(`/api/crm/projects/${projectId}`, { method: "PATCH", body: JSON.stringify({ dueDate: "2025-12-31" }) }, leadsAdmin)).status, 400);
  const progress = await api(`/api/crm/projects/${projectId}`, { method: "PATCH", body: JSON.stringify({ status: "In Progress", progress: 45 }) }, teamA);
  assert.equal(progress.status, 200);
  const search = await json<{ projects: any[]; pagination: { total: number; pages: number } }>(await api(`/api/crm/projects?q=${encodeURIComponent(tag)}&status=In%20Progress&owner=${teamA._id}&sort=name&order=asc&limit=1&page=1`, {}, manager));
  const projectPageTwo = await json<{ projects: any[] }>(await api(`/api/crm/projects?q=${encodeURIComponent(tag)}&status=In%20Progress&owner=${teamA._id}&sort=name&order=asc&limit=1&page=2`, {}, manager));
  assert.ok(search.pagination.total >= 2 && search.pagination.pages >= 2); assert.equal(search.projects[0]._id, projectId); assert.equal(projectPageTwo.projects[0]._id, secondProjectId);
  const detail = await json<{ project: any }>(await api(`/api/crm/projects/${projectId}`, {}, leadsAdmin));
  assert.equal(String(detail.project.client._id), clientId);
  assert.ok(detail.project.activities.some((a: { type: string }) => a.type === "status_changed"));
  assert.equal((await api(`/api/crm/projects/${projectId}`, { method: "DELETE" }, manager)).status, 200);
  assert.equal((await api(`/api/crm/projects/${projectId}`, {}, leadsAdmin)).status, 200);
  assert.equal((await api(`/api/crm/projects/${projectId}`, { method: "PATCH", body: JSON.stringify({ archived: false }) }, leadsAdmin)).status, 200);
  assert.equal((await api("/api/crm/projects?status=bad", {}, manager)).status, 400);
});

test("lead conversion is eligible-only, idempotent, conflict-safe, and concurrent-safe", { timeout: 90_000 }, async () => {
  const newLead = await api("/api/crm/leads", { method: "POST", body: JSON.stringify(makeLead(`Convert New ${tag}`, "convert-new", { status: "New" })) }, leadsAdmin);
  const newLeadId = (await json<{ lead: { id: string } }>(newLead)).lead.id;
  assert.equal((await api(`/api/crm/leads/${newLeadId}/convert`, { method: "POST" }, manager)).status, 409);
  assert.equal((await api(`/api/crm/leads/${newLeadId}/convert`, { method: "POST" })).status, 401);
  assert.equal((await api(`/api/crm/leads/${newLeadId}/convert`, { method: "POST" }, teamA)).status, 403);

  const eligible = await api("/api/crm/leads", { method: "POST", body: JSON.stringify(makeLead(`Convert ${tag} Race`, "convert-race", { status: "Qualified", phone: phone(98001), interestedServices: ["Content production"] })) }, leadsAdmin);
  const leadId = (await json<{ lead: { id: string } }>(eligible)).lead.id;
  const results = await Promise.all(Array.from({ length: 6 }, () => api(`/api/crm/leads/${leadId}/convert`, { method: "POST" }, manager)));
  const statuses = await Promise.all(results.map((r) => r.status));
  assert.ok(statuses.every((s) => s === 200), `concurrent conversions returned ${statuses.join(",")}`);
  const bodies = await Promise.all(results.map((r) => json<{ clientId: string }>(r)));
  assert.equal(new Set(bodies.map((b) => b.clientId)).size, 1);
  const linkedLead = await Lead.findById(leadId).lean();
  assert.ok(linkedLead?.convertedClientId);
  assert.ok(linkedLead.activities.some((activity) => activity.type === "converted"));
  const convertedClient = await Client.findById(linkedLead.convertedClientId).lean();
  assert.equal(convertedClient?.convertedFromLead?.toString(), leadId);
  assert.equal(await Client.countDocuments({ convertedFromLead: leadId }), 1);

  const existingResponse = await api("/api/crm/clients", { method: "POST", body: JSON.stringify({ contactName: `Existing ${tag}`, email: email("convert-existing"), phone: phone(98002) }) }, leadsAdmin);
  const existingId = (await json<{ client: { id: string } }>(existingResponse)).client.id;
  const repeatLead = await api("/api/crm/leads", { method: "POST", body: JSON.stringify(makeLead(`Convert Repeat ${tag}`, "convert-existing-lead", { status: "Won", email: email("convert-existing"), phone: phone(98002) })) }, leadsAdmin);
  const repeatId = (await json<{ lead: { id: string } }>(repeatLead)).lead.id;
  const repeated = await api(`/api/crm/leads/${repeatId}/convert`, { method: "POST" }, leadsAdmin);
  assert.equal(repeated.status, 200); assert.equal((await json<{ clientId: string }>(repeated)).clientId, existingId);

  const emailClient = await api("/api/crm/clients", { method: "POST", body: JSON.stringify({ contactName: `Email Match ${tag}`, email: email("email-cross"), phone: phone(98003) }) }, leadsAdmin);
  const emailClientId = (await json<{ client: { id: string } }>(emailClient)).client.id;
  const phoneClient = await api("/api/crm/clients", { method: "POST", body: JSON.stringify({ contactName: `Phone Match ${tag}`, email: email("phone-cross"), phone: phone(98004) }) }, leadsAdmin);
  assert.equal(emailClient.status, 201); assert.equal(phoneClient.status, 201);
  const crossLeadResponse = await api("/api/crm/leads", { method: "POST", body: JSON.stringify(makeLead(`Convert Conflict ${tag}`, "cross-conflict", { status: "Qualified", email: email("email-cross"), phone: phone(98004) })) }, leadsAdmin);
  const crossId = (await json<{ lead: { id: string } }>(crossLeadResponse)).lead.id;
  const conflictResponse = await api(`/api/crm/leads/${crossId}/convert`, { method: "POST" }, manager);
  assert.equal(conflictResponse.status, 409);
  const conflictBody = await json<{ conflictId: string }>(conflictResponse);
  const queue = await api("/api/crm/clients/conflicts", {}, teamA); assert.equal(queue.status, 403);
  const resolve = await api(`/api/crm/clients/conflicts/${conflictBody.conflictId}`, { method: "PATCH", body: JSON.stringify({ status: "resolved", clientId: emailClientId }) }, manager);
  assert.equal(resolve.status, 200);
  assert.equal(String((await Lead.findById(crossId).lean())?.convertedClientId), emailClientId);
  const noCrossRead = await api(`/api/crm/leads/${crossId}`, {}, teamB); assert.equal(noCrossRead.status, 404);
});

test("database failure returns a generic public response without infrastructure details", { timeout: 45_000 }, async () => {
  const failurePort = port + 1;
  const failedApp = startNextServer(failurePort, "mongodb://127.0.0.1:1/crm_test_failure", secret);
  try {
    await waitForServer(failedApp, `http://127.0.0.1:${failurePort}`);
    const response = await fetch(`http://127.0.0.1:${failurePort}/api/lead`, {
      method: "POST", headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.250" },
      body: JSON.stringify(publicPayload("database-failure")),
    });
    assert.equal(response.status, 503);
    const body = await response.text();
    assert.ok(body.includes("We couldn't send that just now."));
    assert.ok(!body.includes("127.0.0.1") && !body.includes("Mongo"));

    const crmResponse = await fetch(`http://127.0.0.1:${failurePort}/api/crm/leads`, {
      headers: { cookie: await cookieForClaim(randomBytes(12).toString("hex"), "administrator") },
    });
    assert.equal(crmResponse.status, 500);
    const crmBody = await crmResponse.text();
    assert.ok(crmBody.includes("The CRM request could not be completed."));
    assert.ok(!crmBody.includes("127.0.0.1") && !crmBody.includes("Mongo"));
  } finally { await stopServer(failedApp); }
});
