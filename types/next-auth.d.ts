import type { DefaultSession } from "next-auth";
import type { CrmRole } from "@/models/CrmUser";

declare module "next-auth" {
  interface User {
    role: CrmRole;
  }

  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: CrmRole;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: CrmRole;
  }
}
