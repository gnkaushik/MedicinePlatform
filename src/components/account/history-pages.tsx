"use client";

import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardList, FileText, MapPin, Pill, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AppShell } from "@/components/app/app-shell";
import { useOrderFlow, type OrderRecord } from "@/orders/order-context";
import { deliveryOptions, formatMoney } from "@/orders/pricing";

function dateLabel(date: string) {
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(new Date(date));
}

function RouteFrame({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AppShell>{children}</AppShell>;
}

function PageHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="mb-8"><p className="text-sm font-bold text-brand">{eyebrow}</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">{description}</p></div>;
}

function StatusPill({ children }: Readonly<{ children: React.ReactNode }>) {
  return <span className="inline-flex items-center gap-1.5 rounded-full bg-mint px-3 py-1.5 text-xs font-bold text-brand"><CheckCircle2 size={14} aria-hidden="true" />{children}</span>;
}

function OrderCard({ order }: { order: OrderRecord }) {
  const itemSummary = order.items.map(({ medicine, quantity }) => `${medicine.name} × ${quantity}`).join(", ");
  return <article className="rounded-2xl border border-line bg-white p-5 shadow-soft sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0"><div className="flex flex-wrap items-center gap-3"><Link href={`/orders/${encodeURIComponent(order.id)}`} className="break-all text-base font-bold text-ink hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">{order.id}</Link><StatusPill>Order placed</StatusPill></div><p className="mt-2 text-sm text-slate-500">Placed {dateLabel(order.placedAt)} · {order.items.reduce((count, item) => count + item.quantity, 0)} {order.items.reduce((count, item) => count + item.quantity, 0) === 1 ? "item" : "items"}</p><p className="mt-1 text-xs font-semibold text-slate-500">Delivery: Not dispatched (demo)</p><p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-700">{itemSummary}</p>
        {order.details.prescription && <p className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-slate-600"><FileText size={15} className="text-brand" aria-hidden="true" /> Prescription attached: {order.details.prescription.name}</p>}
      </div>
      <div className="flex shrink-0 items-center justify-between gap-4 border-t border-line pt-4 sm:block sm:border-0 sm:pt-0 sm:text-right"><span className="text-xs font-medium text-slate-500">Order total</span><p className="mt-0.5 text-lg font-bold text-ink">{formatMoney.format(order.total)}</p><Link href={`/orders/${encodeURIComponent(order.id)}`} className="inline-flex items-center gap-1 text-sm font-bold text-brand hover:text-brandDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:mt-3">Details <ArrowRight size={15} aria-hidden="true" /></Link></div>
    </div>
  </article>;
}

export function OrdersPage() {
  const { orders } = useOrderFlow();
  return <RouteFrame><PageHeading eyebrow="Your account" title="Orders" description="Review the sample orders placed in this session, including their items, delivery details and prescription references." />
    {orders.length ? <div className="space-y-4">{orders.map((order) => <OrderCard key={order.id} order={order} />)}<p className="flex items-start gap-2 rounded-xl bg-white/70 p-4 text-xs leading-5 text-slate-500"><ShieldCheck size={16} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />Order history is held in temporary in-memory demo state. It clears when this page is refreshed or the session ends.</p></div> : <section className="rounded-3xl border border-dashed border-line bg-white px-6 py-14 text-center shadow-soft sm:px-10"><span className="mx-auto grid size-12 place-items-center rounded-2xl bg-mint text-brand"><ClipboardList size={23} aria-hidden="true" /></span><h2 className="mt-5 text-xl font-bold text-ink">No orders yet</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">Your completed demo orders will appear here with their items, totals and delivery information.</p><Link href="/medicines" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white transition hover:bg-brandDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">Browse medicines <ArrowRight size={16} aria-hidden="true" /></Link></section>}
  </RouteFrame>;
}

function OrderBreakdown({ order }: { order: OrderRecord }) {
  return <div className="divide-y divide-line">
    {order.items.map(({ medicine, quantity }) => <div className="flex items-start justify-between gap-4 py-4 first:pt-0" key={medicine.id}><div className="flex min-w-0 gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-mint text-brand"><Pill size={19} aria-hidden="true" /></span><div><p className="font-semibold text-ink">{medicine.name}</p><p className="mt-1 text-xs text-slate-500">{medicine.brandName} · Qty {quantity}</p></div></div><p className="shrink-0 text-sm font-semibold text-ink">{formatMoney.format(medicine.price * quantity)}</p></div>)}
  </div>;
}

export function OrderDetailsPage() {
  const { orders } = useOrderFlow();
  const params = useParams<{ id: string }>();
  const order = orders.find((entry) => entry.id === decodeURIComponent(params.id));
  return <RouteFrame><Link href="/orders" className="mb-6 inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-brand hover:text-brandDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"><ArrowLeft size={16} aria-hidden="true" />All orders</Link>
    {!order ? <section className="rounded-3xl border border-dashed border-line bg-white px-6 py-14 text-center"><span className="mx-auto grid size-12 place-items-center rounded-2xl bg-cloud text-slate-500"><ClipboardList size={22} aria-hidden="true" /></span><h1 className="mt-5 text-xl font-bold text-ink">Order details are unavailable</h1><p className="mt-2 text-sm leading-6 text-slate-600">This order may belong to a different demo session. Orders are not stored permanently.</p><Link href="/orders" className="mt-5 inline-flex rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">Return to orders</Link></section> : <>
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-bold text-brand">Order details</p><h1 className="mt-2 break-all text-3xl font-bold tracking-tight text-ink">{order.id}</h1><p className="mt-2 text-sm text-slate-500">Placed {dateLabel(order.placedAt)}</p></div><StatusPill>Order placed</StatusPill></div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)]"><div className="space-y-6">
        <section className="rounded-2xl border border-line bg-white p-5 shadow-soft sm:p-6"><h2 className="mb-2 text-lg font-bold text-ink">Items</h2><OrderBreakdown order={order} /></section>
        <section className="rounded-2xl border border-line bg-white p-5 shadow-soft sm:p-6"><h2 className="flex items-center gap-2 text-lg font-bold text-ink"><MapPin size={19} className="text-brand" aria-hidden="true" />Delivery information</h2><p className="mt-4 font-semibold text-ink">{order.details.fullName}</p><p className="mt-1 text-sm leading-6 text-slate-600">{[order.details.address, order.details.addressLine2, order.details.city, order.details.region, order.details.postalCode].filter(Boolean).join(", ")}</p><p className="mt-3 text-sm text-slate-600">{order.details.email} · {order.details.phone}</p><p className="mt-3 text-sm font-semibold text-ink">{deliveryOptions.find((option) => option.id === order.details.deliveryMethod)?.name}</p></section>
        <section className="rounded-2xl border border-line bg-white p-5 shadow-soft sm:p-6"><h2 className="flex items-center gap-2 text-lg font-bold text-ink"><FileText size={19} className="text-brand" aria-hidden="true" />Prescription status</h2>{order.details.prescription ? <><p className="mt-3 text-sm font-semibold text-ink">{order.details.prescription.name}</p><p className="mt-1 text-sm leading-6 text-slate-600">Prescription metadata is associated with this demo order. File contents are not retained.</p><Link href={`/prescriptions/${encodeURIComponent(order.id)}`} className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">View prescription details <ArrowRight size={15} aria-hidden="true" /></Link></> : <p className="mt-3 text-sm leading-6 text-slate-600">No prescription was attached to this order.</p>}</section>
      </div><aside className="h-fit rounded-2xl border border-line bg-white p-5 shadow-soft sm:p-6"><h2 className="text-lg font-bold text-ink">Order summary</h2><div className="mt-5 space-y-3 text-sm"><div className="flex justify-between gap-3 text-slate-600"><span>Subtotal</span><span>{formatMoney.format(order.subtotal)}</span></div><div className="flex justify-between gap-3 text-slate-600"><span>Delivery</span><span>{formatMoney.format(order.deliveryFee)}</span></div><div className="flex justify-between gap-3 text-slate-600"><span>Tax</span><span>{formatMoney.format(order.tax)}</span></div><div className="flex justify-between gap-3 border-t border-line pt-4 text-base font-bold text-ink"><span>Total</span><span>{formatMoney.format(order.total)}</span></div></div><div className="mt-6 rounded-xl bg-cloud p-4"><p className="text-sm font-semibold text-ink">Demo delivery status</p><p className="mt-1 text-xs leading-5 text-slate-600">Not dispatched in this POC. Live delivery operations and tracking are not connected.</p></div><Link href="/medicines" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-bold text-white transition hover:bg-brandDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">Continue browsing <ArrowRight size={16} aria-hidden="true" /></Link></aside></div>
    </>}
  </RouteFrame>;
}

type PrescriptionRecord = { id: string; order: OrderRecord; name: string; size: number; type: string };
function usePrescriptions() {
  const { orders } = useOrderFlow();
  return orders.flatMap((order): PrescriptionRecord[] => order.details.prescription ? [{ id: order.id, order, ...order.details.prescription }] : []);
}

export function PrescriptionsPage() {
  const prescriptions = usePrescriptions();
  return <RouteFrame><PageHeading eyebrow="Your account" title="Prescriptions" description="Review the prescription references you attached to demo orders. File content is not uploaded or saved by this prototype." />
    {prescriptions.length ? <div className="space-y-4">{prescriptions.map((prescription) => <article key={prescription.id} className="rounded-2xl border border-line bg-white p-5 shadow-soft sm:flex sm:items-center sm:justify-between sm:p-6"><div className="flex min-w-0 items-start gap-4"><span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-mint text-brand"><FileText size={21} aria-hidden="true" /></span><div className="min-w-0"><h2 className="break-all font-bold text-ink">{prescription.name}</h2><p className="mt-1 text-sm text-slate-500">Uploaded with order {prescription.order.id} · {dateLabel(prescription.order.placedAt)}</p><div className="mt-3"><StatusPill>Attached to demo order</StatusPill></div></div></div><Link href={`/prescriptions/${encodeURIComponent(prescription.id)}`} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-line px-4 py-3 text-sm font-bold text-brand hover:bg-cloud focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:mt-0 sm:w-auto">View details <ArrowRight size={16} aria-hidden="true" /></Link></article>)}<p className="rounded-xl bg-white/70 p-4 text-xs leading-5 text-slate-500">This history contains file name and type metadata from this browser session only. Prescription files are never sent to a server in this POC.</p></div> : <section className="rounded-3xl border border-dashed border-line bg-white px-6 py-14 text-center shadow-soft sm:px-10"><span className="mx-auto grid size-12 place-items-center rounded-2xl bg-mint text-brand"><FileText size={22} aria-hidden="true" /></span><h2 className="mt-5 text-xl font-bold text-ink">No prescriptions in this session</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">If you attach prescription metadata during a demo checkout, its reference will appear here alongside the related order.</p><Link href="/medicines" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white hover:bg-brandDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">Browse medicines <ArrowRight size={16} aria-hidden="true" /></Link></section>}
  </RouteFrame>;
}

export function PrescriptionDetailsPage() {
  const prescriptions = usePrescriptions();
  const params = useParams<{ id: string }>();
  const prescription = prescriptions.find((entry) => entry.id === decodeURIComponent(params.id));
  return <RouteFrame><Link href="/prescriptions" className="mb-6 inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-brand hover:text-brandDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"><ArrowLeft size={16} aria-hidden="true" />All prescriptions</Link>
    {!prescription ? <section className="rounded-3xl border border-dashed border-line bg-white px-6 py-14 text-center"><span className="mx-auto grid size-12 place-items-center rounded-2xl bg-cloud text-slate-500"><FileText size={22} aria-hidden="true" /></span><h1 className="mt-5 text-xl font-bold text-ink">Prescription details are unavailable</h1><p className="mt-2 text-sm leading-6 text-slate-600">This prescription reference may belong to another demo session. File data is not stored permanently.</p><Link href="/prescriptions" className="mt-5 inline-flex rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">Return to prescriptions</Link></section> : <><PageHeading eyebrow="Prescription reference" title={prescription.name} description="This page shows reference information connected to your sample order. The actual prescription file was not stored." /><div className="grid gap-6 md:grid-cols-2"><section className="rounded-2xl border border-line bg-white p-5 shadow-soft sm:p-6"><h2 className="font-bold text-ink">Upload details</h2><dl className="mt-4 space-y-3 text-sm"><div className="flex justify-between gap-4"><dt className="text-slate-500">Status</dt><dd><StatusPill>Attached to demo order</StatusPill></dd></div><div className="flex justify-between gap-4"><dt className="text-slate-500">Reference</dt><dd className="break-all text-right font-semibold text-ink">{prescription.id}</dd></div><div className="flex justify-between gap-4"><dt className="text-slate-500">Date</dt><dd className="text-right font-semibold text-ink">{dateLabel(prescription.order.placedAt)}</dd></div><div className="flex justify-between gap-4"><dt className="text-slate-500">File type</dt><dd className="text-right font-semibold text-ink">{prescription.type || "Not provided"}</dd></div><div className="flex justify-between gap-4"><dt className="text-slate-500">File size</dt><dd className="text-right font-semibold text-ink">{prescription.size ? `${(prescription.size / 1024).toFixed(0)} KB` : "Not provided"}</dd></div></dl></section><section className="rounded-2xl border border-line bg-white p-5 shadow-soft sm:p-6"><h2 className="font-bold text-ink">Associated order</h2><p className="mt-3 text-sm leading-6 text-slate-600">This prescription reference was added during checkout for order <span className="font-semibold text-ink">{prescription.order.id}</span>.</p><p className="mt-2 text-sm text-slate-500">Placed {dateLabel(prescription.order.placedAt)}</p><Link href={`/orders/${encodeURIComponent(prescription.order.id)}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">View order <ArrowRight size={15} aria-hidden="true" /></Link></section></div></>}
  </RouteFrame>;
}
