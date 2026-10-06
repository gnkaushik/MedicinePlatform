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
  genericName: string;
  brandName: string;
  form: string;
  availability: "In stock" | "Limited stock";
  description: string;
  benefits: string[];
};

export const medicineCategories: MedicineCategory[] = [
  { id: "pain-relief", name: "Pain relief", description: "Everyday essentials for aches and discomfort.", icon: Bandage, iconTone: "bg-amber-50 text-amber-700" },
  { id: "vitamins", name: "Vitamins & wellness", description: "Simple additions to your daily wellness shelf.", icon: Flower2, iconTone: "bg-violet-50 text-violet-700" },
  { id: "cold-flu", name: "Cold & flu", description: "Seasonal comfort basics, all in one place.", icon: HeartPulse, iconTone: "bg-sky-50 text-sky-700" },
  { id: "digestive", name: "Digestive care", description: "Familiar products for everyday digestive care.", icon: Leaf, iconTone: "bg-emerald-50 text-emerald-700" }
];

export const mockMedicines: Medicine[] = [
  { id: "paracetamol-500", name: "Paracetamol tablets", genericName: "Paracetamol", brandName: "Everyday Care", form: "Tablet", availability: "In stock", description: "A familiar over-the-counter medicine presented here with clear, basic product information.", benefits: ["Convenient strip of 10 tablets", "Clearly labelled strength", "Compact pack for home medicine cabinets"], strength: "500 mg", pack: "Strip of 10 tablets", categoryId: "pain-relief", price: 32, summary: "A familiar everyday pain relief essential.", label: "Popular" },
  { id: "ibuprofen-200", name: "Ibuprofen tablets", genericName: "Ibuprofen", brandName: "Everyday Care", form: "Tablet", availability: "In stock", description: "An everyday medicine option in a compact sample pack with straightforward product details.", benefits: ["Convenient strip of 10 tablets", "Clearly labelled strength", "Easy-to-store packaging"], strength: "200 mg", pack: "Strip of 10 tablets", categoryId: "pain-relief", price: 48, summary: "An everyday option for aches and discomfort." },
  { id: "balm-10", name: "Pain relief balm", genericName: "Topical comfort balm", brandName: "Comfort Plus", form: "Topical balm", availability: "Limited stock", description: "A compact topical balm shown as a sample product in the demonstration catalog.", benefits: ["Convenient tube format", "Compact 50 g pack", "Simple topical application"], strength: "50 g", pack: "1 tube", categoryId: "pain-relief", price: 89, summary: "A compact topical comfort essential." },
  { id: "vitamin-c-zinc", name: "Vitamin C + Zinc", genericName: "Ascorbic acid + Zinc", brandName: "Daily Balance", form: "Tablet", availability: "In stock", description: "A sample daily wellness supplement with key ingredients shown on the label.", benefits: ["Two familiar nutrients in one pack", "Bottle of 30 tablets", "Easy-to-read ingredient information"], strength: "500 mg + 10 mg", pack: "Bottle of 30 tablets", categoryId: "vitamins", price: 175, summary: "A convenient daily wellness supplement.", label: "Daily wellness" },
  { id: "multivitamin", name: "Multivitamin tablets", genericName: "Multivitamin blend", brandName: "Daily Balance", form: "Tablet", availability: "In stock", description: "A straightforward sample multivitamin product for everyday routines.", benefits: ["Daily formula", "Bottle of 30 tablets", "Clearly presented pack information"], strength: "Daily formula", pack: "Bottle of 30 tablets", categoryId: "vitamins", price: 220, summary: "A straightforward multivitamin for daily routines." },
  { id: "saline-nasal", name: "Saline nasal spray", genericName: "Sodium chloride solution", brandName: "Clear Day", form: "Nasal spray", availability: "In stock", description: "A gentle saline spray sample with solution strength and bottle size clearly displayed.", benefits: ["Ready-to-use spray format", "20 ml bottle", "Simple ingredient information"], strength: "0.9% solution", pack: "20 ml spray", categoryId: "cold-flu", price: 95, summary: "A gentle saline spray for seasonal comfort." },
  { id: "cough-lozenges", name: "Soothing throat lozenges", genericName: "Honey and lemon lozenge", brandName: "Comfort Plus", form: "Lozenge", availability: "Limited stock", description: "A pocket-sized sample pack of honey and lemon flavoured throat lozenges.", benefits: ["Pocket-sized pack", "Honey and lemon flavour", "Pack of 12 lozenges"], strength: "Honey & lemon", pack: "Pack of 12 lozenges", categoryId: "cold-flu", price: 65, summary: "Pocket-sized lozenges for a scratchy throat." },
  { id: "antacid-chewables", name: "Antacid chewable tablets", genericName: "Antacid blend", brandName: "Digest Ease", form: "Chewable tablet", availability: "In stock", description: "A familiar sample chewable product with mint flavour and pack size details.", benefits: ["Chewable format", "Mint flavour", "Pack of 10 tablets"], strength: "Mint flavour", pack: "Pack of 10 tablets", categoryId: "digestive", price: 55, summary: "A familiar chewable digestive care basic." },
  { id: "ors-sachets", name: "Oral rehydration salts", genericName: "Oral rehydration salts", brandName: "HydraCare", form: "Powder sachet", availability: "In stock", description: "Single-serve sample sachets with clear mixing format information.", benefits: ["Ready-to-mix sachets", "Single-serve format", "Pack of 5 sachets"], strength: "Ready-to-mix", pack: "Pack of 5 sachets", categoryId: "digestive", price: 75, summary: "Single-serve sachets for easy mixing.", label: "Everyday essential" }
];

export function getMedicineCategory(categoryId: string) {
  return medicineCategories.find((category) => category.id === categoryId);
}
