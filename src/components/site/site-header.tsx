"use client";

import { HeartPulse } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/auth/auth-context";
import { publicNavigation } from "@/config/navigation";
import { CartLink } from "@/components/cart/cart-link";

export function SiteHeader() {
  const { user, isReady } = useAuth();
  const pathname = usePathname();
  const accountHref = isReady && user ? "/app" : "/sign-in";
  const accountLabel = isReady && user ? "My workspace" : "Sign in";

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-white/95 backdrop-blur">
      <div className="container-app flex h-[72px] items-center justify-between gap-2 sm:gap-5">
        <Link href="/" className="flex shrink-0 items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2" aria-label="Medicine Platform home">
          <span className="grid size-10 place-items-center rounded-2xl bg-brand text-white shadow-soft"><HeartPulse size={21} strokeWidth={2.5} /></span>
          <span className="hidden text-base font-bold tracking-tight text-ink sm:inline">Medicine Platform</span>
        </Link>

        <nav aria-label="Main navigation" className="flex items-center gap-0 sm:gap-2">
          {publicNavigation.map(({ href, label, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return <Link key={href} href={href} aria-current={active ? "page" : undefined} className={`rounded-xl px-1 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:px-4 ${active ? "bg-mint text-brand" : "text-slate-600 hover:bg-cloud hover:text-brand"}`}>
              {label}
            </Link>;
          })}
          <CartLink />
          <Link href={accountHref} className="rounded-xl bg-brand px-2 py-2.5 text-sm font-bold text-white transition hover:bg-brandDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:ml-2 sm:px-4">
            {accountLabel}
          </Link>
        </nav>
      </div>
    </header>
  );
}
