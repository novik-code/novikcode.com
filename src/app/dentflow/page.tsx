"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

/* ─── HELPERS ─── */
function Section({ children, id, delay = 0 }: { children: React.ReactNode; id?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.section ref={ref} id={id}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >{children}</motion.section>
  );
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const dur = 2000, start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── DATA ─── */
const problems = [
  { icon: "📞", problem: "Pacjenci dzwonią, a recepcja zajęta", solution: "Rezerwacja online 24/7 — pacjent sam wybiera termin" },
  { icon: "📋", problem: "Papierowe zgody, drukarka, toner...", solution: "Zgody cyfrowe z podpisem na ekranie + auto-PDF" },
  { icon: "💬", problem: "SMSy wysyłane ręcznie, jeden po drugim", solution: "Automatyczne przypomnienia SMS/push/email" },
  { icon: "📱", problem: "Brak strony www lub przestarzała strona", solution: "Nowoczesna strona PWA gotowa w 5 minut" },
  { icon: "🤯", problem: "Social media? Kto ma na to czas?", solution: "AI generuje posty, Facebook/Insta/TikTok auto-publish" },
  { icon: "📊", problem: "Brak widoku na to co się dzieje w gabinecie", solution: "Dashboard z raportami + codzienny raport na Telegram" },
];

const features = [
  {
    category: "Strona WWW & Marketing",
    color: "#e07830",
    items: [
      { icon: "🌐", title: "Strona wizytówka", desc: "Responsywna strona z SEO, blog, cennik, oferta — gotowa od razu" },
      { icon: "📝", title: "Blog & baza wiedzy", desc: "Artykuły generowane przez AI, optymalizowane pod SEO" },
      { icon: "🛒", title: "Sklep online", desc: "E-commerce z produktami stomatologicznymi, płatności online" },
      { icon: "📱", title: "Aplikacja PWA", desc: "Instalowalna jak natywna aplikacja na iOS/Android — bez App Store" },
    ],
  },
  {
    category: "Zarządzanie Pacjentami",
    color: "#d4af37",
    items: [
      { icon: "📅", title: "Rezerwacja online", desc: "Pacjent sam wybiera lekarza, usługę i termin — integracja z Prodentis" },
      { icon: "💬", title: "Czat pacjent-recepcja", desc: "Chat w czasie rzeczywistym — bez telefonu i kolejek" },
      { icon: "✍️", title: "Zgody cyfrowe", desc: "Formularze zgód z podpisem biometrycznym, auto-generowanie PDF" },
      { icon: "📄", title: "E-karta pacjenta", desc: "Historia wizyt, zalecania, zdjęcia, dokumenty — wszystko online" },
    ],
  },
  {
    category: "Sztuczna Inteligencja",
    color: "#9370db",
    items: [
      { icon: "🤖", title: "AI Asystent pracownika", desc: "Głosowy asystent GPT-4o z pamięcią, kontekstem gabinetu i bazą wiedzy" },
      { icon: "✉️", title: "AI drafty emailowe", desc: "Automatyczne szkice odpowiedzi na maile pacjentów" },
      { icon: "📢", title: "AI content marketing", desc: "Generowanie postów na social media z autopublikacją" },
      { icon: "🎙️", title: "Interfejs głosowy", desc: "Text-to-speech i rozpoznawanie mowy — ręce wolne" },
    ],
  },
  {
    category: "Automatyzacja & Komunikacja",
    color: "#4a6cf7",
    items: [
      { icon: "📲", title: "SMS przypomnienia", desc: "Automatyczne SMS 24h przed wizytą + follow-up po wizycie" },
      { icon: "🔔", title: "Push notifications", desc: "Powiadomienia w przeglądarce i na telefonie — bez aplikacji" },
      { icon: "📧", title: "Email automation", desc: "Potwierdzenia rezerwacji, zmiany statusu, komunikacja" },
      { icon: "📊", title: "Raport dzienny", desc: "Codzienne podsumowanie na Telegram o 7:00 rano" },
    ],
  },
];

const uniqueTools = [
  {
    icon: "🗺️",
    title: "Interaktywna Mapa Bólu",
    desc: "Pacjent wskazuje miejsce bólu na interaktywnym modelu 3D żuchwy/szczęki. System sugeruje możliwe diagnozy i rekomenduje wizytę. Potężne narzędzie lead generation.",
    gradient: "linear-gradient(135deg, rgba(224, 120, 48, 0.12) 0%, rgba(212, 175, 55, 0.08) 100%)",
  },
  {
    icon: "😁",
    title: "AI Symulator Uśmiechu",
    desc: "Pacjent wgrywa selfie, a AI transformuje go w idealny uśmiech. Pokazuje efekt leczenia ZANIM pacjent zdecyduje się na zabieg. Wow-efekt gwarantowany.",
    gradient: "linear-gradient(135deg, rgba(107, 66, 201, 0.12) 0%, rgba(147, 112, 219, 0.08) 100%)",
  },
  {
    icon: "⏱️",
    title: "Kalkulator Czasu Leczenia",
    desc: "Wizard prowadzący pacjenta przez pytania diagnostyczne. Na końcu: szacowany czas leczenia, koszty, plan działania. Automatycznie generuje lead.",
    gradient: "linear-gradient(135deg, rgba(74, 108, 247, 0.12) 0%, rgba(107, 66, 201, 0.08) 100%)",
  },
  {
    icon: "⚖️",
    title: "Porównywarka Rozwiązań",
    desc: "Patient Decision Console — porównanie opcji leczenia (np. implant vs most vs proteza) z cenami, czasem, zaletami/wadami. Pomaga pacjentowi podjąć decyzję.",
    gradient: "linear-gradient(135deg, rgba(212, 175, 55, 0.12) 0%, rgba(224, 120, 48, 0.08) 100%)",
  },
];

const plans = [
  {
    name: "Starter",
    lifetimePrice: "1 499",
    monthlyAfter: "299",
    desc: "Dla gabinetów startujących z cyfryzacją",
    features: [
      "Strona wizytówka z SEO",
      "Rezerwacja online",
      "SMS przypomnienia",
      "Push notifications",
      "Blog / baza wiedzy",
      "Cennik online",
      "Responsywny design PWA",
      "Telegram raporty",
    ],
    highlight: false,
  },
  {
    name: "Pro",
    lifetimePrice: "2 999",
    monthlyAfter: "599",
    desc: "Pełna automatyzacja i AI",
    features: [
      "Wszystko ze Starter",
      "Portal pacjenta",
      "Czat pacjent-recepcja",
      "Zgody cyfrowe (podpis)",
      "E-karta pacjenta",
      "AI asystent pracownika",
      "AI email drafty",
      "System zadań (Trello)",
      "Grafik pracownika",
      "Raport dzienny",
    ],
    highlight: true,
  },
  {
    name: "Enterprise",
    lifetimePrice: "4 999",
    monthlyAfter: "999",
    desc: "Maximum mocy — AI i social media",
    features: [
      "Wszystko z PRO",
      "Social media AI posting",
      "Video pipeline (TikTok/YT)",
      "Symulator Uśmiechu (AI)",
      "Mapa Bólu interaktywna",
      "Kalkulator leczenia",
      "Porównywarka rozwiązań",
      "Auto-odpowiedzi social",
      "E-commerce (sklep)",
      "Custom branding",
      "Dedykowane wsparcie",
    ],
    highlight: false,
  },
];

const coCreationPerks = [
  { icon: "💡", title: "Zgłaszaj funkcje", desc: "Proponuj nowe funkcjonalności — Twoje potrzeby kształtują roadmapę produktu" },
  { icon: "🗳️", title: "Głosuj na priorytety", desc: "Decyduj, co budujemy w pierwszej kolejności — demokratyczny rozwój" },
  { icon: "🧪", title: "Beta dostęp", desc: "Testuj nowe funkcje zanim trafią do publicznej wersji" },
  { icon: "🤝", title: "Bezpośredni kontakt", desc: "Dedykowany kanał komunikacji z zespołem deweloperskim" },
];

const faqs = [
  { q: "Czym jest licencja dożywotnia?", a: "Kupując w przedsprzedaży płacisz jednorazowo i otrzymujesz dostęp do DentFlow NA ZAWSZE. Po premierze produkt będzie dostępny wyłącznie w modelu subskrypcyjnym (299–999 PLN/mies.). Licencja dożywotnia to oferta tylko dla uczestników przedsprzedaży." },
  { q: "Czy DentFlow wymaga instalacji?", a: "Nie. DentFlow działa w 100% w chmurze. Wystarczy przeglądarka — na komputerze, tablecie lub telefonie. Można też zainstalować jako aplikację PWA." },
  { q: "Jak mogę współtworzyć produkt?", a: "Każdy uczestnik przedsprzedaży dostaje dostęp do panelu współtworzenia — możesz zgłaszać propozycje nowych funkcji, głosować na priorytety i testować beta wersje. Twój głos realnie wpływa na kształt produktu." },
  { q: "Czy mogę zintegrować z moim obecnym systemem?", a: "Tak! DentFlow integruje się z Prodentis, Google Calendar, SMSAPI, Meta (Facebook/Instagram), YouTube, TikTok i innymi popularnymi narzędziami." },
  { q: "Ile trwa wdrożenie?", a: "Strona i podstawowa konfiguracja są gotowe w ciągu jednego dnia roboczego. Pełne wdrożenie z migracją danych i szkoleniem: 3-5 dni roboczych." },
  { q: "Czy dane pacjentów są bezpieczne?", a: "Tak. Stosujemy szyfrowanie, RLS (Row Level Security), audyt logów, rate limiting, oraz pełną zgodność z RODO/GDPR. Dane przechowywane na serwerach w EU." },
  { q: "Co jeśli produkt nie spełni moich oczekiwań?", a: "Oferujemy gwarancję satysfakcji. Jeśli w ciągu 30 dni od uruchomienia DentFlow nie spełnia Twoich oczekiwań — zwracamy pieniądze. Bez pytań." },
  { q: "Czy mogę przenieść swoją obecną stronę?", a: "Tak. Możemy przenieść treści z Twojej obecnej strony do DentFlow. Obsługujemy również przekierowania 301 dla zachowania SEO." },
];

/* ─── PAGE ─── */
export default function DentFlowPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ position: "relative" }}>
      {/* ═══ NAVIGATION ═══ */}
      <motion.nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: "0.8rem 2rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "rgba(6, 6, 10, 0.8)", backdropFilter: "blur(24px)",
          borderBottom: "1px solid var(--nc-glass-border)",
        }}
        initial={{ y: -100 }} animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
          <Image src="/logo.png" alt="Novik Code" width={32} height={32} style={{ borderRadius: 6 }} />
          <span style={{ fontWeight: 700, fontSize: "1rem", letterSpacing: "0.05em", color: "var(--nc-text)" }}>
            <span className="gradient-text">Novik</span>Code
          </span>
        </Link>
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          {[
            { href: "#funkcje", label: "Funkcje" },
            { href: "#ai", label: "AI" },
            { href: "#cennik", label: "Cennik" },
            { href: "#faq", label: "FAQ" },
          ].map((l) => (
            <motion.a key={l.href} href={l.href} className="hide-mobile"
              style={{ fontSize: "0.8rem", color: "var(--nc-text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500, textDecoration: "none" }}
              whileHover={{ color: "#e8e6f0" }}
            >{l.label}</motion.a>
          ))}
          <motion.a href="#zapisz-sie"
            style={{
              padding: "0.5rem 1.2rem", borderRadius: 50,
              background: "var(--nc-gradient-main)", backgroundSize: "200% 100%",
              animation: "gradient-shift 3s ease-in-out infinite",
              color: "#fff", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.05em",
              textTransform: "uppercase", textDecoration: "none",
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(224, 120, 48, 0.3)" }}
          >🦷 Zarezerwuj Miejsce</motion.a>
        </div>
      </motion.nav>

      {/* ═══ HERO ═══ */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden", padding: "7rem 2rem 5rem",
      }}>
        {/* Animated bg */}
        <div style={{ position: "absolute", inset: "-15%", zIndex: 0 }}>
          <div style={{
            width: "100%", height: "100%",
            backgroundImage: "url(/logo.png)", backgroundSize: "cover", backgroundPosition: "center",
            animation: "kenBurns 30s ease-in-out infinite", opacity: 0.1, filter: "blur(3px) saturate(1.3)",
          }} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 15%, var(--nc-bg) 70%)", zIndex: 0 }} />

        <div style={{ maxWidth: 900, width: "100%", textAlign: "center", position: "relative", zIndex: 3 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.4rem 1.2rem", borderRadius: 50,
              background: "rgba(224, 120, 48, 0.1)", border: "1px solid rgba(224, 120, 48, 0.2)",
              fontSize: "0.72rem", fontWeight: 600, color: "var(--nc-orange)",
              letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "2rem",
            }}>
              🚀 Przedsprzedaż — Licencja Dożywotnia
            </div>
          </motion.div>

          <motion.h1
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 4rem)", fontWeight: 800, lineHeight: 1.08, marginBottom: "1.5rem" }}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Cyfrowy Gabinet{" "}
            <span className="gradient-text">Stomatologiczny</span>
            <br />w 5 Minut
          </motion.h1>

          <motion.p
            style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "var(--nc-text-muted)", maxWidth: 600, margin: "0 auto 2.5rem", lineHeight: 1.8 }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Jedyny system łączący <strong style={{ color: "var(--nc-text)" }}>stronę www, portal pacjenta, AI asystent i social media automation</strong> w jednym produkcie. Bez instalacji. Bez IT. Gotowy od zaraz.
          </motion.p>

          <motion.div
            style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.a href="#zapisz-sie"
              style={{
                padding: "1rem 2.5rem", borderRadius: 50,
                background: "var(--nc-gradient-main)", backgroundSize: "200% 100%",
                animation: "gradient-shift 3s ease-in-out infinite",
                color: "#fff", fontSize: "1rem", fontWeight: 700, textDecoration: "none",
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 16px 50px rgba(224, 120, 48, 0.35)" }}
              whileTap={{ scale: 0.97 }}
            >
              Kup Licencję Dożywotnią →
            </motion.a>
            <motion.a href="#funkcje"
              style={{
                padding: "1rem 2.5rem", borderRadius: 50,
                background: "transparent", border: "1px solid var(--nc-glass-border)",
                color: "var(--nc-text)", fontSize: "1rem", fontWeight: 500, textDecoration: "none",
              }}
              whileHover={{ borderColor: "rgba(224, 120, 48, 0.4)", background: "rgba(224, 120, 48, 0.05)" }}
            >
              Zobacz funkcje
            </motion.a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            style={{
              display: "flex", justifyContent: "center", gap: "2.5rem", marginTop: "3.5rem",
              flexWrap: "wrap",
            }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            {[
              "♾️ Licencja dożywotnia",
              "💡 Współtwórz produkt",
              "✅ Wdrożenie w 1 dzień",
              "✅ RODO / GDPR",
            ].map((badge) => (
              <span key={badge} style={{ fontSize: "0.78rem", color: "var(--nc-text-muted)", letterSpacing: "0.03em" }}>
                {badge}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ PROBLEMY → ROZWIĄZANIA ═══ */}
      <Section>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "5rem 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nc-orange)", fontWeight: 600 }}>
              Znany Ci ten ból?
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", marginTop: "0.8rem" }}>
              Problemy <span className="gradient-text">które rozwiązujemy</span>
            </h2>
          </div>
          <div className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.25rem" }}>
            {problems.map((p, i) => (
              <motion.div key={i}
                style={{
                  background: "var(--nc-glass)", border: "1px solid var(--nc-glass-border)",
                  borderRadius: 16, padding: "1.75rem", position: "relative", overflow: "hidden",
                }}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                whileHover={{ borderColor: "rgba(224, 120, 48, 0.25)", y: -3 }}
              >
                <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>{p.icon}</div>
                <p style={{ color: "rgba(255,130,130,0.7)", fontSize: "0.85rem", marginBottom: "0.5rem", textDecoration: "line-through", lineHeight: 1.5 }}>
                  {p.problem}
                </p>
                <p style={{ color: "rgba(130,255,160,0.8)", fontSize: "0.9rem", fontWeight: 600, lineHeight: 1.5 }}>
                  ✓ {p.solution}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ FEATURES ═══ */}
      <Section id="funkcje">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "5rem 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nc-purple-light)", fontWeight: 600 }}>
              Pełna Lista Funkcji
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", marginTop: "0.8rem" }}>
              Wszystko czego <span className="gradient-text">potrzebuje Twój gabinet</span>
            </h2>
          </div>

          {features.map((cat, ci) => (
            <div key={cat.category} style={{ marginBottom: "3rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                <div style={{ width: 4, height: 28, borderRadius: 2, background: cat.color }} />
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: cat.color }}>{cat.category}</h3>
              </div>
              <div className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
                {cat.items.map((f, fi) => (
                  <motion.div key={f.title}
                    style={{
                      background: "var(--nc-glass)", border: "1px solid var(--nc-glass-border)",
                      borderRadius: 14, padding: "1.5rem",
                    }}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: ci * 0.05 + fi * 0.05 }}
                    whileHover={{ borderColor: `${cat.color}40`, y: -3 }}
                  >
                    <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{f.icon}</div>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.5rem" }}>{f.title}</h4>
                    <p style={{ fontSize: "0.82rem", color: "var(--nc-text-muted)", lineHeight: 1.6 }}>{f.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══ UNIQUE AI TOOLS ═══ */}
      <Section id="ai">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "5rem 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nc-orange)", fontWeight: 600 }}>
              Tylko w DentFlow
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", marginTop: "0.8rem" }}>
              Narzędzia których <span className="gradient-text">nie znajdziesz nigdzie indziej</span>
            </h2>
            <p style={{ color: "var(--nc-text-muted)", maxWidth: 550, margin: "1rem auto 0", fontSize: "0.95rem" }}>
              Unikalne narzędzia AI i interaktywne doświadczenia, które Twoja konkurencja może tylko pomarzyć.
            </p>
          </div>

          <div className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {uniqueTools.map((tool, i) => (
              <motion.div key={tool.title}
                style={{
                  background: tool.gradient, border: "1px solid var(--nc-glass-border)",
                  borderRadius: 20, padding: "2.5rem", position: "relative", overflow: "hidden",
                }}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.6 }}
                whileHover={{ y: -5, borderColor: "rgba(224, 120, 48, 0.3)" }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{tool.icon}</div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "0.75rem" }}>{tool.title}</h3>
                <p style={{ color: "var(--nc-text-muted)", fontSize: "0.9rem", lineHeight: 1.7 }}>{tool.desc}</p>
                <div style={{
                  position: "absolute", top: -60, right: -60, width: 180, height: 180, borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
                }} />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ SOCIAL PROOF STATS ═══ */}
      <Section>
        <div style={{
          maxWidth: 1100, margin: "0 auto", padding: "3rem 2rem",
          borderTop: "1px solid var(--nc-glass-border)", borderBottom: "1px solid var(--nc-glass-border)",
        }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nc-amber)", fontWeight: 600 }}>
              Zbudowane w produkcji
            </span>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", marginTop: "0.8rem" }}>
              <span className="gradient-text">Battle-Tested</span> w Prawdziwym Gabinecie
            </h2>
            <p style={{ color: "var(--nc-text-muted)", fontSize: "0.9rem", marginTop: "0.5rem" }}>
              DentFlow powstał z potrzeb realnego gabinetu stomatologicznego z 3+ miesiącami w produkcji.
            </p>
          </div>
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem", textAlign: "center" }}>
            {[
              { val: 85, suf: "+", label: "Endpointów API" },
              { val: 16, suf: "", label: "Integracji" },
              { val: 39, suf: "+", label: "Tabel w bazie" },
              { val: 17, suf: "", label: "Zadań Cron" },
            ].map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              >
                <div className="gradient-text" style={{ fontSize: "2.5rem", fontWeight: 800, lineHeight: 1 }}>
                  <Counter value={s.val} suffix={s.suf} />
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--nc-text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "0.4rem" }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ CO-CREATION ═══ */}
      <Section id="wspoltworzenie">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "5rem 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nc-amber)", fontWeight: 600 }}>
              Tylko w Przedsprzedaży
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", marginTop: "0.8rem" }}>
              Współtwórz <span className="gradient-text">Produkt Przyszłości</span>
            </h2>
            <p style={{ color: "var(--nc-text-muted)", maxWidth: 600, margin: "1rem auto 0", fontSize: "0.95rem", lineHeight: 1.7 }}>
              Kupując w przedsprzedaży nie tylko zyskujesz dożywotni dostęp — <strong style={{ color: "var(--nc-text)" }}>realnie wpływasz na to, jak DentFlow będzie wyglądał</strong>.
              Twoje potrzeby kształtują roadmapę produktu.
            </p>
          </div>
          <div className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }}>
            {coCreationPerks.map((perk, i) => (
              <motion.div key={perk.title}
                style={{
                  background: "var(--nc-glass)", border: "1px solid var(--nc-glass-border)",
                  borderRadius: 16, padding: "2rem", textAlign: "center",
                }}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ borderColor: "rgba(212, 175, 55, 0.3)", y: -3 }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{perk.icon}</div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.5rem" }}>{perk.title}</h4>
                <p style={{ fontSize: "0.82rem", color: "var(--nc-text-muted)", lineHeight: 1.5 }}>{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ PRICING ═══ */}
      <Section id="cennik">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "5rem 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <span style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nc-orange)", fontWeight: 600 }}>
              Przedsprzedaż
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", marginTop: "0.8rem" }}>
              Licencja <span className="gradient-text">Dożywotnia</span>
            </h2>
            <p style={{ color: "var(--nc-text-muted)", fontSize: "0.95rem", marginTop: "0.5rem", maxWidth: 650, margin: "0.5rem auto 0" }}>
              Jednorazowa opłata — dostęp <strong style={{ color: "var(--nc-text)" }}>na zawsze</strong>. Po premierze produkt przejdzie na model subskrypcyjny. Licencja dożywotnia dostępna wyłącznie w przedsprzedaży.
            </p>
          </div>

          {/* Subscription comparison callout */}
          <motion.div
            style={{
              maxWidth: 600, margin: "0 auto 3rem", padding: "1rem 1.5rem",
              background: "rgba(224, 120, 48, 0.06)", border: "1px solid rgba(224, 120, 48, 0.15)",
              borderRadius: 14, textAlign: "center",
            }}
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p style={{ fontSize: "0.82rem", color: "var(--nc-text-muted)", margin: 0, lineHeight: 1.6 }}>
              💡 <strong style={{ color: "var(--nc-orange)" }}>Po premierze:</strong> subskrypcja od <strong>299 PLN/mies.</strong> do <strong>999 PLN/mies.</strong>
              <br />Kupując teraz oszczędzasz <strong style={{ color: "rgba(130,255,160,0.8)" }}>tysiące złotych rocznie</strong> i zyskujesz wpływ na produkt.
            </p>
          </motion.div>

          <div className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", alignItems: "stretch" }}>
            {plans.map((plan, i) => (
              <motion.div key={plan.name}
                style={{
                  background: plan.highlight ? "var(--nc-gradient-card)" : "var(--nc-glass)",
                  border: plan.highlight ? "2px solid rgba(224, 120, 48, 0.3)" : "1px solid var(--nc-glass-border)",
                  borderRadius: 20, padding: "2.5rem 2rem",
                  position: "relative", overflow: "hidden",
                  display: "flex", flexDirection: "column",
                }}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                whileHover={{ y: -5, borderColor: "rgba(224, 120, 48, 0.4)" }}
              >
                {plan.highlight && (
                  <div style={{
                    position: "absolute", top: 16, right: -30, transform: "rotate(45deg)",
                    background: "var(--nc-gradient-main)", padding: "0.25rem 2.5rem",
                    fontSize: "0.6rem", fontWeight: 700, color: "#fff", letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}>
                    Popularne
                  </div>
                )}

                <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.3rem" }}>{plan.name}</h3>
                <p style={{ fontSize: "0.8rem", color: "var(--nc-text-muted)", marginBottom: "1.5rem" }}>{plan.desc}</p>

                <div style={{ marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.3rem" }}>
                    <span className="gradient-text" style={{ fontSize: "2.5rem", fontWeight: 800, lineHeight: 1 }}>
                      {plan.lifetimePrice}
                    </span>
                    <span style={{ fontSize: "0.85rem", color: "var(--nc-text-muted)" }}>PLN</span>
                  </div>
                  <span style={{ fontSize: "0.72rem", color: "var(--nc-text-dim)", display: "block", marginTop: "0.3rem" }}>
                    jednorazowo · dożywotnio
                  </span>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    marginTop: "0.5rem", padding: "0.25rem 0.75rem", borderRadius: 50,
                    background: "rgba(130,255,160,0.08)", border: "1px solid rgba(130,255,160,0.15)",
                  }}>
                    <span style={{ fontSize: "0.65rem", color: "var(--nc-text-muted)" }}>Po premierze:</span>
                    <span style={{ fontSize: "0.65rem", color: "rgba(255,130,130,0.6)", textDecoration: "line-through" }}>{plan.monthlyAfter} PLN/mies.</span>
                  </div>
                </div>

                <div style={{ borderTop: "1px solid var(--nc-glass-border)", paddingTop: "1.25rem", marginBottom: "0.75rem" }}>
                  {/* Lifetime perks */}
                  {["♾️ Dożywotni dostęp", "💡 Współtworzenie produktu", "🧪 Beta dostęp"].map((perk) => (
                    <div key={perk} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                      <span style={{ fontSize: "0.78rem", color: "var(--nc-text)" }}>{perk}</span>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: "1px solid var(--nc-glass-border)", paddingTop: "1rem", marginBottom: "1.5rem", flex: 1 }}>
                  {plan.features.map((f) => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                      <span style={{ color: "var(--nc-orange)", fontSize: "0.7rem" }}>✓</span>
                      <span style={{ fontSize: "0.82rem", color: "var(--nc-text-muted)" }}>{f}</span>
                    </div>
                  ))}
                </div>

                <motion.a href="#zapisz-sie"
                  style={{
                    display: "block", textAlign: "center", padding: "0.85rem",
                    borderRadius: 50, textDecoration: "none",
                    background: plan.highlight ? "var(--nc-gradient-main)" : "transparent",
                    backgroundSize: plan.highlight ? "200% 100%" : undefined,
                    animation: plan.highlight ? "gradient-shift 3s ease-in-out infinite" : undefined,
                    border: plan.highlight ? "none" : "1px solid var(--nc-glass-border)",
                    color: "#fff", fontSize: "0.85rem", fontWeight: 600,
                  }}
                  whileHover={{ scale: 1.03, boxShadow: plan.highlight ? "0 12px 40px rgba(224, 120, 48, 0.3)" : "none" }}
                >
                  {plan.highlight ? "Kup Licencję Dożywotnią →" : "Wybierz Plan"}
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ FAQ ═══ */}
      <Section id="faq">
        <div style={{ maxWidth: 750, margin: "0 auto", padding: "5rem 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nc-purple-light)", fontWeight: 600 }}>
              FAQ
            </span>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", marginTop: "0.8rem" }}>
              Najczęściej zadawane <span className="gradient-text">pytania</span>
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {faqs.map((faq, i) => (
              <motion.div key={i}
                style={{
                  background: "var(--nc-glass)", border: "1px solid var(--nc-glass-border)",
                  borderRadius: 14, overflow: "hidden",
                }}
                whileHover={{ borderColor: "rgba(224, 120, 48, 0.2)" }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%", padding: "1.25rem 1.5rem", background: "transparent", border: "none",
                    color: "var(--nc-text)", fontSize: "0.95rem", fontWeight: 600, textAlign: "left",
                    cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",
                    fontFamily: "inherit",
                  }}
                >
                  {faq.q}
                  <motion.span
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ fontSize: "0.8rem", color: "var(--nc-text-muted)" }}
                  >
                    ▼
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: "hidden" }}
                >
                  <p style={{ padding: "0 1.5rem 1.25rem", color: "var(--nc-text-muted)", fontSize: "0.88rem", lineHeight: 1.7, margin: 0 }}>
                    {faq.a}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ WAITLIST CTA ═══ */}
      <Section id="zapisz-sie">
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "5rem 2rem", textAlign: "center" }}>
          <motion.div
            style={{
              background: "var(--nc-gradient-card)", border: "1px solid var(--nc-glass-border)",
              borderRadius: 28, padding: "4rem 3rem", position: "relative", overflow: "hidden",
            }}
            whileHover={{ borderColor: "rgba(224, 120, 48, 0.2)" }}
          >
            <div style={{
              position: "absolute", width: 500, height: 500, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(224, 120, 48, 0.06) 0%, transparent 70%)",
              top: -200, left: "50%", transform: "translateX(-50%)",
            }} />

            <div style={{ position: "relative" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🦷</div>
              <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", marginBottom: "0.75rem" }}>
                Dołącz do <span className="gradient-text">Przedsprzedaży</span>
              </h2>
              <p style={{ color: "var(--nc-text-muted)", fontSize: "0.95rem", marginBottom: "0.75rem", lineHeight: 1.7 }}>
                Zapisz się na listę oczekujących i <strong style={{ color: "var(--nc-text)" }}>jako pierwszy/a</strong> otrzymaj możliwość zakupu licencji dożywotniej.
              </p>
              <p style={{ color: "var(--nc-text-muted)", fontSize: "0.82rem", marginBottom: "2rem", lineHeight: 1.6 }}>
                🎯 Jednorazowa opłata · ♾️ Dożywotni dostęp · 💡 Współtworzenie produktu
              </p>

              {/* Simple email form (frontend only for now) */}
              <div style={{
                display: "flex", gap: "0.75rem", maxWidth: 500, margin: "0 auto",
                flexWrap: "wrap", justifyContent: "center",
              }}>
                <input
                  type="email"
                  placeholder="twoj@email.com"
                  style={{
                    flex: 1, minWidth: 220, padding: "0.9rem 1.25rem",
                    borderRadius: 50, border: "1px solid var(--nc-glass-border)",
                    background: "var(--nc-glass)", color: "var(--nc-text)",
                    fontSize: "0.9rem", fontFamily: "inherit", outline: "none",
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = "rgba(224, 120, 48, 0.4)"}
                  onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
                />
                <motion.button
                  style={{
                    padding: "0.9rem 2rem", borderRadius: 50, border: "none",
                    background: "var(--nc-gradient-main)", backgroundSize: "200% 100%",
                    animation: "gradient-shift 3s ease-in-out infinite",
                    color: "#fff", fontSize: "0.9rem", fontWeight: 700,
                    cursor: "pointer", fontFamily: "inherit",
                  }}
                  whileHover={{ scale: 1.05, boxShadow: "0 12px 40px rgba(224, 120, 48, 0.35)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  Zapisz Się →
                </motion.button>
              </div>

              <p style={{ marginTop: "1.5rem", fontSize: "0.72rem", color: "var(--nc-text-dim)" }}>
                Klikając „Zapisz Się&quot; zgadzasz się na kontakt mailowy. Bez spamu. Możesz zrezygnować w każdej chwili.
              </p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ borderTop: "1px solid var(--nc-glass-border)", padding: "2.5rem 2rem", textAlign: "center" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem", textDecoration: "none" }}>
          <Image src="/logo.png" alt="Novik Code" width={28} height={28} style={{ borderRadius: 6 }} />
          <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--nc-text)" }}>
            <span className="gradient-text">Novik</span>Code
          </span>
        </Link>
        <p style={{ fontSize: "0.72rem", color: "var(--nc-text-dim)", letterSpacing: "0.08em" }}>
          © {new Date().getFullYear()} Novik Code · DentFlow jest produktem Novik Code
        </p>
        <p style={{ fontSize: "0.65rem", color: "var(--nc-text-dim)", marginTop: "0.5rem" }}>
          Opole, Polska · hello@novikcode.com
        </p>
      </footer>
    </div>
  );
}
