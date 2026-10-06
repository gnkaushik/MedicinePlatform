"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Medicine } from "@/data/medicines";

export type CartLine = { medicine: Medicine; quantity: number };
type CartContextValue = {
  items: CartLine[];
  itemCount: number;
  subtotal: number;
  addItem: (medicine: Medicine, quantity?: number) => void;
  setQuantity: (medicineId: string, quantity: number) => void;
  removeItem: (medicineId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const value = useMemo<CartContextValue>(() => ({
    items,
    itemCount: items.reduce((count, item) => count + item.quantity, 0),
    subtotal: items.reduce((total, item) => total + item.medicine.price * item.quantity, 0),
    addItem: (medicine, quantity = 1) => setItems((current) => {
      const existing = current.find((item) => item.medicine.id === medicine.id);
      return existing
        ? current.map((item) => item.medicine.id === medicine.id ? { ...item, quantity: item.quantity + quantity } : item)
        : [...current, { medicine, quantity }];
    }),
    setQuantity: (medicineId, quantity) => setItems((current) => quantity <= 0
      ? current.filter((item) => item.medicine.id !== medicineId)
      : current.map((item) => item.medicine.id === medicineId ? { ...item, quantity } : item)),
    removeItem: (medicineId) => setItems((current) => current.filter((item) => item.medicine.id !== medicineId)),
    clearCart: () => setItems([])
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
