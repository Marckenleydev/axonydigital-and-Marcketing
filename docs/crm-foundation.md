# CRM foundation setup

The CRM foundation uses the repository's npm workflow. Do not commit `.env.local` or copy real secrets into `.env.example`.

## Local setup

1. Install the locked dependencies with `npm ci`.
2. Copy `.env.example` to `.env.local` and set:
   - `MONGODB_URI` to a MongoDB connection string.
   - `AUTH_SECRET` to a fresh random value. Generate one with `npx auth secret`.
   - `AUTH_URL` to the local site origin, normally `http://localhost:3000`.
3. From an interactive terminal with a development database selected, run `CRM_BOOTSTRAP_TARGET=local npm run crm:bootstrap-admin`. It prompts for the first administrator's name, email, and hidden password. No administrator credentials are preconfigured.
4. For a dedicated test database, set `CRM_TEST_MONGODB_URI` and run `npm run crm:sync-indexes`. For production, follow [the production deployment guide](crm-production-deployment.md); index creation requires explicit production flags.
5. Start the site with `npm run dev` and open `/admin/login`.

## CRM integration tests

`npm test` builds the application and runs schema plus HTTP/database integration tests. Set `CRM_TEST_MONGODB_URI` to a dedicated MongoDB database whose database name is exactly `CRM_TEST_MONGODB_URI`; the test runner rejects other database names and never falls back to `MONGODB_URI`. It creates uniquely tagged fixtures and removes only those fixtures afterward. The test process uses an ephemeral authentication secret and disables the optional webhook. For example, set the variable in your shell or local secret manager; do not commit a credentialed URI. A test database must be reachable and should be separate from production, ideally in a separate cluster or user with access limited to that test database.

The index sync command selects `CRM_TEST_MONGODB_URI` when set and validates that it names the dedicated `CRM_TEST_MONGODB_URI` database. It never falls back silently to `MONGODB_URI`; production index creation requires `CRM_INDEX_TARGET=production` and `CRM_INDEX_CONFIRM_PRODUCTION=create-only`.

The first administrator is stored as a bcrypt hash. The CRM uses an eight-hour encrypted Auth.js JWT session cookie and checks the user's current active state and role against MongoDB on protected server operations. Login attempts are throttled in MongoDB using hashed IP/account keys.

## MongoDB and deployment

Use a MongoDB replica-set deployment (MongoDB Atlas supports this) for CRM workflows that need transactions in later stages. Keep `MONGODB_URI` and `AUTH_SECRET` in the server environment only. For Vercel, configure `MONGODB_URI`, `AUTH_SECRET`, and `AUTH_URL` in the project's environment settings; a local `.env.local` file is not deployed. On self-hosted deployments, configure Auth.js host trust only behind a trusted reverse proxy.

CRM page routing is guarded by `proxy.ts`. Put private pages under `app/(crm)/admin/`; its shared server layout rechecks the active user against MongoDB. Put CRM API handlers under `app/api/crm/` and use `withCrmAuth` (with the required role list for sensitive operations). The proxy check is only an early redirect/401; it is not a replacement for server-side authorization in layouts and handlers.

## Leads and public contact form

The existing `/api/lead` contact endpoint persists new inquiries in MongoDB. It retains the website form's honeypot, success response, and optional `LEAD_WEBHOOK_URL` notification. Website submissions are rate limited to ten requests per source IP in a 15-minute window. Email and phone are normalized and protected by unique sparse indexes; repeated submissions append inquiry history, while a submission whose email and phone match different records is stored in the private conflict review queue. Admins and managers can review conflicts under `/admin/leads`.

The public rate limiter uses the last address in `x-forwarded-for`, falling back to `x-real-ip`. In self-hosted deployments, run the app behind a trusted reverse proxy that replaces or appends the client address; exposing the app directly while accepting caller-supplied forwarding headers lets callers rotate the rate-limit key. If no trusted address header is available, requests share the `unknown` bucket.

CRM lead reads are available to admins, managers, and team members. Team members only see assigned leads and can update status, follow-up date, and notes. Lead creation, assignment, archive, and full edits require an administrator or manager; only administrators and managers can review contact conflicts. Leads are archived rather than permanently deleted so inquiry and activity history remain available.
