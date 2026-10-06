import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return <main className="container-app grid min-h-[70vh] place-items-center py-16">
    <section className="w-full max-w-xl rounded-3xl border border-line bg-white p-7 text-center shadow-soft sm:p-10" aria-labelledby="not-found-title">
      <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-mint text-brand"><Search size={24} aria-hidden="true" /></span>
      <p className="mt-6 text-sm font-bold uppercase tracking-[0.14em] text-brand">Page not found</p>
      <h1 id="not-found-title" className="mt-2 text-3xl font-bold tracking-tight text-ink">Let’s find the right place.</h1>
      <p className="mt-3 text-sm leading-6 text-slate-600">That page may have moved, or its sample item may no longer be available.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/" className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-bold text-white hover:bg-brandDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"><ArrowLeft size={16} aria-hidden="true" />Back to home</Link>
        <Link href="/medicines" className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-3 text-sm font-bold text-ink hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">Browse medicines</Link>
      </div>
    </section>
  </main>;
}
