import { Activity, House, Pill, UserRound } from "lucide-react";

export const publicNavigation = [
  { href: "/", label: "Home", icon: House, exact: true },
  { href: "/medicines", label: "Medicines", icon: Pill, exact: false }
];

export const workspaceNavigation = [
  { href: "/app", label: "Overview", icon: Activity, exact: true },
  { href: "/app/account", label: "Account", icon: UserRound, exact: false }
];

export const applicationNavigation = [...publicNavigation, ...workspaceNavigation];
