export function isTaskOverdue(dueDate: Date | string | null | undefined, status: string, now = new Date()): boolean {
  if (!dueDate || status === "Completed") return false;
  const due = dueDate instanceof Date ? dueDate : new Date(dueDate);
  return Number.isFinite(due.getTime()) && due.getTime() < now.getTime();
}
