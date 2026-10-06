import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site/site-header";
import { ProductDetail } from "@/components/medicines/product-detail";
import { mockMedicines } from "@/data/medicines";

export function generateStaticParams() {
  return mockMedicines.map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const medicine = mockMedicines.find((item) => item.id === id);
  return medicine ? { title: `${medicine.name} | Medicine Platform`, description: medicine.summary } : { title: "Medicine not found | Medicine Platform" };
}

export default async function MedicineDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const medicine = mockMedicines.find((item) => item.id === id);
  if (!medicine) notFound();
  const related = mockMedicines.filter((item) => item.categoryId === medicine.categoryId && item.id !== medicine.id).slice(0, 3);
  return <><SiteHeader /><ProductDetail medicine={medicine} related={related} /><footer className="border-t border-line bg-white"><div className="container-app py-6 text-sm text-slate-500">Medicine Platform POC <span aria-hidden="true">·</span> Sample catalog for demonstration</div></footer></>;
}
