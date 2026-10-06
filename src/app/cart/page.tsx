import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/site-header";
import { CartPage } from "@/components/cart/cart-page";

export const metadata: Metadata = { title: "Cart | Medicine Platform", description: "Review your sample medicine selection." };

export default function CartRoute() {
  return <><SiteHeader /><CartPage /><footer className="border-t border-line bg-white"><div className="container-app py-6 text-sm text-slate-500">Medicine Platform POC · Sample selection for demonstration</div></footer></>;
}
