import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";
import { getActiveCrmUser } from "@/lib/server/authorization";

type LoginPageProps = {
  searchParams: Promise<{ callbackUrl?: string }>;
};

function safeCallbackUrl(candidate?: string) {
  if (!candidate || !candidate.startsWith("/") || candidate.startsWith("//") || candidate.startsWith("/\\")) {
    return "/admin/dashboard";
  }
  try {
    const parsed = new URL(candidate, "https://crm.invalid");
    if (parsed.origin !== "https://crm.invalid") return "/admin/dashboard";
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return "/admin/dashboard";
  }
}

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const { callbackUrl } = await searchParams;
  if (await getActiveCrmUser()) redirect("/admin/dashboard");

  return (
    <main className="grid min-h-screen place-items-center bg-ink px-5 py-12 text-bone">
      <section className="w-full max-w-md rounded-3xl border border-white/10 bg-ink-soft p-7 shadow-2xl md:p-10">
        <p className="eyebrow text-lime">Axony Digital · Private workspace</p>
        <h1 className="display mt-4 text-4xl">Sign in</h1>
        <p className="mt-3 text-sm leading-relaxed text-bone/60">
          CRM access is limited to invited team members.
        </p>
        <LoginForm callbackUrl={safeCallbackUrl(callbackUrl)} />
        <a href="/" className="mt-7 inline-block text-sm text-bone/50 underline-offset-4 hover:text-bone hover:underline">
          Return to the public website
        </a>
      </section>
    </main>
  );
}
