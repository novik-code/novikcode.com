import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Polityka Cookies — DensFlow.Ai",
  description: "Informacje o plikach cookies używanych przez DensFlow.Ai.",
};

export default function PolitykaCookiesPage() {
  const sections = [
    {
      title: "Czym są pliki cookies?",
      body: `<p>Pliki cookies (ciasteczka) to małe pliki tekstowe, które są zapisywane na urządzeniu Użytkownika podczas odwiedzania stron internetowych. Służą do zapamiętywania preferencji, analizy ruchu oraz zapewnienia prawidłowego działania serwisu.</p>`,
    },
    {
      title: "Administrator",
      body: `<p>Administratorem plików cookies jest <strong>ELMAR Sp. z o.o.</strong> z siedzibą w Opolu, NIP: 7542680826, obsługująca platformę DensFlow.Ai.</p>
<p>Kontakt: <a href="mailto:kontakt@densflow.ai" style="color: #0066FF">kontakt@densflow.ai</a></p>`,
    },
    {
      title: "Rodzaje cookies",
      body: `<p>Używamy następujących rodzajów plików cookies:</p>
<ul>
<li><strong>Niezbędne</strong> — wymagane do prawidłowego działania serwisu (sesja, autoryzacja, bezpieczeństwo). Nie wymagają zgody.</li>
<li><strong>Funkcjonalne</strong> — zapamiętują preferencje użytkownika (język, ustawienia wyświetlania).</li>
<li><strong>Analityczne</strong> — pozwalają analizować ruch na stronie i ulepszać jej działanie (Vercel Analytics).</li>
</ul>`,
    },
    {
      title: "Cookies podmiotów trzecich",
      body: `<p>W ramach Platformy mogą być stosowane cookies od następujących dostawców:</p>
<ul>
<li><strong>Vercel</strong> — hosting i analityka (vercel.com)</li>
<li><strong>Supabase</strong> — baza danych i autoryzacja (supabase.com)</li>
</ul>
<p>Nie udostępniamy żadnych danych cookie reklamodawcom.</p>`,
    },
    {
      title: "Zarządzanie cookies",
      body: `<p>Użytkownik może w dowolnym momencie zmienić ustawienia plików cookies w swojej przeglądarce:</p>
<ul>
<li><strong>Chrome</strong>: Ustawienia → Prywatność i bezpieczeństwo → Pliki cookie</li>
<li><strong>Firefox</strong>: Opcje → Prywatność i bezpieczeństwo → Ciasteczka</li>
<li><strong>Safari</strong>: Preferencje → Prywatność</li>
<li><strong>Edge</strong>: Ustawienia → Prywatność, wyszukiwanie i usługi</li>
</ul>
<p>Wyłączenie plików cookies może wpłynąć na działanie niektórych funkcji Platformy.</p>`,
    },
    {
      title: "Okres przechowywania",
      body: `<p>Pliki cookies sesyjne są usuwane po zamknięciu przeglądarki. Pliki cookies trwałe mogą być przechowywane do 12 miesięcy od ostatniej wizyty.</p>`,
    },
    {
      title: "Zmiany w polityce cookies",
      body: `<p>Zastrzegamy sobie prawo do zmiany niniejszej Polityki Cookies. O zmianach poinformujemy na stronie DensFlow.Ai.</p>
<p>Data ostatniej aktualizacji: 23 marca 2026.</p>`,
    },
  ];

  return (
    <div style={{ background: "var(--nc-bg)", minHeight: "100vh", color: "var(--nc-text)" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "6rem 2rem 4rem" }}>
        <Link href="/dentflow" style={{ fontSize: "0.78rem", color: "#0066FF", marginBottom: "2rem", display: "inline-block" }}>
          ← Powrót do DensFlow.Ai
        </Link>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, marginBottom: "0.5rem" }}>
          Polityka Cookies
        </h1>
        <p style={{ fontSize: "0.82rem", color: "rgba(232,230,240,0.4)", marginBottom: "3rem" }}>
          Ostatnia aktualizacja: 23 marca 2026
        </p>

        <div style={{
          background: "rgba(15,15,25,0.7)", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 20, padding: "clamp(1.5rem, 4vw, 3rem)",
        }}>
          {sections.map((s, i) => (
            <div key={i} style={{
              marginBottom: i < sections.length - 1 ? "2.5rem" : 0,
              paddingBottom: i < sections.length - 1 ? "2rem" : 0,
              borderBottom: i < sections.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
            }}>
              <h3 style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "1.1rem", color: "#0066FF", marginBottom: "1rem" }}>
                <span style={{
                  minWidth: 28, height: 28, borderRadius: "50%",
                  background: "rgba(0,102,255,0.1)", border: "1px solid rgba(0,102,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.75rem", fontWeight: 700, color: "#0066FF",
                }}>🍪</span>
                {s.title}
              </h3>
              <div
                style={{ color: "rgba(232,230,240,0.5)", lineHeight: 1.8, fontSize: "0.92rem" }}
                dangerouslySetInnerHTML={{ __html: s.body }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
