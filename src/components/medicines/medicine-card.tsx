import { ArrowRight, Pill } from "lucide-react";
import Link from "next/link";
import { getMedicineCategory, type Medicine } from "@/data/medicines";

const priceFormatter = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export function MedicineCard({ medicine }: { medicine: Medicine }) {
  const category = getMedicineCategory(medicine.categoryId);
  const CategoryIcon = category?.icon ?? Pill;

  return (
    <article className="group flex h-full flex-col rounded-3xl border border-line bg-white p-5 shadow-[0_4px_18px_rgba(16,35,63,0.035)] transition duration-200 hover:-translate-y-0.5 hover:shadow-soft sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <span className={`grid size-12 place-items-center rounded-2xl ${category?.iconTone ?? "bg-mint text-brand"}`}>
          <CategoryIcon size={22} strokeWidth={1.8} aria-hidden="true" />
        </span>
        {medicine.label && <span className="rounded-full bg-cloud px-2.5 py-1 text-[11px] font-semibold text-slate-600">{medicine.label}</span>}
      </div>

      <p className="mt-5 text-xs font-semibold text-brand">{category?.name ?? "Everyday care"}</p>
      <h2 className="mt-1.5 text-lg font-bold leading-snug tracking-tight text-ink">{medicine.name}</h2>
      <p className="mt-1 text-sm font-medium text-slate-500">{medicine.strength} <span aria-hidden="true">·</span> {medicine.pack}</p>
      <p className="mt-3 min-h-10 text-sm leading-5 text-slate-600">{medicine.summary}</p>

      <div className="mt-auto flex items-end justify-between gap-3 border-t border-line pt-5">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">Demo price</p>
          <p className="mt-0.5 text-xl font-bold tracking-tight text-ink">{priceFormatter.format(medicine.price)}</p>
        </div>
        <Link href={`/medicines?category=${medicine.categoryId}#catalog`} aria-label={`Browse more ${category?.name ?? "everyday care"} medicines`} className="inline-flex items-center gap-1 rounded-lg px-2 py-2 text-sm font-bold text-brand transition hover:bg-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
          More in category <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
