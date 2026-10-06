import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { MedicineCategory } from "@/data/medicines";

export function CategoryCard({ category }: { category: MedicineCategory }) {
  const Icon = category.icon;

  return (
    <Link href={`/medicines?category=${category.id}#catalog`} className="group flex h-full flex-col rounded-3xl border border-line bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:p-6">
      <span className={`grid size-12 place-items-center rounded-2xl ${category.iconTone}`}><Icon size={22} strokeWidth={1.8} aria-hidden="true" /></span>
      <h3 className="mt-5 text-lg font-bold tracking-tight text-ink">{category.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{category.description}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand">Browse category <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" /></span>
    </Link>
  );
}
