"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { CartLine } from "@/cart/cart-context";

export type DeliveryMethod = "standard" | "express";
export type PrescriptionFile = { name: string; size: number; type: string };
export type CheckoutDetails = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  addressLine2: string;
  city: string;
  region: string;
  postalCode: string;
  deliveryMethod: DeliveryMethod;
  prescription: PrescriptionFile | null;
};
export type OrderRecord = {
  id: string;
  placedAt: string;
  details: CheckoutDetails;
  items: CartLine[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
};

type OrderFlowValue = {
  draft: CheckoutDetails | null;
  orders: OrderRecord[];
  latestOrder: OrderRecord | null;
  saveDraft: (details: CheckoutDetails) => void;
  placeOrder: (items: CartLine[]) => OrderRecord | null;
};

const OrderFlowContext = createContext<OrderFlowValue | null>(null);

export function OrderFlowProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<CheckoutDetails | null>(null);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const value = useMemo<OrderFlowValue>(() => ({
    draft,
    orders,
    latestOrder: orders[0] ?? null,
    saveDraft: setDraft,
    placeOrder: (items) => {
      if (items.length === 0 || !draft) return null;
      const subtotal = items.reduce((sum, item) => sum + item.medicine.price * item.quantity, 0);
      const deliveryFee = draft.deliveryMethod === "express" ? 99 : 49;
      const tax = Math.round(subtotal * 0.05);
      const order: OrderRecord = {
        id: `MED-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
        placedAt: new Date().toISOString(),
        details: draft,
        items: items.map((item) => ({ ...item })),
        subtotal,
        deliveryFee,
        tax,
        total: subtotal + deliveryFee + tax
      };
      setOrders((current) => [order, ...current]);
      setDraft(null);
      return order;
    }
  }), [draft, orders]);

  return <OrderFlowContext.Provider value={value}>{children}</OrderFlowContext.Provider>;
}

export function useOrderFlow() {
  const context = useContext(OrderFlowContext);
  if (!context) throw new Error("useOrderFlow must be used within OrderFlowProvider");
  return context;
}
