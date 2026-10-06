import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteHeader } from "@/components/site/site-header";
import { MedicineCatalog } from "@/components/medicines/medicine-catalog";

export const metadata: Metadata = {
  title: "Medicines | Medicine Platform",
  description: "Browse a sample catalog of everyday medicines and wellness essentials."
};

function CatalogFallback() {
  return <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-label="Loading medicine catalog" role="status">{Array.from({ length: 6 }, (_, index) => <div key={index} className="h-[270px] animate-pulse rounded-3xl border border-line bg-white" />)}</div>;
}

export default function MedicinesPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-[calc(100vh-72px)] bg-cloud">
        <section className="border-b border-line bg-white">
          <div className="container-app py-10 sm:py-14">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand">The sample catalog</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Everyday care, made easy to find.</h1>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">Search by name, strength or category, then explore clear basic information and sample pricing.</p>
          </div>
        </section>
        <div className="container-app py-8 sm:py-10">
          <Suspense fallback={<CatalogFallback />}>
            <MedicineCatalog />
          </Suspense>
        </div>
      </main>
      <footer className="border-t border-line bg-white">
        <div className="container-app flex flex-col gap-3 py-7 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>Medicine Platform POC</span>
          <span>Sample catalog · For demonstration only</span>
        </div>
      </footer>
    </>
  );
}
