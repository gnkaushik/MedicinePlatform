import { UserRound } from "lucide-react";

export default function AccountPage() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold text-brand">Workspace</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink">Account</h1>
        <p className="mt-2 leading-6 text-slate-600">A home for account settings as the POC develops.</p>
      </div>
      <section className="rounded-3xl border border-line bg-white px-6 py-10 text-center shadow-soft sm:px-10">
        <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-mint text-brand"><UserRound size={23} aria-hidden="true" /></span>
        <h2 className="mt-5 text-lg font-bold text-ink">Account settings will appear here</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">Your mock sign-in details are available in the account menu. Additional profile settings are outside this POC module.</p>
      </section>
    </div>
  );
}
