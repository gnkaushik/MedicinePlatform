"use client";

import { ArrowRight, Check, CheckCircle2, ClipboardList, FileCheck2, Home, MapPin } from "lucide-react";
import Link from "next/link";
import { OrderSummary } from "@/components/checkout/order-summary";
import { useOrderFlow } from "@/orders/order-context";
import { deliveryOptions } from "@/orders/pricing";

export function OrderConfirmation() {
  const { latestOrder } = useOrderFlow();
  if (!latestOrder) return <main className="min-h-[calc(100vh-72px)] bg-cloud"><div className="container-app py-16"><section className="mx-auto max-w-xl rounded-3xl border border-line bg-white p-8 text-center shadow-soft"><span className="mx-auto grid size-14 place-items-center rounded-2xl bg-cloud text-slate-500"><ClipboardList size={24} aria-hidden="true" /></span><h1 className="mt-5 text-2xl font-bold text-ink">No recent demo order</h1><p className="mt-2 text-sm leading-6 text-slate-600">Order details are held for this browser session. Start from your cart to place a new demo order.</p><Link href="/cart" className="mt-6 inline-flex rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white">Go to cart</Link></section></div></main>;

  const order = latestOrder;
  const delivery = deliveryOptions.find((option) => option.id === order.details.deliveryMethod) ?? deliveryOptions[0];
  const placedDate = new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(order.placedAt));

  return <main className="min-h-[calc(100vh-72px)] bg-cloud"><div className="container-app py-8 sm:py-12">
    <section className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-9 text-white shadow-lift sm:px-10 sm:py-12"><div className="absolute -right-8 -top-16 size-64 rounded-full border-[38px] border-white/5" aria-hidden="true" /><div className="relative mx-auto max-w-2xl text-center"><span className="mx-auto grid size-16 place-items-center rounded-3xl bg-teal-400 text-ink shadow-soft"><Check size={34} strokeWidth={3} aria-hidden="true" /></span><p className="mt-6 text-sm font-bold uppercase tracking-[0.16em] text-teal-200">Demo order placed</p><h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Thank you, {order.details.fullName.split(" ")[0]}.</h1><p className="mt-3 leading-7 text-slate-300">Your sample order is confirmed in this browser session. No payment was taken and nothing was sent to a server.</p><div className="mx-auto mt-6 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm"><span className="text-slate-300">Order number</span><strong className="font-bold text-white">{order.id}</strong><span aria-hidden="true" className="hidden text-slate-500 sm:inline">·</span><span className="text-slate-300">{placedDate}</span></div></div></section>

    <div className="mt-7 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="space-y-4">
        <section className="rounded-3xl border border-line bg-white p-5 sm:p-7"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-mint text-brand"><MapPin size={19} aria-hidden="true" /></span><div><h2 className="text-lg font-bold text-ink">Delivery information</h2><p className="text-xs text-slate-500">{delivery.name}</p></div></div><address className="mt-4 border-t border-line pt-4 text-sm not-italic leading-6 text-slate-700"><span className="font-semibold text-ink">{order.details.fullName}</span><br />{order.details.address}{order.details.addressLine2 && <><br />{order.details.addressLine2}</>}<br />{order.details.city}, {order.details.region} {order.details.postalCode}<br />{order.details.email} · {order.details.phone}</address></section>
        <section className="rounded-3xl border border-line bg-white p-5 sm:p-7"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-mint text-brand"><FileCheck2 size={19} aria-hidden="true" /></span><div><h2 className="text-lg font-bold text-ink">Prescription status</h2><p className="text-sm text-slate-600">{order.details.prescription ? `Selected locally: ${order.details.prescription.name}` : "No prescription attached"}</p></div></div><p className="mt-4 border-t border-line pt-4 text-xs leading-5 text-slate-500">{order.details.prescription ? "The file was not uploaded or stored. Only its name was included in this temporary confirmation." : "Prescription upload was optional for this sample flow."}</p></section>
        <div className="flex flex-col gap-3 sm:flex-row"><Link href="/" className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-white px-5 py-3 text-sm font-bold text-brand transition hover:bg-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"><Home size={17} aria-hidden="true" /> Back to Home</Link><Link href="/orders" className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white transition hover:bg-brandDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"><ClipboardList size={17} aria-hidden="true" /> View Orders <ArrowRight size={16} aria-hidden="true" /></Link></div>
      </div>
      <div className="lg:sticky lg:top-28"><OrderSummary items={order.items} deliveryMethod={order.details.deliveryMethod} compact /><div className="mt-3 flex items-start gap-2 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-xs leading-5 text-emerald-800"><CheckCircle2 size={16} className="mt-0.5 shrink-0" aria-hidden="true" />This confirmation is temporary and available only in the current browser session.</div></div>
    </div>
  </div></main>;
}
