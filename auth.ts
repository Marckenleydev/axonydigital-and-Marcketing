import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { randomBytes } from "node:crypto";
import { loginSchema } from "@/lib/validation/auth";
import { connectMongo } from "@/lib/server/mongodb";
import { clearAccountLoginAttempts, consumeLoginAttempt } from "@/lib/server/login-rate-limit";
import CrmUser from "@/models/CrmUser";
import type { CrmRole } from "@/models/CrmUser";

// A random per-process hash keeps the missing-user path close to the password-check cost.
let timingHash: Promise<string> | null = null;
function getTimingHash() {
  return (timingHash ??= bcrypt.hash(randomBytes(32).toString("hex"), 12));
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  pages: { signIn: "/admin/login" },
  session: { strategy: "jwt", maxAge: 8 * 60 * 60 },
  jwt: { maxAge: 8 * 60 * 60 },
  providers: [
    Credentials({
      name: "CRM account",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(rawCredentials, request) {
        const forwardedIps = request.headers.get("x-forwarded-for")
          ?.split(",")
          .map((value) => value.trim())
          .filter(Boolean);
        const ip =
          request.headers.get("x-real-ip")?.trim() ||
          forwardedIps?.at(-1) ||
          "unknown";
        const parsed = loginSchema.safeParse(rawCredentials);

        await connectMongo();
        if (!parsed.success) {
          await consumeLoginAttempt(ip);
          return null;
        }

        const { email, password } = parsed.data;
        const allowed = await consumeLoginAttempt(ip, email);
        if (!allowed) return null;

        const user = await CrmUser.findOne({ email, active: true })
          .select("+passwordHash")
          .lean();
        const passwordMatches = await bcrypt.compare(password, user?.passwordHash ?? (await getTimingHash()));

        if (!user || !passwordMatches) return null;
        await clearAccountLoginAttempts(email);

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = (token.role as CrmRole | undefined) ?? "team_member";
      }
      return session;
    },
  },
});
