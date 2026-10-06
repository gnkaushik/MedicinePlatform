import { Bandage, Flower2, HeartPulse, Leaf } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type MedicineCategory = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  iconTone: string;
};

export type Medicine = {
  id: string;
  name: string;
  strength: string;
  pack: string;
  categoryId: string;
  price: number;
  summary: string;
  label?: string;
};

export const medicineCategories: MedicineCategory[] = [
  { id: "pain-relief", name: "Pain relief", description: "Everyday essentials for aches and discomfort.", icon: Bandage, iconTone: "bg-amber-50 text-amber-700" },
  { id: "vitamins", name: "Vitamins & wellness", description: "Simple additions to your daily wellness shelf.", icon: Flower2, iconTone: "bg-violet-50 text-violet-700" },
  { id: "cold-flu", name: "Cold & flu", description: "Seasonal comfort basics, all in one place.", icon: HeartPulse, iconTone: "bg-sky-50 text-sky-700" },
  { id: "digestive", name: "Digestive care", description: "Familiar products for everyday digestive care.", icon: Leaf, iconTone: "bg-emerald-50 text-emerald-700" }
];

export const mockMedicines: Medicine[] = [
  { id: "paracetamol-500", name: "Paracetamol tablets", strength: "500 mg", pack: "Strip of 10 tablets", categoryId: "pain-relief", price: 32, summary: "A familiar everyday pain relief essential.", label: "Popular" },
  { id: "ibuprofen-200", name: "Ibuprofen tablets", strength: "200 mg", pack: "Strip of 10 tablets", categoryId: "pain-relief", price: 48, summary: "An everyday option for aches and discomfort." },
  { id: "balm-10", name: "Pain relief balm", strength: "50 g", pack: "1 tube", categoryId: "pain-relief", price: 89, summary: "A compact topical comfort essential." },
  { id: "vitamin-c-zinc", name: "Vitamin C + Zinc", strength: "500 mg + 10 mg", pack: "Bottle of 30 tablets", categoryId: "vitamins", price: 175, summary: "A convenient daily wellness supplement.", label: "Daily wellness" },
  { id: "multivitamin", name: "Multivitamin tablets", strength: "Daily formula", pack: "Bottle of 30 tablets", categoryId: "vitamins", price: 220, summary: "A straightforward multivitamin for daily routines." },
  { id: "saline-nasal", name: "Saline nasal spray", strength: "0.9% solution", pack: "20 ml spray", categoryId: "cold-flu", price: 95, summary: "A gentle saline spray for seasonal comfort." },
  { id: "cough-lozenges", name: "Soothing throat lozenges", strength: "Honey & lemon", pack: "Pack of 12 lozenges", categoryId: "cold-flu", price: 65, summary: "Pocket-sized lozenges for a scratchy throat." },
  { id: "antacid-chewables", name: "Antacid chewable tablets", strength: "Mint flavour", pack: "Pack of 10 tablets", categoryId: "digestive", price: 55, summary: "A familiar chewable digestive care basic." },
  { id: "ors-sachets", name: "Oral rehydration salts", strength: "Ready-to-mix", pack: "Pack of 5 sachets", categoryId: "digestive", price: 75, summary: "Single-serve sachets for easy mixing.", label: "Everyday essential" }
];

export function getMedicineCategory(categoryId: string) {
  return medicineCategories.find((category) => category.id === categoryId);
}
