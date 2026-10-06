"use client";

import { useEffect } from "react";
import { HeartPulse, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/auth/auth-context";
import { applicationNavigation } from "@/config/navigation";

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "MP";
}

export function AppShell({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isReady, signOut } = useAuth();

  useEffect(() => {
    if (isReady && !user) router.replace("/sign-in");
  }, [isReady, router, user]);

  function handleSignOut() {
    signOut();
    router.replace("/sign-in");
  }

  if (!isReady || !user) {
    return <main className="grid min-h-screen place-items-center bg-cloud" aria-live="polite"><p className="text-sm font-medium text-slate-600">Preparing your workspace…</p></main>;
  }

  return (
    <div className="min-h-screen bg-cloud text-ink">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-line bg-white lg:flex">
        <Link className="flex h-[76px] items-center gap-3 border-b border-line px-6" href="/app" aria-label="Medicine Platform overview">
          <span className="grid size-10 place-items-center rounded-2xl bg-brand text-white"><HeartPulse size={21} strokeWidth={2.5} /></span>
          <span className="text-base font-bold tracking-tight">Medicine Platform</span>
        </Link>
        <p className="px-6 pb-3 pt-7 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">Care platform</p>
        <nav aria-label="Main navigation" className="space-y-1 px-3">
          {applicationNavigation.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link key={href} aria-current={active ? "page" : undefined} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${active ? "bg-mint text-brand" : "text-slate-600 hover:bg-slate-50 hover:text-ink"}`} href={href}>
                <Icon size={18} aria-hidden="true" />{label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto border-t border-line p-4">
          <div className="mb-3 flex items-center gap-3 px-2 py-2">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-mint text-xs font-bold text-brand" aria-hidden="true">{initials(user.name)}</span>
            <span className="min-w-0"><span className="block truncate text-sm font-semibold text-ink">{user.name}</span><span className="block truncate text-xs text-slate-500">{user.email}</span></span>
          </div>
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand" onClick={handleSignOut}>
            <LogOut size={18} aria-hidden="true" /> Sign out
          </button>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 border-b border-line bg-white/95 backdrop-blur">
          <div className="flex h-[76px] items-center justify-between gap-4 px-5 sm:px-8">
            <Link className="flex items-center gap-2.5 lg:hidden" href="/app" aria-label="Medicine Platform overview">
              <span className="grid size-9 place-items-center rounded-xl bg-brand text-white"><HeartPulse size={19} strokeWidth={2.5} /></span>
              <span className="text-sm font-bold tracking-tight">Medicine Platform</span>
            </Link>
            <p className="hidden text-sm font-medium text-slate-500 lg:block">Care workspace</p>
            <div className="ml-auto flex items-center gap-3">
              <span className="hidden max-w-48 truncate text-sm font-medium text-ink sm:block">{user.name}</span>
              <button aria-label="Sign out" className="grid size-10 place-items-center rounded-xl text-slate-600 transition hover:bg-slate-50 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand lg:hidden" onClick={handleSignOut}><LogOut size={18} aria-hidden="true" /></button>
              <span className="grid size-9 place-items-center rounded-full bg-mint text-xs font-bold text-brand lg:hidden" aria-hidden="true">{initials(user.name)}</span>
              <button className="hidden items-center gap-2 rounded-xl border border-line px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand lg:inline-flex" onClick={handleSignOut}>
                <LogOut size={16} aria-hidden="true" /> Sign out
              </button>
            </div>
          </div>
          <nav aria-label="Mobile navigation" className="grid grid-cols-4 gap-1 border-t border-line px-4 py-2 lg:hidden sm:px-8">
            {applicationNavigation.map(({ href, label, icon: Icon, exact }) => {
              const active = exact ? pathname === href : pathname.startsWith(href);
              return <Link key={href} aria-current={active ? "page" : undefined} className={`inline-flex min-w-0 flex-col items-center justify-center gap-1 rounded-lg px-1 py-2 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${active ? "bg-mint text-brand" : "text-slate-600 hover:bg-slate-50"}`} href={href}><Icon size={16} aria-hidden="true" /><span className="truncate">{label}</span></Link>;
            })}
          </nav>
        </header>
        <main className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
          {children}
          <footer className="mt-16 flex items-center justify-between gap-4 border-t border-line pt-5 text-xs text-slate-500">
            <span>Medicine Platform POC</span>
            <span className="inline-flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-teal-500" /> Private demo workspace</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
