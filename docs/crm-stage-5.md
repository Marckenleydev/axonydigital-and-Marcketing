# Stage 5 CRM permissions and notifications

## Role permissions

- **Administrator:** read and manage every task; assign tasks; view and manage team accounts; change roles and active state for other users. An administrator cannot change their own role or active state. The API blocks removing the last active administrator.
- **Manager:** read, create, edit, archive, and restore tasks across the CRM. Managers may assign only active users and may only link active leads, clients, and projects. Team administration is administrator-only.
- **Team member:** read active tasks assigned to them and tasks linked only when the related record's ownership or project assignment also grants access. They may change task status and add notes/comments. They cannot assign tasks, change priority, archive tasks, or manage team accounts.

All roles are re-read from MongoDB during server authorization. Inactive users lose access on their next protected request. The navigation and controls are convenience only; API handlers enforce each permission.

## In-app notification rules

Opening the notification inbox checks the signed-in user's active tasks and assigned leads. A task notice is generated once per task and due-date UTC calendar day when its incomplete due date is within 48 hours or has passed. Lead follow-up notices are generated once per lead and exact follow-up timestamp over the same 48-hour window. The database's unique dedupe key makes repeated inbox opens idempotent. Times are stored as UTC instants and rendered with an explicit UTC suffix.

Task assignment and meaningful task edits can also create in-app notices. Completing or archiving a task dismisses its open task notices; changing the deadline dismisses stale task deadline notices. Users can mark notices read or dismiss them. Notifications are private to their recipient and contain only links to CRM records.

## Database requirements

The team-role and active-state guard uses a MongoDB transaction to serialize concurrent changes and protect the last active administrator. Use MongoDB Atlas or a replica-set deployment for team account changes. The `npm run crm:sync-indexes` script creates the Stage 5 task and notification indexes without resetting collections.
