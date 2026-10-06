"use client";

import { AppShell } from "@/components/app/app-shell";
import Link from "next/link";

export function ServiceRouteFrame({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AppShell>{children}</AppShell>;
}

export function ServicePageHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="mb-8"><p className="text-sm font-bold text-brand">{eyebrow}</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">{description}</p></div>;
}

export function ServiceCard({ children, className = "" }: Readonly<{ children: React.ReactNode; className?: string }>) {
  return <section className={`rounded-2xl border border-line bg-white p-5 shadow-soft sm:p-6 ${className}`}>{children}</section>;
}

export function BookingSteps({ labels, active }: { labels: string[]; active: number }) {
  return <ol aria-label="Booking progress" className="mb-8 grid grid-cols-3 gap-2 rounded-2xl border border-line bg-white p-3 sm:p-4">
    {labels.map((label, index) => <li key={label} aria-current={index === active ? "step" : undefined} className={`flex min-w-0 items-center gap-2 rounded-xl px-2 py-2 text-xs font-bold sm:gap-3 sm:px-3 sm:text-sm ${index === active ? "bg-mint text-brand" : index < active ? "text-teal-700" : "text-slate-400"}`}><span className={`grid size-6 shrink-0 place-items-center rounded-full text-[11px] ${index <= active ? "bg-brand text-white" : "bg-slate-100 text-slate-400"}`}>{index < active ? "✓" : index + 1}</span><span className="truncate">{label}</span></li>)}
  </ol>;
}

export function StatusNote({ children }: Readonly<{ children: React.ReactNode }>) {
  return <p className="mt-5 rounded-xl border border-line bg-cloud px-4 py-3 text-xs leading-5 text-slate-600">{children}</p>;
}

export function MissingSelection({ title, description, href, linkText }: { title: string; description: string; href: string; linkText: string }) {
  return <section className="rounded-3xl border border-dashed border-line bg-white px-6 py-14 text-center shadow-soft"><h1 className="text-xl font-bold text-ink">{title}</h1><p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-600">{description}</p><Link href={href} className="mt-5 inline-flex rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white hover:bg-brandDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">{linkText}</Link></section>;
}

export function FormField({ label, children }: Readonly<{ label: string; children: React.ReactNode }>) {
  return <label className="block text-sm font-semibold text-ink">{label}<span className="mt-2 block">{children}</span></label>;
}

export const inputClass = "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-brand/10";

export function ChoiceButton({ selected, children, onClick }: Readonly<{ selected: boolean; children: React.ReactNode; onClick: () => void }>) {
  return <button type="button" aria-pressed={selected} onClick={onClick} className={`rounded-xl border px-4 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${selected ? "border-brand bg-mint text-brand" : "border-line bg-white text-slate-600 hover:border-brand/50"}`}>{children}</button>;
}
