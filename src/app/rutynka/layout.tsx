import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rutynka — Poranne i Wieczorne Rutyny dla Dzieci | Novik Code",
  description: "Rutynka to aplikacja PWA pomagająca dzieciom i rodzicom w budowaniu zdrowych nawyków. Poranne i wieczorne rutyny, nagrody, postępy — w sprzedaży wkrótce.",
  keywords: [
    "rutyny dla dzieci", "poranna rutyna", "wieczorna rutyna", "aplikacja dla dzieci",
    "nawyki dzieci", "PWA dzieci", "Rutynka", "Novik Code",
  ],
  openGraph: {
    title: "Rutynka — Zdrowe Nawyki Twojego Dziecka",
    description: "Aplikacja pomagająca dzieciom budować poranne i wieczorne rutyny. Gamifikacja, nagrody, postępy.",
    url: "https://novikcode.com/rutynka",
    siteName: "Novik Code",
    type: "website",
    locale: "pl_PL",
  },
};

export default function RutynkaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
