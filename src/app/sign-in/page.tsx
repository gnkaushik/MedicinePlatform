import type { Metadata } from "next";
import { HeartPulse } from "lucide-react";
import { SignInForm } from "@/components/auth/sign-in-form";

export const metadata: Metadata = {
  title: "Sign in | Medicine Platform",
  description: "Sign in to your Medicine Platform workspace."
};

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-cloud lg:grid lg:grid-cols-[1fr_1fr]">
      <section className="flex min-h-screen items-center justify-center bg-white px-6 py-12 sm:px-10 lg:px-16 xl:px-24">
        <SignInForm />
      </section>
      <aside className="hidden flex-col justify-between bg-ink px-12 py-14 text-white lg:flex xl:px-16">
        <p className="text-sm font-semibold tracking-wide text-teal-200">MEDICINE PLATFORM · CARE WORKSPACE</p>
        <div className="max-w-xl pb-10">
          <span className="mb-8 grid size-14 place-items-center rounded-2xl bg-white/10 text-teal-200"><HeartPulse size={28} strokeWidth={2} /></span>
          <h2 className="text-4xl font-bold leading-tight tracking-tight xl:text-5xl">A clearer way to coordinate care.</h2>
          <p className="mt-5 max-w-lg text-lg leading-8 text-slate-300">A calm, connected workspace designed around the people who make healthcare work.</p>
        </div>
        <p className="text-sm text-slate-400">A simple foundation for better connected health.</p>
      </aside>
    </main>
  );
}
