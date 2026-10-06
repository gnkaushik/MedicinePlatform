import { Pill } from "lucide-react";
import { getMedicineCategory, type Medicine } from "@/data/medicines";

export function MedicineVisual({ medicine, className = "" }: { medicine: Medicine; className?: string }) {
  const category = getMedicineCategory(medicine.categoryId);
  const Icon = category?.icon ?? Pill;
  return (
    <div aria-hidden="true" className={`relative grid place-items-center overflow-hidden rounded-3xl ${category?.iconTone ?? "bg-mint text-brand"} ${className}`}>
      <span className="absolute -right-8 -top-10 size-36 rounded-full border-[20px] border-white/40" />
      <span className="absolute -bottom-12 -left-6 size-32 rounded-full border-[18px] border-white/30" />
      <span className="relative grid size-24 place-items-center rounded-[2rem] bg-white/85 shadow-soft sm:size-28"><Icon size={48} strokeWidth={1.35} /></span>
      <span className="absolute bottom-4 rounded-full bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-600">{medicine.form}</span>
    </div>
  );
}
