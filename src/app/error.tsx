"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Application route error:", error);
  }, [error]);

  return <main className="container-app grid min-h-[70vh] place-items-center py-16">
    <section className="w-full max-w-xl rounded-3xl border border-line bg-white p-7 text-center shadow-soft sm:p-10" aria-labelledby="error-title" role="alert">
      <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-amber-50 text-amber-700"><AlertCircle size={24} aria-hidden="true" /></span>
      <p className="mt-6 text-sm font-bold uppercase tracking-[0.14em] text-brand">Something went wrong</p>
      <h1 id="error-title" className="mt-2 text-3xl font-bold tracking-tight text-ink">Your page could not load.</h1>
      <p className="mt-3 text-sm leading-6 text-slate-600">Please try again. Your sample account and shopping information stay in this browser session.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button onClick={() => reset()} className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-bold text-white hover:bg-brandDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"><RefreshCw size={16} aria-hidden="true" />Try again</button>
        <Link href="/" className="inline-flex items-center rounded-xl border border-line px-4 py-3 text-sm font-bold text-ink hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">Back to home</Link>
      </div>
    </section>
  </main>;
}
