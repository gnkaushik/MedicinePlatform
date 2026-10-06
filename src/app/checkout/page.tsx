import type { Metadata } from "next";
import { LockKeyhole } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { CheckoutForm } from "@/components/checkout/checkout-form";

export const metadata: Metadata = { title: "Checkout | Medicine Platform", description: "Enter sample delivery details for your medicine selection." };

export default function CheckoutRoute() {
  return <><SiteHeader /><main className="min-h-[calc(100vh-72px)] bg-cloud"><div className="container-app py-8 sm:py-12"><p className="text-sm font-bold uppercase tracking-[0.14em] text-brand">Demo checkout</p><div className="mt-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">Delivery details</h1><p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">Add the details for this sample order, then review everything before placing it.</p></div><span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500"><LockKeyhole size={15} aria-hidden="true" /> Stays in this browser session</span></div><div className="my-6 flex items-center gap-2 text-xs font-bold text-slate-500 sm:my-8"><span className="rounded-full bg-brand px-3 py-1.5 text-white">1 · Details</span><span aria-hidden="true">—</span><span>2 · Review</span><span aria-hidden="true">—</span><span>3 · Confirmation</span></div><CheckoutForm /></div></main><footer className="border-t border-line bg-white"><div className="container-app py-6 text-sm text-slate-500">Medicine Platform POC · Sample checkout only</div></footer></>;
}
