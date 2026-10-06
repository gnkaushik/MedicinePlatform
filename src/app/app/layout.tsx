import { AppShell } from "@/components/app/app-shell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your care workspace | Medicine Platform",
  description: "Manage your sample Medicine Platform account, orders, and prescription references."
};

export default function AuthenticatedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AppShell>{children}</AppShell>;
}
