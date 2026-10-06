import { Activity, ClipboardList, FileText, House, Pill, UserRound } from "lucide-react";

export const publicNavigation = [
  { href: "/", label: "Home", icon: House, exact: true },
  { href: "/medicines", label: "Medicines", icon: Pill, exact: false }
];

export const workspaceNavigation = [
  { href: "/app", label: "Overview", icon: Activity, exact: true },
  { href: "/orders", label: "Orders", icon: ClipboardList, exact: false },
  { href: "/prescriptions", label: "Prescriptions", icon: FileText, exact: false },
  { href: "/app/account", label: "Account", icon: UserRound, exact: false }
];

export const applicationNavigation = [...publicNavigation, ...workspaceNavigation];
