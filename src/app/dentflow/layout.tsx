import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DensFlow.Ai — Inteligentna Platforma AI dla Gabinetów Stomatologicznych",
  description: "Kompleksowy system zarządzania gabinetem stomatologicznym z AI. Rezerwacje online, portal pacjenta, AI asystent, social media automation, SMS/push powiadomienia. Kup licencję dożywotnią w przedsprzedaży.",
  keywords: [
    "oprogramowanie stomatologiczne", "system dla dentysty", "gabinet stomatologiczny",
    "rezerwacje online dentysta", "portal pacjenta", "AI dentysta",
    "zarządzanie gabinetem", "DensFlow", "DensFlow.Ai", "SaaS stomatologia",
  ],
  openGraph: {
    title: "DensFlow.Ai — Cyfrowy Gabinet Stomatologiczny w 5 Minut",
    description: "Jedyny system łączący stronę www, portal pacjenta, AI asystent i social media automation w jednym produkcie.",
    url: "https://novikcode.com/dentflow",
    siteName: "Novik Code",
    type: "website",
    locale: "pl_PL",
  },
};

export default function DensFlowLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
