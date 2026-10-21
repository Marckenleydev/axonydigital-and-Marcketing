"use client";

import { useState, type FormEvent } from "react";
import { signIn } from "next-auth/react";

const fieldClass =
  "mt-2 w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-bone outline-none transition focus:border-lime";

export default function LoginForm({ callbackUrl }: { callbackUrl: string }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const data = new FormData(event.currentTarget);
    setPending(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: String(data.get("email") ?? ""),
        password: String(data.get("password") ?? ""),
        redirect: false,
        redirectTo: callbackUrl,
      });

      if (!result || result.error) {
        setError("The email or password is incorrect, or this account is inactive.");
        setPending(false);
        return;
      }

      window.location.assign(result.url || callbackUrl);
    } catch {
      setError("Sign in is temporarily unavailable. Please try again.");
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div>
        <label htmlFor="admin-email" className="text-sm font-medium text-bone/80">Email</label>
        <input
          id="admin-email"
          name="email"
          type="email"
          autoComplete="username"
          required
          maxLength={254}
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="admin-password" className="text-sm font-medium text-bone/80">Password</label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          maxLength={72}
          className={fieldClass}
        />
      </div>
      <p role="alert" aria-live="polite" className="min-h-5 text-sm text-red-300">{error}</p>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-lime px-6 py-3.5 font-semibold text-ink transition hover:brightness-110 disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in securely"}
      </button>
    </form>
  );
}
