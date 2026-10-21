import "server-only";
import CrmUser from "@/models/CrmUser";
import Lead from "@/models/Lead";
import Client from "@/models/Client";
import Project from "@/models/Project";
import type { Types } from "mongoose";

export type TaskReferences = { lead?: string | null; client?: string | null; project?: string | null; assignee?: string | null };
export async function validateTaskReferences(refs: TaskReferences): Promise<string | null> {
  if (!refs.lead && !refs.client && !refs.project) return "Link the task to at least one CRM record.";
  const [lead, client, project, assignee] = await Promise.all([
    refs.lead ? Lead.findOne({ _id: refs.lead, archived: false }).select("convertedClientId assignedTo").lean() : null,
    refs.client ? Client.findOne({ _id: refs.client, archived: false }).select("_id accountOwner").lean() : null,
    refs.project ? Project.findOne({ _id: refs.project, archived: false }).select("client projectManager teamMembers").lean() : null,
    refs.assignee ? CrmUser.findOne({ _id: refs.assignee, active: true }).select("_id role").lean() : null,
  ]);
  if (refs.lead && !lead) return "Choose an active lead.";
  if (refs.client && !client) return "Choose an active client.";
  if (refs.project && !project) return "Choose an active project.";
  if (refs.assignee && !assignee) return "Choose an active team member.";
  if (project && refs.client && String(project.client) !== refs.client) return "The selected client must match the project’s client.";
  if (lead && client && lead.convertedClientId && String(lead.convertedClientId) !== refs.client) return "The selected client does not match the converted lead.";
  if (assignee?.role === "team_member") {
    const memberId = String(assignee._id);
    if (lead && String(lead.assignedTo ?? "") !== memberId) return "The assignee must have access to the linked lead.";
    if (client && String(client.accountOwner ?? "") !== memberId) return "The assignee must own the linked client.";
    if (project && String(project.projectManager ?? "") !== memberId && !project.teamMembers.some((id) => String(id) === memberId)) return "The assignee must be assigned to the linked project.";
  }
  return null;
}

/** Scope assigned tasks to the records a team member can currently access. */
export async function teamMemberTaskAccessFilter(userId: string | Types.ObjectId) {
  const [leadIds, clientIds, projectIds] = await Promise.all([
    Lead.distinct("_id", { archived: false, assignedTo: userId }) as Promise<Types.ObjectId[]>,
    Client.distinct("_id", { archived: false, accountOwner: userId }) as Promise<Types.ObjectId[]>,
    Project.distinct("_id", { archived: false, $or: [{ projectManager: userId }, { teamMembers: userId }] }) as Promise<Types.ObjectId[]>,
  ]);
  const optionalReference = (field: string, ids: Types.ObjectId[]) => ({
    $or: [{ [field]: { $exists: false } }, { [field]: null }, { [field]: { $in: ids } }],
  });
  return {
    assignee: userId,
    archived: false,
    $and: [optionalReference("lead", leadIds), optionalReference("client", clientIds), optionalReference("project", projectIds)],
  };
}
