"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { medicineCategories, type Medicine } from "@/data/medicines";
import { getMedicineCatalog } from "@/services/medicine-catalog";
import { MedicineCard } from "@/components/medicines/medicine-card";

function MedicineCardSkeleton() {
  return <div aria-hidden="true" className="h-[270px] animate-pulse rounded-3xl border border-line bg-white p-6"><span className="block size-12 rounded-2xl bg-slate-100" /><span className="mt-6 block h-3 w-24 rounded bg-slate-100" /><span className="mt-3 block h-5 w-3/4 rounded bg-slate-100" /><span className="mt-3 block h-3 w-1/2 rounded bg-slate-100" /><span className="mt-8 block h-10 w-full rounded-xl bg-slate-100" /></div>;
}

export function MedicineCatalog() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    let isCurrent = true;
    getMedicineCatalog().then((catalog) => {
      if (isCurrent) {
        setMedicines(catalog);
        setIsLoading(false);
      }
    });
    return () => { isCurrent = false; };
  }, []);

  useEffect(() => {
    const category = searchParams.get("category");
    setSelectedCategory(category && medicineCategories.some((item) => item.id === category) ? category : "all");
  }, [searchParams]);

  const filteredMedicines = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return medicines.filter((medicine) => {
      const matchesCategory = selectedCategory === "all" || medicine.categoryId === selectedCategory;
      const categoryName = medicineCategories.find((category) => category.id === medicine.categoryId)?.name ?? "";
      const matchesSearch = !query || `${medicine.name} ${medicine.strength} ${medicine.pack} ${medicine.summary} ${categoryName}`.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [medicines, searchTerm, selectedCategory]);

  function chooseCategory(categoryId: string) {
    setSelectedCategory(categoryId);
    const suffix = categoryId === "all" ? "" : `?category=${encodeURIComponent(categoryId)}`;
    router.replace(`/medicines${suffix}#catalog`, { scroll: false });
  }

  return (
    <div id="catalog" className="scroll-mt-28">
      <section aria-labelledby="catalog-heading" className="rounded-3xl border border-line bg-white p-4 shadow-soft sm:p-6 lg:p-7">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-bold text-brand"><SlidersHorizontal size={16} aria-hidden="true" /> Find an everyday essential</p>
            <h2 id="catalog-heading" className="mt-2 text-2xl font-bold tracking-tight text-ink">Browse the medicine catalog</h2>
          </div>
          <label className="relative block w-full lg:max-w-sm">
            <span className="sr-only">Search medicines</span>
            <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              className="w-full rounded-xl border border-line bg-cloud py-3 pl-11 pr-4 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10"
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search name, strength or category"
              type="search"
              value={searchTerm}
            />
          </label>
        </div>

        <div className="mt-6">
          <p id="category-filter-label" className="mb-2.5 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Categories</p>
          <div aria-labelledby="category-filter-label" className="flex gap-2 overflow-x-auto pb-1" role="group">
            <button aria-pressed={selectedCategory === "all"} className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${selectedCategory === "all" ? "bg-ink text-white" : "border border-line bg-white text-slate-600 hover:border-brand hover:text-brand"}`} onClick={() => chooseCategory("all")} type="button">All medicines</button>
            {medicineCategories.map(({ id, name }) => (
              <button key={id} aria-pressed={selectedCategory === id} className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${selectedCategory === id ? "bg-ink text-white" : "border border-line bg-white text-slate-600 hover:border-brand hover:text-brand"}`} onClick={() => chooseCategory(id)} type="button">{name}</button>
            ))}
          </div>
        </div>
      </section>

      <div className="mb-4 mt-7 flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-ink">{selectedCategory === "all" ? "Everyday essentials" : medicineCategories.find((item) => item.id === selectedCategory)?.name}</h2>
        {!isLoading && <p aria-live="polite" className="text-sm text-slate-500">{filteredMedicines.length} {filteredMedicines.length === 1 ? "item" : "items"}</p>}
      </div>

      {isLoading ? (
        <div aria-label="Loading medicine catalog" aria-live="polite" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" role="status">
          {Array.from({ length: 6 }, (_, index) => <MedicineCardSkeleton key={index} />)}
        </div>
      ) : medicines.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-line bg-white px-6 py-14 text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-mint text-brand"><Sparkles size={22} aria-hidden="true" /></span>
          <h3 className="mt-4 text-lg font-bold text-ink">The catalog is being prepared</h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">There are no sample medicines available right now. Please check back soon.</p>
        </div>
      ) : filteredMedicines.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-line bg-white px-6 py-14 text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-cloud text-slate-500"><Search size={21} aria-hidden="true" /></span>
          <h3 className="mt-4 text-lg font-bold text-ink">No medicines found</h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">Try another name or category to find what you are looking for.</p>
          <button className="mt-5 rounded-xl border border-line px-4 py-2.5 text-sm font-bold text-brand transition hover:border-brand hover:bg-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand" onClick={() => { setSearchTerm(""); chooseCategory("all"); }} type="button">Clear search and filters</button>
        </div>
      ) : (
        <div aria-live="polite" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredMedicines.map((medicine) => <MedicineCard key={medicine.id} medicine={medicine} />)}
        </div>
      )}

      <p className="mt-6 text-xs leading-5 text-slate-500">Sample products and prices for demonstration only. No orders or real availability are provided.</p>
    </div>
  );
}
