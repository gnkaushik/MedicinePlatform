"use client";

import { ArrowLeft, Check, Minus, Plus, ShieldCheck, ShoppingBag, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { Medicine } from "@/data/medicines";
import { getMedicineCategory } from "@/data/medicines";
import { useCart } from "@/cart/cart-context";
import { MedicineCard } from "@/components/medicines/medicine-card";
import { MedicineVisual } from "@/components/medicines/medicine-visual";

const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export function ProductDetail({ medicine, related }: { medicine: Medicine; related: Medicine[] }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const category = getMedicineCategory(medicine.categoryId);

  function addToCart() {
    addItem(medicine, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2600);
  }

  return <main className="min-h-[calc(100vh-72px)] bg-cloud">
    <div className="container-app py-7 sm:py-10">
      <Link href="/medicines" className="inline-flex items-center gap-2 rounded-lg py-2 text-sm font-bold text-brand transition hover:text-brandDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"><ArrowLeft size={17} aria-hidden="true" /> Back to medicines</Link>
      <div className="mt-5 grid gap-7 lg:grid-cols-[minmax(0,1.05fr)_minmax(350px,.95fr)] lg:gap-12">
        <MedicineVisual medicine={medicine} className="min-h-[280px] sm:min-h-[420px]" />
        <section aria-labelledby="product-title" className="flex flex-col py-1 sm:py-4">
          <div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-mint px-3 py-1.5 text-xs font-bold text-brand">{category?.name ?? "Everyday care"}</span>{medicine.label && <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-600">{medicine.label}</span>}</div>
          <h1 id="product-title" className="mt-4 text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">{medicine.name}</h1>
          <p className="mt-2 text-base font-medium text-slate-500">{medicine.strength} <span aria-hidden="true">·</span> {medicine.pack}</p>
          <div className="mt-6 flex items-end justify-between gap-4 border-b border-line pb-6"><div><p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Demo price</p><p className="mt-1 text-3xl font-bold tracking-tight text-ink">{money.format(medicine.price)}</p></div><span className={`mb-1 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${medicine.availability === "In stock" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}><span className={`size-1.5 rounded-full ${medicine.availability === "In stock" ? "bg-emerald-500" : "bg-amber-500"}`} />{medicine.availability}</span></div>
          <p className="mt-5 text-sm leading-7 text-slate-600">{medicine.description}</p>
          <dl className="mt-6 grid grid-cols-2 gap-3 rounded-2xl border border-line bg-white p-4 sm:p-5">
            <div><dt className="text-xs font-medium text-slate-500">Generic name</dt><dd className="mt-1 text-sm font-bold text-ink">{medicine.genericName}</dd></div>
            <div><dt className="text-xs font-medium text-slate-500">Brand</dt><dd className="mt-1 text-sm font-bold text-ink">{medicine.brandName}</dd></div>
            <div><dt className="text-xs font-medium text-slate-500">Dosage form</dt><dd className="mt-1 text-sm font-bold text-ink">{medicine.form}</dd></div>
            <div><dt className="text-xs font-medium text-slate-500">Pack size</dt><dd className="mt-1 text-sm font-bold text-ink">{medicine.pack}</dd></div>
          </dl>
          <div className="mt-6">
            <h2 className="text-sm font-bold text-ink">At a glance</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">{medicine.benefits.map((benefit) => <li key={benefit} className="flex items-start gap-2 text-sm leading-5 text-slate-600"><Check size={16} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />{benefit}</li>)}</ul>
          </div>
          <div className="mt-7 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row">
            <div className="inline-flex h-12 items-center justify-between rounded-xl border border-line bg-white p-1 sm:w-36" aria-label="Quantity selector">
              <button type="button" aria-label="Decrease quantity" disabled={quantity <= 1} onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="grid size-10 place-items-center rounded-lg text-slate-600 transition hover:bg-cloud disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"><Minus size={16} aria-hidden="true" /></button>
              <span aria-live="polite" className="min-w-8 text-center text-sm font-bold text-ink">{quantity}</span>
              <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((value) => value + 1)} className="grid size-10 place-items-center rounded-lg text-slate-600 transition hover:bg-cloud focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"><Plus size={16} aria-hidden="true" /></button>
            </div>
            <button type="button" onClick={addToCart} className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-brandDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"><ShoppingBag size={17} aria-hidden="true" />{added ? "Added to cart" : "Add to cart"}</button>
          </div>
          <p role="status" aria-live="polite" className="mt-3 min-h-5 text-sm font-semibold text-brand">{added ? `${quantity} × ${medicine.name} added to your cart.` : ""}</p>
          <p className="mt-2 flex items-start gap-2 rounded-xl bg-white/70 p-3 text-xs leading-5 text-slate-500"><ShieldCheck size={15} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />Sample product information and availability for demonstration only. Please follow the product label and consult a qualified professional for health advice.</p>
        </section>
      </div>
      {related.length > 0 && <section aria-labelledby="related-heading" className="mt-16"><div className="flex items-end justify-between gap-3"><div><p className="flex items-center gap-2 text-sm font-bold text-brand"><Sparkles size={16} aria-hidden="true" /> You may also explore</p><h2 id="related-heading" className="mt-2 text-2xl font-bold tracking-tight text-ink">Related medicines</h2></div><Link href={`/medicines?category=${medicine.categoryId}#catalog`} className="rounded-lg px-2 py-2 text-sm font-bold text-brand hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">View category</Link></div><div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{related.map((item) => <MedicineCard key={item.id} medicine={item} />)}</div></section>}
    </div>
  </main>;
}
