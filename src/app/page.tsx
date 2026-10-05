import { ArrowRight, FlaskConical, HeartPulse, Pill, ShieldCheck, Stethoscope } from "lucide-react";

const services = [
  { title: "Medicines", text: "Find everyday medicines and wellness essentials.", icon: Pill },
  { title: "Lab Tests", text: "Explore diagnostics and health packages.", icon: FlaskConical },
  { title: "Consult Doctors", text: "Connect with care when you need it.", icon: Stethoscope }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-line bg-white/95 backdrop-blur">
        <div className="container-app flex h-20 items-center justify-between gap-6">
          <a href="/" className="flex items-center gap-3" aria-label="Medicine Platform home">
            <span className="grid size-10 place-items-center rounded-2xl bg-brand text-white shadow-soft">
              <HeartPulse size={21} strokeWidth={2.5} />
            </span>
            <span className="text-lg font-bold tracking-tight text-ink">Medicine Platform</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a className="hover:text-brand" href="#services">Medicines</a>
            <a className="hover:text-brand" href="#services">Lab Tests</a>
            <a className="hover:text-brand" href="#services">Consult Doctors</a>
            <a className="hover:text-brand" href="#care">Care Plan</a>
          </nav>

          <button className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-brand hover:text-brand">
            Sign in
          </button>
        </div>
      </header>

      <section className="bg-cloud">
        <div className="container-app grid min-h-[560px] items-center gap-12 py-16 lg:grid-cols-[1.08fr_.92fr] lg:py-20">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-mint px-4 py-2 text-sm font-semibold text-brand">
              <ShieldCheck size={16} />
              Care that fits your life
            </div>
            <h1 className="max-w-3xl text-5xl font-bold leading-[1.04] tracking-[-0.04em] text-ink sm:text-6xl">
              Your health, beautifully connected.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Medicines, diagnostics and doctor care — brought together in one simple experience.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#services" className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-bold text-white shadow-soft transition hover:bg-brandDark">
                Explore healthcare <ArrowRight size={17} />
              </a>
              <button className="rounded-full border border-line bg-white px-6 py-3.5 text-sm font-bold text-ink transition hover:border-brand">
                Upload prescription
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] bg-white p-6 shadow-lift">
              <div className="rounded-[1.5rem] bg-mint p-7">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-brand">Today’s care hub</span>
                  <span className="size-3 rounded-full bg-brand" />
                </div>
                <div className="mt-10 grid gap-3">
                  {services.map(({ title, icon: Icon }) => (
                    <div key={title} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-soft">
                      <span className="grid size-11 place-items-center rounded-xl bg-cloud text-brand"><Icon size={20} /></span>
                      <div>
                        <p className="font-bold text-ink">{title}</p>
                        <p className="text-xs text-slate-500">Explore now</p>
                      </div>
                      <ArrowRight className="ml-auto text-slate-400" size={17} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="container-app py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand">One platform</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Everything starts here.</h2>
          <p className="mt-4 leading-7 text-slate-600">A modular foundation designed to grow from a POC into a full healthcare marketplace.</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {services.map(({ title, text, icon: Icon }) => (
            <article key={title} className="group rounded-3xl border border-line bg-white p-7 transition duration-200 hover:-translate-y-1 hover:shadow-soft">
              <span className="grid size-12 place-items-center rounded-2xl bg-mint text-brand">
                <Icon size={22} />
              </span>
              <h3 className="mt-7 text-xl font-bold text-ink">{title}</h3>
              <p className="mt-2 leading-6 text-slate-600">{text}</p>
              <button className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand">
                Explore <ArrowRight size={16} />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section id="care" className="container-app pb-20">
        <div className="rounded-[2rem] bg-ink px-7 py-10 text-white sm:px-10">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal-200">Built for what’s next</p>
          <div className="mt-3 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">A foundation we can scale.</h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-300">Authentication, commerce, diagnostics and consultations will plug into this shared design system as the POC grows.</p>
            </div>
            <span className="rounded-full border border-white/15 px-4 py-2 text-sm text-slate-300">Module 1 · Foundation</span>
          </div>
        </div>
      </section>

      <footer className="border-t border-line">
        <div className="container-app flex flex-col gap-3 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>Medicine Platform POC</span>
          <span>Designed for scale · Built for clarity</span>
        </div>
      </footer>
    </main>
  );
}
