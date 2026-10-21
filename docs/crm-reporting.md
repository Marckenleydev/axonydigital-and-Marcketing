# CRM dashboard and reporting definitions

The overview and reports use current, non-archived CRM records unless a date range is stated. Date picker endpoints are inclusive calendar days interpreted at UTC midnight; the API rejects future dates and spans longer than 366 days. The default window is the trailing 365 UTC calendar days.

- **Total leads:** current non-archived leads visible to the signed-in role.
- **New leads:** leads created during the selected date range.
- **Lead conversion rate:** among leads created in the selected date range, the share with `convertedClientId` set. A cohort of zero returns `null` and is shown as unavailable, rather than 0%.
- **Active clients:** current non-archived clients with `Active` status.
- **Active projects:** current non-archived projects in Planning, In Progress, On Hold, or Review. Completed and Cancelled projects are excluded.
- **Pending tasks:** current non-archived tasks whose status is not Completed.
- **Completed tasks:** tasks with `completedAt` inside the selected date range.
- **Overdue tasks:** current non-archived, incomplete tasks whose due date precedes the current server instant.
- **Lead sources and service interest:** lead cohort records created in the selected range. A service is counted once per lead even if malformed source data contains a repeated service.
- **Project progress:** average stored progress among current non-archived projects; empty projects return unavailable, not 0%.
- **Pending conflict counts:** unresolved lead inquiry or lead-to-client conflicts created in the selected range.
- **Team workload:** assigned, currently completed, and overdue non-archived tasks. The completed workload count represents current task status, not completions during the selected date range.
- **Upcoming tasks and follow-ups:** incomplete task deadlines and lead follow-ups from the current instant through seven days ahead. The API separately reports overdue counts.

Administrators and managers receive aggregate data for all accessible CRM records. Team members receive aggregates only for leads assigned to them, clients they own, projects where they are manager or assigned member, and tasks assigned to them. Team workload does not expose other members' names or identifiers to team members. The response omits contact email, phone, internal notes, and activity detail text.

The CRM does not store ad spend, campaign performance, profit, or ROI data; those metrics are intentionally absent.
