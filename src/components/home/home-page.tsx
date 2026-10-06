import { ArrowRight, Check, FlaskConical, HeartHandshake, Search, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";
import Link from "next/link";
import { medicineCategories } from "@/data/medicines";
import { CategoryCard } from "@/components/home/category-card";
import { SiteHeader } from "@/components/site/site-header";

export function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="overflow-hidden bg-cloud">
          <div className="container-app grid grid-cols-1 items-center gap-12 py-14 sm:py-20 lg:min-h-[560px] lg:grid-cols-[1.05fr_.95fr] lg:gap-16 lg:py-20">
            <div className="relative z-10 min-w-0">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white px-4 py-2 text-sm font-semibold text-brand shadow-sm">
                <ShieldCheck size={16} aria-hidden="true" /> Everyday care, made clearer
              </div>
              <h1 className="max-w-2xl text-4xl font-bold leading-[1.08] tracking-[-0.04em] text-ink sm:text-5xl lg:text-6xl">Good health starts with the little things.</h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">Browse everyday medicines, book a doctor conversation, or arrange a sample home lab collection—all in one calm place.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/medicines" className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3.5 text-sm font-bold text-white shadow-soft transition hover:bg-brandDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
                  Browse medicines <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <Link href="#categories" className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-5 py-3.5 text-sm font-bold text-ink transition hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
                  Explore categories
                </Link>
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-slate-500 sm:text-sm">
                <span className="inline-flex items-center gap-1.5"><Check size={15} className="text-brand" aria-hidden="true" /> Simple category browsing</span>
                <span className="inline-flex items-center gap-1.5"><Check size={15} className="text-brand" aria-hidden="true" /> Sample catalog, demo checkout</span>
              </div>
            </div>

            <div className="relative mx-auto w-full min-w-0 max-w-lg lg:mx-0 lg:justify-self-end">
              <div className="absolute -right-12 -top-10 size-44 rounded-full bg-teal-100/80 blur-3xl" aria-hidden="true" />
              <div className="relative rounded-[2rem] border border-white bg-white p-4 shadow-lift sm:p-6">
                <div className="rounded-[1.5rem] bg-mint p-5 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">Your care, at a glance</p>
                      <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink">Find your essentials</h2>
                    </div>
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white text-brand"><HeartHandshake size={22} aria-hidden="true" /></span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">Start with a category that feels right for you.</p>
                  <div className="mt-6 grid gap-2.5">
                    {medicineCategories.slice(0, 3).map((category) => {
                      const Icon = category.icon;
                      return (
                        <Link key={category.id} href={`/medicines?category=${category.id}#catalog`} className="flex items-center gap-3 rounded-2xl bg-white p-3.5 shadow-sm transition hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
                          <span className={`grid size-10 place-items-center rounded-xl ${category.iconTone}`}><Icon size={19} aria-hidden="true" /></span>
                          <span className="min-w-0 flex-1"><span className="block truncate text-sm font-bold text-ink">{category.name}</span><span className="mt-0.5 block truncate text-xs text-slate-500">{category.description}</span></span>
                          <ArrowRight size={17} className="shrink-0 text-slate-400" aria-hidden="true" />
                        </Link>
                      );
                    })}
                  </div>
                  <Link href="/medicines" className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-bold text-white transition hover:bg-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-mint">
                    <Search size={16} aria-hidden="true" /> Search all medicines
                  </Link>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-4 hidden items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 shadow-soft sm:flex lg:-left-9">
                <span className="grid size-9 place-items-center rounded-xl bg-cloud text-brand"><Sparkles size={18} aria-hidden="true" /></span>
                <span><span className="block text-xs font-bold text-ink">A little easier, every day</span><span className="mt-0.5 block text-[11px] text-slate-500">A thoughtful place to begin</span></span>
              </div>
            </div>
          </div>
        </section>

        <section id="categories" className="container-app scroll-mt-24 py-16 sm:py-20">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand">Browse by need</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">The everyday essentials, thoughtfully grouped.</h2>
              <p className="mt-4 leading-7 text-slate-600">Start with a familiar category and explore the sample catalog at your own pace.</p>
            </div>
            <Link href="/medicines" className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg py-2 text-sm font-bold text-brand hover:text-brandDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:self-auto">See all medicines <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {medicineCategories.map((category) => <CategoryCard key={category.id} category={category} />)}
          </div>
        </section>

        <section className="container-app pb-16 sm:pb-20">
          <div className="grid gap-5 lg:grid-cols-3">
            <article className="rounded-3xl border border-line bg-white p-6 sm:p-7">
              <span className="grid size-11 place-items-center rounded-2xl bg-mint text-brand"><Search size={20} aria-hidden="true" /></span>
              <h3 className="mt-5 text-lg font-bold text-ink">Find what you know</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Search the sample catalog by medicine name, strength or category.</p>
            </article>
            <article className="rounded-3xl border border-line bg-white p-6 sm:p-7">
              <span className="grid size-11 place-items-center rounded-2xl bg-sky-50 text-sky-700"><HeartHandshake size={20} aria-hidden="true" /></span>
              <h3 className="mt-5 text-lg font-bold text-ink">Browse at your pace</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Explore familiar categories and compare the basic information shown for each item.</p>
            </article>
            <article className="rounded-3xl border border-line bg-white p-6 sm:p-7">
              <span className="grid size-11 place-items-center rounded-2xl bg-violet-50 text-violet-700"><ShieldCheck size={20} aria-hidden="true" /></span>
              <h3 className="mt-5 text-lg font-bold text-ink">Know what is demo</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Products and prices are examples only. Demo orders are temporary and do not trigger payment or real fulfillment.</p>
            </article>
          </div>
        </section>

        <section aria-labelledby="care-services-heading" className="container-app pb-16 sm:pb-20">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand">More ways to care</p>
            <h2 id="care-services-heading" className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Care that fits your next step.</h2>
            <p className="mt-4 leading-7 text-slate-600">Explore the service previews and choose the kind of support you are looking for.</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Link href="/consultations" className="group flex items-center gap-4 rounded-3xl border border-line bg-white p-5 transition hover:border-brand/30 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:p-6">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sky-50 text-sky-700"><Stethoscope size={22} aria-hidden="true" /></span>
              <span className="min-w-0 flex-1"><span className="block text-lg font-bold text-ink">Talk with a doctor</span><span className="mt-1 block text-sm leading-6 text-slate-600">Explore sample specialties and appointment times.</span></span>
              <ArrowRight size={18} className="shrink-0 text-brand transition group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link href="/lab-tests" className="group flex items-center gap-4 rounded-3xl border border-line bg-white p-5 transition hover:border-brand/30 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:p-6">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-violet-50 text-violet-700"><FlaskConical size={22} aria-hidden="true" /></span>
              <span className="min-w-0 flex-1"><span className="block text-lg font-bold text-ink">Browse lab tests</span><span className="mt-1 block text-sm leading-6 text-slate-600">Compare sample tests, preparation, and home collection.</span></span>
              <ArrowRight size={18} className="shrink-0 text-brand transition group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="container-app pb-16 sm:pb-20">
          <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-9 text-white sm:px-10 sm:py-12">
            <div className="absolute -right-12 -top-20 size-64 rounded-full border-[40px] border-white/5" aria-hidden="true" />
            <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-teal-200">A good place to start</p>
                <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Explore the everyday care catalog.</h2>
                <p className="mt-3 leading-7 text-slate-300">A clear, simple way to browse the sample medicines and wellness essentials.</p>
              </div>
              <Link href="/medicines" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-ink transition hover:bg-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink">
                Browse medicines <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
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
