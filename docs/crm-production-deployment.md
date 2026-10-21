# CRM production deployment and operations

This guide prepares the existing Next.js site and CRM for deployment. It does not select a host or change the configured database. Production transactions require MongoDB Atlas or another replica-set/sharded deployment that supports transactions.

## Runtime and commands

- Use a Node.js version supported by the locked Next.js release (Node.js 20.9 or newer; use a currently maintained LTS release).
- Install reproducibly with `npm ci`.
- Type-check with `npm run typecheck`.
- Build with `npm run build` and serve with `npm run start` (or the hosting provider's Next.js runtime).
- The project uses npm; do not mix package managers or lockfiles.

## Production configuration

Configure these as server-side secrets/settings in the chosen host. Do not put them in `NEXT_PUBLIC_*` variables or source control.

| Variable | Required value |
| --- | --- |
| `MONGODB_URI` | Production MongoDB connection URI, using a dedicated least-privilege application user. |
| `AUTH_SECRET` | At least 43 characters of fresh cryptographically random secret material. Generate with `npx auth secret`; use a different value per environment. |
| `AUTH_URL` | Canonical HTTPS origin of the deployed application. |
| `LEAD_WEBHOOK_URL` | Optional trusted HTTPS endpoint for secondary lead notifications. Leave unset if unused. |
| `NEXT_PUBLIC_SITE_URL` | Optional canonical public website origin used for metadata. |

Keep `CRM_TEST_MONGODB_URI` out of production settings. Use a separate test cluster/user limited to the database named exactly `CRM_TEST_MONGODB_URI`; never reuse production credentials. Require TLS and restrict network access to the application and approved operator locations. Store credentials in the host's secret manager and rotate credentials that have been exposed or reused.

## MongoDB setup, indexes, and transactions

1. Create a production database and a dedicated application user with read/write access only to that database. Do not use an Atlas project owner or cluster administrator as the app user.
2. Use a replica set or compatible sharded cluster. Lead conversion, team role changes, and task plus related-timeline updates use transactions. Unsupported deployments fail those operations rather than claiming a partial write succeeded.
3. Before serving traffic, create required indexes using the production-only explicit command. This script calls `createIndexes`; it does not drop collections or remove indexes:

   ```sh
   CRM_INDEX_TARGET=production CRM_INDEX_CONFIRM_PRODUCTION=create-only npm run crm:sync-indexes
   ```

   Run this as a controlled release operation after reviewing the model indexes and database load. The command refuses to use `MONGODB_URI` unless both explicit production flags are set. If `CRM_TEST_MONGODB_URI` is configured, the script selects only that dedicated test database and validates its database name.

## First administrator and recovery

There is no public registration. Bootstrap is a one-time, interactive operation that prompts for a name, email, and hidden password. For production, run the command in a protected operator terminal with production `MONGODB_URI`, a fresh `AUTH_SECRET`, and the explicit environment guards:

```sh
NODE_ENV=production CRM_BOOTSTRAP_TARGET=production CRM_BOOTSTRAP_CONFIRM_PRODUCTION=I_UNDERSTAND_PRODUCTION_BOOTSTRAP npm run crm:bootstrap-admin
```

Then type the confirmation phrase shown by the script. Verify the production URI and database in the secret manager before running it. The script refuses the test database and refuses to create a second bootstrap administrator.

Account recovery is an operator procedure: use a reviewed, access-controlled one-off administrative process to update the selected user's bcrypt password hash and record the change. Do not add a public reset or registration route. Keep a second active administrator available so access can be recovered without weakening authorization; the API prevents demoting/deactivating the last active administrator.

## Hosting-neutral deployment steps

The hosting provider has not been selected. Use a provider that supports the deployed Next.js version, Node.js runtime, server-side environment secrets, and outbound MongoDB TLS connections.

1. Configure the production variables above in the host's production environment; do not copy `.env.local` into deployment artifacts.
2. Deploy the existing project using its supported Next.js integration or Node server runtime.
3. Run the production index creation command before directing public traffic.
4. Run the first-admin bootstrap once from a trusted operator environment connected to the same production database.
5. Confirm the public site and `/admin/login` are available over HTTPS; use the host's canonical URL and secure cookie behavior.

## Smoke tests after deployment

Use controlled test records and non-sensitive contact details. Confirm:

- Public pages, navigation, assets, and SEO metadata still load.
- `/admin/login` rejects invalid credentials; an unauthenticated request to `/api/crm/leads` returns 401.
- A team member cannot read an unassigned lead/task or administer team accounts; an administrator can access permitted records.
- Submit the public contact form once and verify the generic success response and the resulting lead in the private CRM. Repeat with the same email/phone and verify no duplicate lead is created.
- Create and inspect a client and project, then create/update/complete a linked task and confirm its history appears on the task and related record timelines.
- Open the notification inbox and confirm only the signed-in user's notices are returned.
- Open dashboard/reports and confirm real records appear with the documented date range and role scoping.
- Review host logs for startup, MongoDB, and authentication failures without logging secrets or submitted contact details.

## Backups, restore, logs, and incidents

- Enable automated encrypted MongoDB backups/snapshots and set a retention period that meets the business recovery objective. Keep backup access separate from the application database user.
- Periodically test restoring a snapshot into a separate non-production database, then verify representative lead, client, project, task, and activity records. Never test restores over production.
- Centralize application and database logs with access controls and retention. The CRM intentionally logs generic error names; do not add request bodies, passwords, connection strings, tokens, or personal lead data to logs.
- For suspected credential exposure, restrict affected access, rotate the MongoDB user password and `AUTH_SECRET` in the secret manager, update the app, invalidate existing sessions by changing `AUTH_SECRET`, and review database/provider audit logs. Rotate any test credential separately; do not reuse it for production.
- For suspected data loss or corruption, pause writes through the host's operational controls, preserve logs, restore to an isolated database first, validate records, and follow the organization's incident process before any production restore.

## Test database safety

`npm test` builds the app and then runs schema and database-backed integration tests. It requires `CRM_TEST_MONGODB_URI` to target the database named exactly `CRM_TEST_MONGODB_URI`; the test harness rejects a different database and does not fall back to `MONGODB_URI`. Configure a dedicated test-only user/cluster and never point this variable at production. Do not run integration tests until the URI has been verified by an operator.
