import type { CartLine } from "@/cart/cart-context";
import type { DeliveryMethod } from "@/orders/order-context";
import { deliveryOptions, formatMoney, getCheckoutTotals } from "@/orders/pricing";

export function OrderSummary({ items, deliveryMethod = "standard", compact = false }: { items: CartLine[]; deliveryMethod?: DeliveryMethod; compact?: boolean }) {
  const subtotal = items.reduce((total, item) => total + item.medicine.price * item.quantity, 0);
  const totals = getCheckoutTotals(subtotal, deliveryMethod);
  const delivery = deliveryOptions.find((option) => option.id === deliveryMethod) ?? deliveryOptions[0];

  return <aside className="rounded-3xl border border-line bg-white p-5 shadow-[0_4px_18px_rgba(16,35,63,0.035)] sm:p-6">
    <h2 className="text-lg font-bold text-ink">Order summary</h2>
    <div className={`mt-4 divide-y divide-line ${compact ? "max-h-56 overflow-y-auto" : ""}`}>
      {items.map(({ medicine, quantity }) => <div key={medicine.id} className="flex items-start justify-between gap-4 py-3 first:pt-0"><div className="min-w-0"><p className="truncate text-sm font-semibold text-ink">{medicine.name}</p><p className="mt-0.5 text-xs text-slate-500">Qty {quantity} · {medicine.pack}</p></div><span className="shrink-0 text-sm font-bold text-ink">{formatMoney.format(medicine.price * quantity)}</span></div>)}
    </div>
    <dl className="mt-2 space-y-3 border-t border-line pt-4 text-sm">
      <div className="flex justify-between gap-3"><dt className="text-slate-600">Subtotal</dt><dd className="font-semibold text-ink">{formatMoney.format(totals.subtotal)}</dd></div>
      <div className="flex justify-between gap-3"><dt className="text-slate-600">{delivery.name}</dt><dd className="font-semibold text-ink">{formatMoney.format(totals.deliveryFee)}</dd></div>
      <div className="flex justify-between gap-3"><dt className="text-slate-600">Estimated tax (5%)</dt><dd className="font-semibold text-ink">{formatMoney.format(totals.tax)}</dd></div>
      <div className="flex justify-between gap-3 border-t border-line pt-3 text-base"><dt className="font-bold text-ink">Total</dt><dd className="font-bold text-ink">{formatMoney.format(totals.total)}</dd></div>
    </dl>
    <p className="mt-4 text-xs leading-5 text-slate-500">Example totals for this POC. No payment will be collected.</p>
  </aside>;
}
