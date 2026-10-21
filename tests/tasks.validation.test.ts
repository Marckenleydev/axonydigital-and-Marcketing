import assert from "node:assert/strict";
import { test } from "node:test";
import { createTaskSchema, updateTaskSchema } from "@/lib/validation/tasks";
import { isTaskOverdue } from "@/lib/task-utils";

test("task validation requires a related active-record identifier and valid date range", () => {
  assert.equal(createTaskSchema.safeParse({ title: "Prepare launch", lead: "000000000000000000000001", startDate: "2026-10-22", dueDate: "2026-10-23" }).success, true);
  assert.equal(createTaskSchema.safeParse({ title: "Unlinked task" }).success, false);
  assert.equal(createTaskSchema.safeParse({ title: "Backwards dates", project: "000000000000000000000001", startDate: "2026-10-24", dueDate: "2026-10-23" }).success, false);
  assert.equal(updateTaskSchema.safeParse({ actorId: "000000000000000000000001" }).success, false);
});

test("overdue is computed from due date and incomplete status at a consistent instant", () => {
  const now = new Date("2026-10-21T12:00:00.000Z");
  assert.equal(isTaskOverdue("2026-10-21T11:59:59.999Z", "Todo", now), true);
  assert.equal(isTaskOverdue("2026-10-21T12:00:00.000Z", "Blocked", now), false);
  assert.equal(isTaskOverdue("2026-10-20T12:00:00.000Z", "Completed", now), false);
  assert.equal(isTaskOverdue(undefined, "Todo", now), false);
});
