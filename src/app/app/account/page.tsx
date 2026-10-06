"use client";

import { useState } from "react";
import { ArrowRight, Bell, ClipboardList, FileText, MapPin, ShieldCheck, UserRound } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/auth/auth-context";
import { useOrderFlow } from "@/orders/order-context";

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "MP";
}

export default function AccountPage() {
  const { user } = useAuth();
  const { orders } = useOrderFlow();
  const latestAddress = orders[0]?.details;
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [wellnessUpdates, setWellnessUpdates] = useState(false);

  if (!user) return null;

  return <div>
    <div className="mb-8"><p className="text-sm font-bold text-brand">Your workspace</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Account</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">Manage your profile details, saved delivery information and demo preferences in one place.</p></div>

    <section aria-labelledby="profile-title" className="overflow-hidden rounded-3xl border border-line bg-white shadow-soft">
      <div className="flex flex-col gap-4 border-b border-line bg-gradient-to-r from-mint to-white p-5 sm:flex-row sm:items-center sm:p-7"><span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-brand text-lg font-bold text-white" aria-hidden="true">{initials(user.name)}</span><div className="min-w-0"><p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">Profile</p><h2 id="profile-title" className="mt-1 truncate text-xl font-bold capitalize text-ink">{user.name}</h2><p className="mt-1 break-all text-sm text-slate-600">{user.email}</p></div><span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-brand sm:ml-auto"><ShieldCheck size={14} aria-hidden="true" /> Signed in</span></div>
      <dl className="grid gap-x-8 gap-y-5 p-5 sm:grid-cols-2 sm:p-7"><div><dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Name</dt><dd className="mt-1 text-sm font-semibold capitalize text-ink">{user.name}</dd></div><div><dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email address</dt><dd className="mt-1 break-all text-sm font-semibold text-ink">{user.email}</dd></div><div><dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Phone</dt><dd className="mt-1 text-sm text-slate-500">Not added</dd></div><div><dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Account type</dt><dd className="mt-1 text-sm text-slate-600">Demo customer account</dd></div></dl>
    </section>

    <div className="mt-6 grid gap-6 lg:grid-cols-2">
      <section aria-labelledby="address-title" className="rounded-2xl border border-line bg-white p-5 shadow-soft sm:p-6"><h2 id="address-title" className="flex items-center gap-2 font-bold text-ink"><MapPin size={19} className="text-brand" aria-hidden="true" />Saved delivery address</h2>{latestAddress ? <><p className="mt-4 font-semibold capitalize text-ink">{latestAddress.fullName}</p><p className="mt-1 text-sm leading-6 text-slate-600">{[latestAddress.address, latestAddress.addressLine2, latestAddress.city, latestAddress.region, latestAddress.postalCode].filter(Boolean).join(", ")}</p><p className="mt-2 text-sm text-slate-600">{latestAddress.phone} · {latestAddress.email}</p><p className="mt-3 text-xs leading-5 text-slate-500">Shown from your latest demo order. Address changes are not saved.</p></> : <><p className="mt-4 text-sm leading-6 text-slate-600">Your saved delivery address will appear here after you place a demo order.</p><Link href="/medicines" className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">Browse medicines <ArrowRight size={15} aria-hidden="true" /></Link></>}</section>

      <section aria-labelledby="preferences-title" className="rounded-2xl border border-line bg-white p-5 shadow-soft sm:p-6"><h2 id="preferences-title" className="flex items-center gap-2 font-bold text-ink"><Bell size={19} className="text-brand" aria-hidden="true" />Preferences</h2><p className="mt-2 text-sm leading-6 text-slate-600">Choose what you would like this demo account to show as enabled.</p><div className="mt-5 space-y-4"><label className="flex cursor-pointer items-start gap-3"><input checked={orderUpdates} onChange={(event) => setOrderUpdates(event.target.checked)} type="checkbox" className="mt-0.5 size-4 accent-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand" /><span><span className="block text-sm font-semibold text-ink">Order updates</span><span className="mt-0.5 block text-xs leading-5 text-slate-500">Show order status updates in this demo account.</span></span></label><label className="flex cursor-pointer items-start gap-3"><input checked={wellnessUpdates} onChange={(event) => setWellnessUpdates(event.target.checked)} type="checkbox" className="mt-0.5 size-4 accent-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand" /><span><span className="block text-sm font-semibold text-ink">Wellness notes</span><span className="mt-0.5 block text-xs leading-5 text-slate-500">Show occasional general product and wellness updates.</span></span></label></div><p className="mt-4 text-xs text-slate-500">Preferences are temporary and reset when this page is refreshed.</p></section>
    </div>

    <section aria-label="Account destinations" className="mt-8 grid gap-3 sm:grid-cols-2"><Link href="/orders" className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-5 transition hover:border-brand/40 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-mint text-brand"><ClipboardList size={20} aria-hidden="true" /></span><span className="min-w-0 flex-1"><span className="block font-bold text-ink">Orders</span><span className="mt-1 block text-xs text-slate-500">View order history and details</span></span><ArrowRight size={17} className="text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-brand" aria-hidden="true" /></Link><Link href="/prescriptions" className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-5 transition hover:border-brand/40 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-mint text-brand"><FileText size={20} aria-hidden="true" /></span><span className="min-w-0 flex-1"><span className="block font-bold text-ink">Prescriptions</span><span className="mt-1 block text-xs text-slate-500">See prescription references from orders</span></span><ArrowRight size={17} className="text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-brand" aria-hidden="true" /></Link></section>

    <p className="mt-6 flex items-start gap-2 rounded-xl bg-white/70 p-4 text-xs leading-5 text-slate-500"><UserRound size={16} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />Profile information comes from the Module 2 mock sign-in. This page does not save personal information or preferences to an account service.</p>
  </div>;
}
