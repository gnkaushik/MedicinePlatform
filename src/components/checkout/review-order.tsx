"use client";

import { ArrowLeft, CheckCircle2, FileText, MapPin, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/cart/cart-context";
import { OrderSummary } from "@/components/checkout/order-summary";
import { useOrderFlow } from "@/orders/order-context";
import { deliveryOptions } from "@/orders/pricing";

export function ReviewOrder() {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const { draft, placeOrder } = useOrderFlow();

  if (!draft || items.length === 0) return <section className="rounded-3xl border border-dashed border-line bg-white p-8 text-center"><h2 className="text-xl font-bold text-ink">Your review is not ready</h2><p className="mt-2 text-sm text-slate-600">Return to checkout and add your details before reviewing this order.</p><Link href={items.length ? "/checkout" : "/cart"} className="mt-5 inline-flex rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white">{items.length ? "Return to checkout" : "Return to cart"}</Link></section>;

  const selectedDelivery = deliveryOptions.find((option) => option.id === draft.deliveryMethod) ?? deliveryOptions[0];

  function submitOrder() {
    const order = placeOrder(items);
    if (!order) return;
    clearCart();
    router.push("/checkout/confirmation");
  }

  return <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
    <div className="space-y-4">
      <section className="rounded-3xl border border-line bg-white p-5 sm:p-7"><div className="flex items-center justify-between gap-3"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-mint text-brand"><CheckCircle2 size={19} aria-hidden="true" /></span><div><h2 className="text-lg font-bold text-ink">Contact details</h2><p className="text-xs text-slate-500">For order updates</p></div></div><Link href="/checkout" className="rounded-lg px-3 py-2 text-sm font-bold text-brand hover:bg-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">Edit</Link></div><dl className="mt-5 grid gap-x-5 gap-y-4 border-t border-line pt-4 text-sm sm:grid-cols-2"><div><dt className="text-xs text-slate-500">Name</dt><dd className="mt-1 font-semibold text-ink">{draft.fullName}</dd></div><div><dt className="text-xs text-slate-500">Email</dt><dd className="mt-1 break-all font-semibold text-ink">{draft.email}</dd></div><div><dt className="text-xs text-slate-500">Phone</dt><dd className="mt-1 font-semibold text-ink">{draft.phone}</dd></div></dl></section>

      <section className="rounded-3xl border border-line bg-white p-5 sm:p-7"><div className="flex items-center justify-between gap-3"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-mint text-brand"><MapPin size={19} aria-hidden="true" /></span><div><h2 className="text-lg font-bold text-ink">Delivery details</h2><p className="text-xs text-slate-500">{selectedDelivery.name} · {selectedDelivery.description}</p></div></div><Link href="/checkout" className="rounded-lg px-3 py-2 text-sm font-bold text-brand hover:bg-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">Edit</Link></div><address className="mt-5 border-t border-line pt-4 text-sm not-italic leading-6 text-slate-700"><span className="font-semibold text-ink">{draft.fullName}</span><br />{draft.address}{draft.addressLine2 && <><br />{draft.addressLine2}</>}<br />{draft.city}, {draft.region} {draft.postalCode}<br />{draft.phone}</address></section>

      <section className="rounded-3xl border border-line bg-white p-5 sm:p-7"><div className="flex items-center justify-between gap-3"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-mint text-brand"><FileText size={19} aria-hidden="true" /></span><div><h2 className="text-lg font-bold text-ink">Prescription</h2><p className="text-xs text-slate-500">{draft.prescription ? "Selected locally for this demo" : "No file attached"}</p></div></div><Link href="/checkout" className="rounded-lg px-3 py-2 text-sm font-bold text-brand hover:bg-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">Edit</Link></div>{draft.prescription && <p className="mt-4 truncate border-t border-line pt-4 text-sm font-semibold text-ink">{draft.prescription.name}</p>}</section>
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between"><Link href="/checkout" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-line bg-white px-4 py-3 text-sm font-bold text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"><ArrowLeft size={16} aria-hidden="true" /> Back to details</Link><button onClick={submitOrder} type="button" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-brandDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">Place demo order <ShieldCheck size={16} aria-hidden="true" /></button></div>
    </div>
    <div className="lg:sticky lg:top-28"><OrderSummary items={items} deliveryMethod={draft.deliveryMethod} compact /></div>
  </div>;
}
