import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DentFlow — Inteligentna Platforma dla Gabinetów Stomatologicznych | Novik Code",
  description: "Kompleksowy system zarządzania gabinetem stomatologicznym. Rezerwacje online, portal pacjenta, AI asystent, social media automation, SMS/push powiadomienia. Zapisz się na przedsprzedaż.",
  keywords: [
    "oprogramowanie stomatologiczne", "system dla dentysty", "gabinet stomatologiczny",
    "rezerwacje online dentysta", "portal pacjenta", "AI dentysta",
    "zarządzanie gabinetem", "DentFlow", "Novik Code", "SaaS stomatologia",
  ],
  openGraph: {
    title: "DentFlow — Cyfrowy Gabinet Stomatologiczny w 5 Minut",
    description: "Jedyny system łączący stronę www, portal pacjenta, AI asystent i social media automation w jednym produkcie.",
    url: "https://novikcode.com/dentflow",
    siteName: "Novik Code",
    type: "website",
    locale: "pl_PL",
  },
};

export default function DentFlowLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
