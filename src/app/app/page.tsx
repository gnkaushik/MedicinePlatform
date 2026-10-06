import { ArrowUpRight, ClipboardList, HeartPulse } from "lucide-react";
import Link from "next/link";

export default function OverviewPage() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold text-brand">Your workspace</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink">Overview</h1>
        <p className="mt-2 max-w-2xl leading-6 text-slate-600">Your connected care workspace is ready. This foundation will bring your health services together as the platform grows.</p>
      </div>

      <section aria-labelledby="getting-started" className="overflow-hidden rounded-3xl border border-line bg-white shadow-soft">
        <div className="border-b border-line px-6 py-5 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Workspace status</p>
          <h2 id="getting-started" className="mt-2 text-xl font-bold tracking-tight text-ink">A healthy start</h2>
        </div>
        <div className="grid gap-6 px-6 py-7 sm:grid-cols-[auto_1fr] sm:items-start sm:px-8 sm:py-8">
          <span className="grid size-12 place-items-center rounded-2xl bg-mint text-brand"><HeartPulse size={24} aria-hidden="true" /></span>
          <div>
            <p className="font-semibold text-ink">Your secure workspace is set up</p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">This POC is focused on a reliable foundation. Your account is signed in, and future care services can be added here when they are ready.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-xl border border-line bg-cloud px-3 py-2 text-sm font-medium text-slate-600"><ClipboardList size={16} className="text-brand" aria-hidden="true" /> Care services are not yet connected</div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-line bg-slate-50/70 px-6 py-4 sm:px-8">
          <span className="text-sm text-slate-500">Need to update your details?</span>
          <Link className="inline-flex items-center gap-1.5 rounded-lg text-sm font-semibold text-brand hover:text-brandDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand" href="/app/account">Visit account <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
      </section>
    </div>
  );
}
