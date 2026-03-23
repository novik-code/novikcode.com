import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regulamin — DensFlow.Ai",
  description: "Regulamin świadczenia usług DensFlow.Ai — platformy AI do zarządzania gabinetem stomatologicznym.",
};

export default function RegulaminPage() {
  const sections = [
    {
      title: "Postanowienia ogólne",
      body: `<p>Niniejszy Regulamin określa zasady korzystania z platformy <strong>DensFlow.Ai</strong>, prowadzonej przez ELMAR Sp. z o.o. z siedzibą w Opolu (dalej: "Usługodawca").</p>
<p>NIP: 7542680826</p>
<p>Kontakt: <a href="mailto:marcin@nowosielski.pl">marcin@nowosielski.pl</a>, tel. <a href="tel:+48790740770">790 740 770</a></p>`,
    },
    {
      title: "Definicje",
      body: `<p><strong>Platforma</strong> — aplikacja webowa DensFlow.Ai dostępna pod adresem densflow.ai oraz novikcode.com/densflow.</p>
<p><strong>Użytkownik</strong> — osoba fizyczna, prawna lub jednostka organizacyjna korzystająca z Platformy.</p>
<p><strong>Licencja dożywotnia</strong> — jednorazowa opłata umożliwiająca bezterminowe korzystanie z Platformy i wszystkich jej obecnych oraz przyszłych funkcji.</p>
<p><strong>Subskrypcja</strong> — okresowa opłata miesięczna za dostęp do Platformy w wybranym pakiecie funkcji (dostępna po 1 września 2026).</p>`,
    },
    {
      title: "Zakres usług",
      body: `<p>Platforma DensFlow.Ai umożliwia:</p>
<ul>
<li>Tworzenie i zarządzanie stroną internetową gabinetu stomatologicznego</li>
<li>Rezerwacje online, portal pacjenta, czat pacjent-recepcja</li>
<li>Automatyzację komunikacji: SMS, email, push notifications</li>
<li>Narzędzia AI: asystent pracownika, drafty emailowe, content marketing</li>
<li>Unikalne narzędzia: Symulator Uśmiechu, Mapa Bólu, Kalkulator Leczenia</li>
<li>Raportowanie i analitykę gabinetu</li>
</ul>`,
    },
    {
      title: "Warunki przedsprzedaży",
      body: `<p>Licencja dożywotnia jest dostępna wyłącznie w okresie przedsprzedaży (do 1 września 2026) za jednorazową opłatą <strong>9 999 PLN</strong>.</p>
<p>Licencja obejmuje dostęp do wszystkich obecnych i przyszłych funkcji Platformy bez dodatkowych opłat.</p>
<p>Po zakończeniu przedsprzedaży (1 września 2026) Platforma będzie dostępna wyłącznie w modelu subskrypcyjnym.</p>`,
    },
    {
      title: "Gwarancja satysfakcji",
      body: `<p>Użytkownikowi przysługuje prawo do zwrotu w ciągu <strong>30 dni</strong> od momentu uruchomienia konta. W przypadku niezadowolenia z Platformy, zwracamy pełną kwotę bez pytań.</p>
<p>Zwrot następuje na rachunek bankowy Użytkownika w terminie 14 dni roboczych od zgłoszenia.</p>`,
    },
    {
      title: "Prawa własności intelektualnej",
      body: `<p>Wszelkie prawa autorskie, znaki towarowe oraz prawa własności intelektualnej do Platformy przysługują Usługodawcy.</p>
<p>Użytkownik otrzymuje licencję na korzystanie z Platformy zgodnie z warunkami niniejszego Regulaminu.</p>
<p>Treści wygenerowane przez Użytkownika w ramach Platformy pozostają własnością Użytkownika.</p>`,
    },
    {
      title: "Odpowiedzialność",
      body: `<p>Usługodawca dokłada wszelkich starań w celu zapewnienia ciągłości działania Platformy i bezpieczeństwa danych.</p>
<p>Usługodawca nie ponosi odpowiedzialności za przerwy w działaniu wynikające z przyczyn niezależnych (siła wyższa, awarie dostawców zewnętrznych).</p>
<p>Użytkownik zobowiązuje się do korzystania z Platformy zgodnie z obowiązującym prawem.</p>`,
    },
    {
      title: "Współtworzenie produktu",
      body: `<p>Użytkownicy posiadający licencję dożywotnią mają prawo do:</p>
<ul>
<li>Zgłaszania propozycji nowych funkcji</li>
<li>Głosowania nad priorytetami rozwoju produktu</li>
<li>Udziału w testach beta nowych wersji</li>
<li>Bezpośredniego kontaktu z zespołem deweloperskim</li>
</ul>
<p>Zgłoszone propozycje podlegają ocenie technicznej i mogą zostać wdrożone w ramach ogólnego planu rozwoju.</p>`,
    },
    {
      title: "Rozwiązanie umowy",
      body: `<p>Użytkownik może w dowolnym momencie zaprzestać korzystania z Platformy.</p>
<p>Usługodawca zastrzega sobie prawo do rozwiązania umowy w przypadku naruszenia Regulaminu przez Użytkownika.</p>
<p>W przypadku rozwiązania umowy z winy Usługodawcy, Użytkownikowi przysługuje proporcjonalny zwrot opłaty.</p>`,
    },
    {
      title: "Postanowienia końcowe",
      body: `<p>Regulamin obowiązuje od dnia 23 marca 2026 roku.</p>
<p>Usługodawca zastrzega sobie prawo do zmiany Regulaminu. O zmianach Użytkownicy zostaną poinformowani drogą mailową.</p>
<p>W sprawach nieuregulowanych zastosowanie mają przepisy prawa polskiego.</p>
<p>Sądem właściwym jest sąd właściwy dla siedziby Usługodawcy.</p>`,
    },
  ];

  return (
    <div style={{ background: "var(--nc-bg)", minHeight: "100vh", color: "var(--nc-text)" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "6rem 2rem 4rem" }}>
        <Link href="/densflow" style={{ fontSize: "0.78rem", color: "#0066FF", marginBottom: "2rem", display: "inline-block" }}>
          ← Powrót do DensFlow.Ai
        </Link>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, marginBottom: "0.5rem" }}>
          Regulamin
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
                  minWidth: 32, height: 28, borderRadius: 14,
                  background: "rgba(0,102,255,0.1)", border: "1px solid rgba(0,102,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.7rem", fontWeight: 700, color: "#0066FF", padding: "0 8px",
                }}>§ {i + 1}</span>
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
