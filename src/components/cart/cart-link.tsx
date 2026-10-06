"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/cart/cart-context";

export function CartLink() {
  const { itemCount } = useCart();
  return <Link href="/cart" aria-label={`Cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`} className="relative inline-flex items-center gap-1 rounded-xl border border-line bg-white px-2 py-2.5 text-sm font-bold text-ink transition hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:gap-2 sm:px-3">
    <ShoppingBag size={17} aria-hidden="true" /><span className="hidden sm:inline">Cart</span><span aria-live="polite" className="grid min-w-5 place-items-center rounded-full bg-brand px-1.5 py-0.5 text-[11px] font-bold text-white">{itemCount}</span>
  </Link>;
}
