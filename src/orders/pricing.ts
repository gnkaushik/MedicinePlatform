import type { DeliveryMethod } from "@/orders/order-context";

export const deliveryOptions: Array<{ id: DeliveryMethod; name: string; description: string; fee: number }> = [
  { id: "standard", name: "Standard delivery", description: "Our everyday delivery option", fee: 49 },
  { id: "express", name: "Express delivery", description: "A faster sample delivery option", fee: 99 }
];

export function getCheckoutTotals(subtotal: number, method: DeliveryMethod) {
  const deliveryFee = deliveryOptions.find((option) => option.id === method)?.fee ?? deliveryOptions[0].fee;
  const tax = Math.round(subtotal * 0.05);
  return { subtotal, deliveryFee, tax, total: subtotal + deliveryFee + tax };
}

export const formatMoney = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
