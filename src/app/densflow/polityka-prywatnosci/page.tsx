import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Polityka Prywatności — DensFlow.Ai",
  description: "Polityka prywatności DensFlow.Ai — informacje o przetwarzaniu danych osobowych zgodnie z RODO.",
};

export default function PolitykaPrywatnosciPage() {
  const sections = [
    {
      icon: "🏢",
      title: "Administrator danych",
      body: `<p>Administratorem danych osobowych jest <strong>ELMAR Sp. z o.o.</strong> z siedzibą w Opolu, NIP: 7542680826.</p>
<p>Kontakt: <a href="mailto:kontakt@densflow.ai" style="color: #0066FF">kontakt@densflow.ai</a>, tel. <a href="tel:+48790740770" style="color: #0066FF">790 740 770</a></p>`,
    },
    {
      icon: "📋",
      title: "Zakres i cel przetwarzania",
      body: `<p>Przetwarzamy dane osobowe w następujących celach:</p>
<ul>
<li>Realizacja umowy i świadczenie usług platformy DensFlow.Ai (art. 6 ust. 1 lit. b RODO)</li>
<li>Komunikacja z użytkownikami — email, SMS, powiadomienia (art. 6 ust. 1 lit. b RODO)</li>
<li>Marketing bezpośredni własnych produktów i usług (art. 6 ust. 1 lit. f RODO)</li>
<li>Prowadzenie rozliczeń i dokumentacji księgowej (art. 6 ust. 1 lit. c RODO)</li>
<li>Analiza i ulepszanie jakości usług (art. 6 ust. 1 lit. f RODO)</li>
</ul>`,
    },
    {
      icon: "🔐",
      title: "Bezpieczeństwo danych",
      body: `<p>Stosujemy następujące środki ochrony danych:</p>
<ul>
<li>Szyfrowanie transmisji danych (SSL/TLS)</li>
<li>Row Level Security (RLS) w bazie danych</li>
<li>Logowanie i audyt dostępu do danych</li>
<li>Rate limiting i ochrona przed atakami</li>
<li>Przechowywanie danych na serwerach w EU</li>
<li>Regularne kopie zapasowe</li>
</ul>`,
    },
    {
      icon: "👤",
      title: "Prawa użytkownika",
      body: `<p>Zgodnie z RODO przysługuje Ci prawo do:</p>
<ul>
<li>Dostępu do swoich danych osobowych</li>
<li>Sprostowania (poprawiania) danych</li>
<li>Usunięcia danych ("prawo do bycia zapomnianym")</li>
<li>Ograniczenia przetwarzania</li>
<li>Przenoszenia danych</li>
<li>Sprzeciwu wobec przetwarzania</li>
<li>Cofnięcia zgody na przetwarzanie (bez wpływu na zgodność z prawem przetwarzania przed cofnięciem)</li>
</ul>
<p>Aby skorzystać z tych praw, skontaktuj się z nami pod adresem <a href="mailto:kontakt@densflow.ai" style="color: #0066FF">kontakt@densflow.ai</a>.</p>`,
    },
    {
      icon: "⏱️",
      title: "Okres przechowywania danych",
      body: `<p>Dane osobowe przechowujemy przez okres:</p>
<ul>
<li>Trwania umowy z Użytkownikiem</li>
<li>Wymagany przepisami prawa podatkowego i księgowego (5 lat)</li>
<li>Do momentu wycofania zgody — w przypadku danych przetwarzanych na podstawie zgody</li>
<li>Do momentu wniesienia sprzeciwu — w przypadku danych przetwarzanych na podstawie prawnie uzasadnionego interesu</li>
</ul>`,
    },
    {
      icon: "📤",
      title: "Udostępnianie danych",
      body: `<p>Dane osobowe mogą być udostępniane następującym kategoriom odbiorców:</p>
<ul>
<li>Dostawcy usług chmurowych (Vercel, Supabase) — przetwarzanie w EU</li>
<li>Dostawcy usług SMS (SMSAPI)</li>
<li>Dostawcy usług płatniczych</li>
<li>Organy państwowe — wyłącznie na podstawie przepisów prawa</li>
</ul>
<p>Nie sprzedajemy danych osobowych stronym trzecim. Nie przekazujemy danych poza Europejski Obszar Gospodarczy.</p>`,
    },
    {
      icon: "📞",
      title: "Kontakt",
      body: `<p>W sprawach dotyczących ochrony danych osobowych prosimy o kontakt:</p>
<p><strong>ELMAR Sp. z o.o.</strong><br/>Opole, Polska<br/>
Email: <a href="mailto:kontakt@densflow.ai" style="color: #0066FF">kontakt@densflow.ai</a><br/>
Tel.: <a href="tel:+48790740770" style="color: #0066FF">790 740 770</a></p>
<p>Masz prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (PUODO).</p>`,
    },
  ];

  return (
    <div style={{ background: "var(--nc-bg)", minHeight: "100vh", color: "var(--nc-text)" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "6rem 2rem 4rem" }}>
        <Link href="/densflow" style={{ fontSize: "0.78rem", color: "#0066FF", marginBottom: "2rem", display: "inline-block" }}>
          ← Powrót do DensFlow.Ai
        </Link>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, marginBottom: "0.5rem" }}>
          Polityka Prywatności
        </h1>
        <p style={{ fontSize: "0.82rem", color: "rgba(232,230,240,0.4)", marginBottom: "3rem" }}>
          Ostatnia aktualizacja: 23 marca 2026 · Zgodność z RODO/GDPR
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {sections.map((s, i) => (
            <div key={i} style={{
              background: "rgba(15,15,25,0.7)", border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 16, padding: "clamp(1.5rem, 3vw, 2rem)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: "rgba(0,102,255,0.08)", border: "1px solid rgba(0,102,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.1rem",
                }}>{s.icon}</div>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>{s.title}</h2>
              </div>
              <div
                style={{ color: "rgba(232,230,240,0.5)", lineHeight: 1.8, fontSize: "0.92rem", paddingLeft: "calc(40px + 0.75rem)" }}
                dangerouslySetInnerHTML={{ __html: s.body }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
