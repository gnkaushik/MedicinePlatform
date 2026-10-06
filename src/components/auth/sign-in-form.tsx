"use client";

import { useState, type FormEvent } from "react";
import { Eye, EyeOff, HeartPulse, LoaderCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/auth/auth-context";

export function SignInForm() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const normalizedEmail = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setError("Your password must be at least 8 characters.");
      return;
    }

    setIsSubmitting(true);

    try {
      await signIn({ email: normalizedEmail, password, rememberMe });
      router.replace("/app");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <Link href="/" className="mb-12 inline-flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4" aria-label="Medicine Platform home">
        <span className="grid size-11 place-items-center rounded-2xl bg-brand text-white shadow-soft"><HeartPulse size={22} strokeWidth={2.5} /></span>
        <span className="text-lg font-bold tracking-tight text-ink">Medicine Platform</span>
      </Link>

      <div className="mb-8">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-mint px-3 py-1.5 text-xs font-semibold text-brand">
          <ShieldCheck size={15} aria-hidden="true" /> Secure care workspace
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-ink">Welcome back</h1>
        <p className="mt-2 leading-6 text-slate-600">Sign in to continue to your healthcare workspace.</p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold text-ink">Email address</label>
          <input
            autoComplete="email"
            className="w-full rounded-xl border border-line bg-white px-4 py-3 text-ink outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-brand/10 disabled:bg-slate-50"
            disabled={isSubmitting}
            id="email"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
            type="email"
            value={email}
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-semibold text-ink">Password</label>
          <div className="relative">
            <input
              autoComplete="current-password"
              className="w-full rounded-xl border border-line bg-white px-4 py-3 pr-12 text-ink outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-brand/10 disabled:bg-slate-50"
              disabled={isSubmitting}
              id="password"
              minLength={8}
              name="password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              required
              type={showPassword ? "text" : "password"}
              value={password}
            />
            <button
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 grid w-12 place-items-center rounded-r-xl text-slate-500 transition hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand disabled:opacity-50"
              disabled={isSubmitting}
              onClick={() => setShowPassword((visible) => !visible)}
              type="button"
            >
              {showPassword ? <EyeOff size={19} aria-hidden="true" /> : <Eye size={19} aria-hidden="true" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <label className="inline-flex cursor-pointer items-center gap-2.5 text-sm text-slate-600">
            <input
              checked={rememberMe}
              className="size-4 rounded border-line accent-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              disabled={isSubmitting}
              onChange={(event) => setRememberMe(event.target.checked)}
              type="checkbox"
            />
            Remember me
          </label>
          <span className="text-xs text-slate-500">Demo access</span>
        </div>

        {error && <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">{error}</p>}

        <button
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3.5 text-sm font-bold text-white shadow-soft transition hover:bg-brandDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-75"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? <><LoaderCircle size={18} className="animate-spin" aria-hidden="true" /> Signing in…</> : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-center text-xs leading-5 text-slate-500">
        This POC uses mock authentication. Use any valid email and a password with at least 8 characters.
      </p>
      <p className="mt-2 text-center text-xs leading-5 text-slate-500">
        To preview the error state, use <span className="font-medium text-slate-700">error@medicineplatform.test</span>.
      </p>
      <p className="mt-8 text-center text-sm text-slate-600">
        New to the platform? <Link className="font-semibold text-brand hover:text-brandDark focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand" href="/">Explore the platform</Link>
      </p>
    </div>
  );
}
