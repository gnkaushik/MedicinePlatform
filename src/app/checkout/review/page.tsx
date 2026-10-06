import type { Metadata } from "next";
import { ClipboardCheck } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { ReviewOrder } from "@/components/checkout/review-order";

export const metadata: Metadata = { title: "Review order | Medicine Platform", description: "Review your sample medicine selection before placing a demo order." };

export default function ReviewRoute() {
  return <><SiteHeader /><main className="min-h-[calc(100vh-72px)] bg-cloud"><div className="container-app py-8 sm:py-12"><p className="text-sm font-bold uppercase tracking-[0.14em] text-brand">Demo checkout</p><div className="mt-2 flex items-center gap-3"><span className="grid size-11 place-items-center rounded-2xl bg-mint text-brand"><ClipboardCheck size={22} aria-hidden="true" /></span><div><h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">Review your order</h1><p className="mt-2 text-sm text-slate-600">Check your items and delivery information before placing your demo order.</p></div></div><div className="my-6 flex items-center gap-2 text-xs font-bold text-slate-500 sm:my-8"><span className="rounded-full bg-emerald-50 px-3 py-1.5 text-emerald-700">1 · Details ✓</span><span aria-hidden="true">—</span><span className="rounded-full bg-brand px-3 py-1.5 text-white">2 · Review</span><span aria-hidden="true">—</span><span>3 · Confirmation</span></div><ReviewOrder /></div></main><footer className="border-t border-line bg-white"><div className="container-app py-6 text-sm text-slate-500">Medicine Platform POC · No payment will be collected</div></footer></>;
}
