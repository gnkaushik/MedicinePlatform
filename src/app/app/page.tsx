import { ArrowRight, ArrowUpRight, FlaskConical, HeartPulse, Pill, Stethoscope } from "lucide-react";
import Link from "next/link";

export default function OverviewPage() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold text-brand">Your workspace</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink">Overview</h1>
        <p className="mt-2 max-w-2xl leading-6 text-slate-600">Pick up where you left off or explore the services available in your Medicine Platform POC.</p>
      </div>

      <section aria-labelledby="getting-started" className="overflow-hidden rounded-3xl border border-line bg-white shadow-soft">
        <div className="border-b border-line px-6 py-5 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Workspace status</p>
          <h2 id="getting-started" className="mt-2 text-xl font-bold tracking-tight text-ink">A healthy start</h2>
        </div>
        <div className="grid gap-6 px-6 py-7 sm:grid-cols-[auto_1fr] sm:items-start sm:px-8 sm:py-8">
          <span className="grid size-12 place-items-center rounded-2xl bg-mint text-brand"><HeartPulse size={24} aria-hidden="true" /></span>
          <div>
            <p className="font-semibold text-ink">Your care workspace is ready</p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Browse the sample medicine catalog, find a doctor, or explore home collection lab tests. Your demo orders and bookings are temporary.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { href: "/medicines", label: "Medicines", description: "Browse everyday essentials", icon: Pill },
                { href: "/consultations", label: "Doctor consultations", description: "Explore specialties", icon: Stethoscope },
                { href: "/lab-tests", label: "Lab tests", description: "View sample collections", icon: FlaskConical }
              ].map(({ href, label, description, icon: Icon }) => <Link key={href} href={href} className="group rounded-2xl border border-line bg-white p-4 transition hover:border-brand/30 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"><span className="flex items-center justify-between gap-3"><span className="grid size-10 place-items-center rounded-xl bg-mint text-brand"><Icon size={19} aria-hidden="true" /></span><ArrowRight size={16} className="text-brand transition group-hover:translate-x-0.5" aria-hidden="true" /></span><span className="mt-4 block text-sm font-bold text-ink">{label}</span><span className="mt-1 block text-xs leading-5 text-slate-500">{description}</span></Link>)}
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
