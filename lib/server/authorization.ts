import "server-only";

import { auth } from "@/auth";
import { connectMongo } from "@/lib/server/mongodb";
import CrmUser, { type CrmRole } from "@/models/CrmUser";

export type ActiveCrmUser = {
  id: string;
  name: string;
  email: string;
  role: CrmRole;
};

export class AuthorizationError extends Error {
  constructor(
    public readonly status: 401 | 403,
    message: string,
  ) {
    super(message);
    this.name = "AuthorizationError";
  }
}

export async function getActiveCrmUser(): Promise<ActiveCrmUser | null> {
  if (process.env.NODE_ENV === "production" && (!process.env.AUTH_SECRET || process.env.AUTH_SECRET.length < 43)) {
    throw new Error("Production AUTH_SECRET must contain at least 43 characters of random secret material.");
  }
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return null;

  await connectMongo();
  const user = await CrmUser.findOne({ _id: userId, active: true })
    .select("name email role")
    .lean();
  if (!user) return null;

  // Read the current role from MongoDB on every server authorization check.
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

export async function requireCrmUser(roles?: readonly CrmRole[]) {
  const user = await getActiveCrmUser();
  if (!user) throw new AuthorizationError(401, "Authentication required.");
  if (roles && !roles.includes(user.role)) {
    throw new AuthorizationError(403, "You do not have permission to do that.");
  }
  return user;
}

type CrmHandler = (request: Request, user: ActiveCrmUser) => Promise<Response>;

export function withCrmAuth(handler: CrmHandler, roles?: readonly CrmRole[]) {
  return async (request: Request) => {
    try {
      return await handler(request, await requireCrmUser(roles));
    } catch (error) {
      if (error instanceof AuthorizationError) {
        return Response.json({ error: error.message }, { status: error.status });
      }
      // Keep infrastructure details out of API responses and production logs.
      console.error("CRM request failed:", error instanceof Error ? error.name : "unknown error");
      return Response.json({ error: "The CRM request could not be completed." }, { status: 500 });
    }
  };
}
