"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import "./densflow.css";

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

/* ─── COUNTDOWN TIMER ─── */
const LAUNCH_DATE = new Date("2026-09-01T00:00:00+02:00").getTime();

function CountdownTimer({ compact = false }: { compact?: boolean }) {
  const calc = useCallback(() => {
    const diff = Math.max(0, LAUNCH_DATE - Date.now());
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    };
  }, []);

  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [calc]);

  const units = [
    { val: time.days, label: "dni" },
    { val: time.hours, label: "godz" },
    { val: time.minutes, label: "min" },
    { val: time.seconds, label: "sek" },
  ];

  if (compact) {
    return (
      <span style={{ fontVariantNumeric: "tabular-nums" }}>
        {time.days}d {String(time.hours).padStart(2, "0")}:{String(time.minutes).padStart(2, "0")}:{String(time.seconds).padStart(2, "0")}
      </span>
    );
  }

  return (
    <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
      {units.map((u) => (
        <div key={u.label} style={{ textAlign: "center" }}>
          <div style={{
            background: "rgba(0, 102, 255, 0.08)", border: "1px solid rgba(0, 102, 255, 0.2)",
            borderRadius: 12, padding: compact ? "0.5rem 0.75rem" : "0.75rem 1rem",
            minWidth: compact ? 50 : 70, fontVariantNumeric: "tabular-nums",
          }}>
            <span className="gradient-text" style={{ fontSize: compact ? "1.5rem" : "2rem", fontWeight: 800, lineHeight: 1 }}>
              {String(u.val).padStart(2, "0")}
            </span>
          </div>
          <div style={{ fontSize: "0.6rem", color: "var(--nc-text-dim)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "0.3rem" }}>
            {u.label}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── DATA ─── */
const problems = [
  { icon: "📞", problem: "Pacjenci dzwonią, a recepcja zajęta", solution: "Rezerwacja online 24/7 — pacjent sam wybiera termin" },
  { icon: "📋", problem: "Papierowe zgody, drukarka, toner...", solution: "Zgody cyfrowe z podpisem na ekranie + auto-PDF" },
  { icon: "💬", problem: "SMSy wysyłane ręcznie, jeden po drugim", solution: "Automatyczne przypomnienia SMS/push/email" },
  { icon: "📱", problem: "Brak strony www lub przestarzała strona", solution: "Nowoczesna strona PWA gotowa w 5 minut" },
  { icon: "🤯", problem: "Social media? Kto ma na to czas?", solution: "AI generuje posty, Facebook/Insta/TikTok auto-publish" },
  { icon: "📊", problem: "Brak widoku na to co się dzieje w gabinecie", solution: "Dashboard z raportami + codzienny raport na Telegram" },
  { icon: "📧", problem: "Maile pacjentów czekają godzinami na odpowiedź", solution: "AI drafty odpowiedzi na maile — gotowe w sekundach" },
  { icon: "🗓️", problem: "Pacjenci nie pamiętają o wizytach", solution: "Auto-SMS 24h przed + follow-up po wizycie" },
  { icon: "🎥", problem: "Brak contentu wideo na social media", solution: "Video pipeline — TikTok/YouTube gotowy do publikacji" },
];

const features = [
  {
    category: "Strona WWW & Marketing",
    color: "#0066FF",
    items: [
      { icon: "🌐", title: "Strona wizytówka", desc: "Responsywna strona z SEO, blog, cennik, oferta — gotowa od razu" },
      { icon: "📝", title: "Blog & baza wiedzy", desc: "Artykuły generowane przez AI, optymalizowane pod SEO" },
      { icon: "🛒", title: "Sklep online", desc: "E-commerce z produktami stomatologicznymi, płatności online" },
      { icon: "📱", title: "Aplikacja PWA", desc: "Instalowalna jak natywna aplikacja na iOS/Android — bez App Store" },
      { icon: "🎨", title: "Custom branding", desc: "Własne kolory, logo, fonty — w pełni spersonalizowana identyfikacja" },
      { icon: "✨", title: "+to co wymarzysz", desc: "Zgłoś swoją propozycję funkcji — wdrożymy ją w MVP" },
    ],
  },
  {
    category: "Zarządzanie Pacjentami",
    color: "#00CCFF",
    items: [
      { icon: "📅", title: "Rezerwacja online", desc: "Pacjent sam wybiera lekarza, usługę i termin — integracja z Prodentis" },
      { icon: "💬", title: "Czat pacjent-recepcja", desc: "Chat w czasie rzeczywistym — bez telefonu i kolejek" },
      { icon: "✍️", title: "Zgody cyfrowe", desc: "Formularze zgód z podpisem biometrycznym, auto-generowanie PDF" },
      { icon: "📄", title: "E-karta pacjenta", desc: "Historia wizyt, zalecania, zdjęcia, dokumenty — wszystko online" },
      { icon: "🔔", title: "Przypomnienia wizyt", desc: "Automatyczne SMS/email/push 24h przed wizytą i follow-up po" },
      { icon: "✨", title: "+to co wymarzysz", desc: "Zgłoś swoją propozycję funkcji — wdrożymy ją w MVP" },
    ],
  },
  {
    category: "Sztuczna Inteligencja",
    color: "#3388FF",
    items: [
      { icon: "🤖", title: "AI Asystent pracownika", desc: "Głosowy asystent GPT-4o z pamięcią, kontekstem gabinetu i bazą wiedzy" },
      { icon: "✉️", title: "AI drafty emailowe", desc: "Automatyczne szkice odpowiedzi na maile pacjentów" },
      { icon: "📢", title: "AI content marketing", desc: "Generowanie postów na social media z autopublikacją" },
      { icon: "🎙️", title: "Interfejs głosowy", desc: "Text-to-speech i rozpoznawanie mowy — ręce wolne" },
      { icon: "🧠", title: "AI analiza pacjentów", desc: "Inteligentna analiza historii wizyt i rekomendacje leczenia" },
      { icon: "✨", title: "+to co wymarzysz", desc: "Zgłoś swoją propozycję AI — wdrożymy ją w MVP" },
    ],
  },
  {
    category: "Automatyzacja & Komunikacja",
    color: "#5599FF",
    items: [
      { icon: "📲", title: "SMS przypomnienia", desc: "Automatyczne SMS 24h przed wizytą + follow-up po wizycie" },
      { icon: "🔔", title: "Push notifications", desc: "Powiadomienia w przeglądarce i na telefonie — bez aplikacji" },
      { icon: "📧", title: "Email automation", desc: "Potwierdzenia rezerwacji, zmiany statusu, komunikacja" },
      { icon: "📊", title: "Raport dzienny", desc: "Codzienne podsumowanie na Telegram o 7:00 rano" },
      { icon: "🎬", title: "Video pipeline", desc: "Automatyczny upload i publikacja wideo na TikTok/YouTube" },
      { icon: "✨", title: "+to co wymarzysz", desc: "Zgłoś swoją propozycję funkcji — wdrożymy ją w MVP" },
    ],
  },
];

const uniqueTools = [
  {
    icon: "🗺️",
    title: "Interaktywna Mapa Bólu",
    desc: "Pacjent wskazuje miejsce bólu na interaktywnym modelu 3D żuchwy/szczęki. System sugeruje możliwe diagnozy i rekomenduje wizytę. Potężne narzędzie lead generation.",
    gradient: "linear-gradient(135deg, rgba(0, 102, 255, 0.1) 0%, rgba(0, 204, 255, 0.06) 100%)",
  },
  {
    icon: "😁",
    title: "AI Symulator Uśmiechu",
    desc: "Pacjent wgrywa selfie, a AI transformuje go w idealny uśmiech. Pokazuje efekt leczenia ZANIM pacjent zdecyduje się na zabieg. Wow-efekt gwarantowany.",
    gradient: "linear-gradient(135deg, rgba(0, 102, 255, 0.06) 0%, rgba(51, 136, 255, 0.1) 100%)",
  },
  {
    icon: "⏱️",
    title: "Kalkulator Czasu Leczenia",
    desc: "Wizard prowadzący pacjenta przez pytania diagnostyczne. Na końcu: szacowany czas leczenia, koszty, plan działania. Automatycznie generuje lead.",
    gradient: "linear-gradient(135deg, rgba(51, 136, 255, 0.1) 0%, rgba(0, 102, 255, 0.06) 100%)",
  },
  {
    icon: "⚖️",
    title: "Porównywarka Rozwiązań",
    desc: "Patient Decision Console — porównanie opcji leczenia (np. implant vs most vs proteza) z cenami, czasem, zaletami/wadami. Pomaga pacjentowi podjąć decyzję.",
    gradient: "linear-gradient(135deg, rgba(0, 204, 255, 0.08) 0%, rgba(0, 102, 255, 0.1) 100%)",
  },
  {
    icon: "📋",
    title: "Smart Formularz Wywiadu",
    desc: "Pacjent wypełnia interaktywny wywiad medyczny online przed wizytą. AI analizuje odpowiedzi i przygotowuje podsumowanie dla lekarza.",
    gradient: "linear-gradient(135deg, rgba(0, 102, 255, 0.08) 0%, rgba(0, 204, 255, 0.1) 100%)",
  },
  {
    icon: "✨",
    title: "+To co sobie wymarzysz",
    desc: "Jako uczestnik przedsprzedaży możesz zgłosić własną propozycję unikalnego narzędzia. Jeśli zyska poparcie — wdrożymy je w MVP.",
    gradient: "linear-gradient(135deg, rgba(51, 136, 255, 0.06) 0%, rgba(0, 102, 255, 0.08) 100%)",
  },
];

/* All features included in lifetime license */
const allFeatures = [
  { cat: "Strona WWW", items: ["Strona wizytówka z SEO", "Blog / baza wiedzy", "Cennik online", "Responsywny design PWA", "E-commerce (sklep)"] },
  { cat: "Pacjenci", items: ["Rezerwacja online", "Portal pacjenta", "Czat pacjent-recepcja", "Zgody cyfrowe (podpis)", "E-karta pacjenta"] },
  { cat: "AI & Automatyzacja", items: ["AI asystent pracownika", "AI email drafty", "AI content marketing", "Interfejs głosowy", "Social media AI posting"] },
  { cat: "Komunikacja", items: ["SMS przypomnienia", "Push notifications", "Email automation", "Telegram raporty", "Raport dzienny"] },
  { cat: "Zarządzanie", items: ["System zadań (Trello)", "Grafik pracownika", "Video pipeline (TikTok/YT)", "Custom branding", "Dedykowane wsparcie"] },
  { cat: "Unikalne narzędzia", items: ["Symulator Uśmiechu (AI)", "Mapa Bólu interaktywna", "Kalkulator leczenia", "Porównywarka rozwiązań", "Auto-odpowiedzi social"] },
];

/* Future subscription tiers (for comparison) */
const futurePlans = [
  {
    name: "Starter",
    price: "599",
    yearly: "7 188",
    features: "Podstawowy pakiet dla małych gabinetów",
    items: ["Strona WWW z SEO", "Blog / baza wiedzy", "Rezerwacja online", "SMS przypomnienia", "Push notifications", "Email automation", "Responsywny design PWA"],
  },
  {
    name: "Pro",
    price: "999",
    yearly: "11 988",
    features: "Rozszerzony pakiet z AI i portalem pacjenta",
    items: ["Wszystko ze Starter +", "Portal pacjenta", "AI Asystent pracownika", "AI drafty emailowe", "Czat pacjent-recepcja", "Zgody cyfrowe (podpis)", "E-karta pacjenta", "System zadań (Trello)", "Grafik pracownika", "Raport dzienny Telegram"],
  },
  {
    name: "Enterprise",
    price: "1 499",
    yearly: "17 988",
    features: "Pełny pakiet z unikalnymi narzędziami AI",
    items: ["Wszystko z Pro +", "AI content marketing", "Social media auto-posting", "Video pipeline (TikTok/YT)", "Symulator Uśmiechu (AI)", "Mapa Bólu interaktywna", "Kalkulator leczenia", "Porównywarka rozwiązań", "Smart wywiad medyczny", "Custom branding", "Dedykowane wsparcie"],
  },
];

/* Social proof */
const socialProof = [
  { icon: "🏥", value: "3+", label: "Miesiące w produkcji" },
  { icon: "👨‍⚕️", value: "100%", label: "Uptime" },
  { icon: "📊", value: "10K+", label: "Obsłużonych zapytań" },
  { icon: "⭐", value: "4.9/5", label: "Ocena użyteczności" },
];

const coCreationPerks = [
  { icon: "💡", title: "Zgłaszaj funkcje", desc: "Proponuj nowe funkcjonalności — Twoje potrzeby kształtują roadmapę produktu" },
  { icon: "🗳️", title: "Głosuj na priorytety", desc: "Decyduj, co budujemy w pierwszej kolejności — demokratyczny rozwój" },
  { icon: "🧪", title: "Beta dostęp", desc: "Testuj nowe funkcje zanim trafią do publicznej wersji" },
  { icon: "🤝", title: "Bezpośredni kontakt", desc: "Dedykowany kanał komunikacji z zespołem deweloperskim" },
];

const faqs = [
  { q: "Czym jest licencja dożywotnia?", a: "Kupując w przedsprzedaży za 9 999 PLN jednorazowo otrzymujesz dostęp do WSZYSTKICH obecnych i przyszłych funkcji DensFlow.Ai NA ZAWSZE. Po premierze produkt będzie dostępny wyłącznie w modelu subskrypcyjnym (599–1 499 PLN/mies.). Licencja dożywotnia to oferta tylko dla uczestników przedsprzedaży — bez podziału na plany, pełen pakiet." },
  { q: "Czy DensFlow.Ai wymaga instalacji?", a: "Nie. DensFlow.Ai działa w 100% w chmurze. Wystarczy przeglądarka — na komputerze, tablecie lub telefonie. Można też zainstalować jako aplikację PWA." },
  { q: "Jak mogę współtworzyć produkt?", a: "Każdy uczestnik przedsprzedaży dostaje dostęp do panelu współtworzenia — możesz zgłaszać propozycje nowych funkcji, głosować na priorytety i testować beta wersje. Twój głos realnie wpływa na kształt produktu." },
  { q: "Czy mogę zintegrować z moim obecnym systemem?", a: "Tak! DensFlow.Ai integruje się z Prodentis, Google Calendar, SMSAPI, Meta (Facebook/Instagram), YouTube, TikTok i innymi popularnymi narzędziami." },
  { q: "Ile trwa wdrożenie?", a: "Strona i podstawowa konfiguracja są gotowe w ciągu jednego dnia roboczego. Pełne wdrożenie z migracją danych i szkoleniem: 3-5 dni roboczych." },
  { q: "Czy dane pacjentów są bezpieczne?", a: "Tak. Stosujemy szyfrowanie, RLS (Row Level Security), audyt logów, rate limiting, oraz pełną zgodność z RODO/GDPR. Dane przechowywane na serwerach w EU." },
  { q: "Co jeśli produkt nie spełni moich oczekiwań?", a: "Przed zakupem licencji możesz przetestować DensFlow.Ai na bezpłatnym demo z przykładowymi danymi. Dzięki temu widzisz dokładnie co kupujesz. Licencja dożywotnia jest produktem cyfrowym dostarczanym natychmiast — zgodnie z art. 38 pkt 13 ustawy o prawach konsumenta, po aktywacji nie przysługuje prawo do odstąpienia." },
  { q: "Czy mogę przenieść swoją obecną stronę?", a: "Tak. Możemy przenieść treści z Twojej obecnej strony do DensFlow.Ai. Obsługujemy również przekierowania 301 dla zachowania SEO." },
];

/* ─── PAGE ─── */
export default function DensFlowPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [ctaEmail, setCtaEmail] = useState("");
  const router = useRouter();

  const handleCtaRedirect = (emailOverride?: string) => {
    const em = (emailOverride || ctaEmail).trim();
    const params = em ? `?email=${encodeURIComponent(em)}` : "";

    // Fire-and-forget: save partial lead (email only) before redirecting
    if (em && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
      fetch("/api/densflow-partial-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: em }),
      }).catch(() => {}); // silently ignore errors — don't block UX
    }

    router.push(`/densflow/zapisz-sie${params}`);
  };

  return (
    <div style={{ position: "relative" }} className="densflow-page">
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
          <motion.button
            onClick={() => handleCtaRedirect()}
            style={{
              padding: "0.5rem 1.2rem", borderRadius: 50,
              background: "linear-gradient(135deg, #0066FF 0%, #00CCFF 100%)", backgroundSize: "200% 100%",
              animation: "dfGradientShift 3s ease-in-out infinite",
              color: "#fff", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.05em",
              textTransform: "uppercase", border: "none", cursor: "pointer", fontFamily: "inherit",
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(0, 102, 255, 0.35)" }}
          >🦷 Kup w Przedsprzedaży</motion.button>
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
            backgroundImage: "url(/densflow-icon.png)", backgroundSize: "cover", backgroundPosition: "center",
            animation: "kenBurns 30s ease-in-out infinite", opacity: 0.08, filter: "blur(5px) saturate(1.5)",
          }} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 10%, var(--nc-bg) 65%)", zIndex: 0 }} />

        <div style={{ maxWidth: 900, width: "100%", textAlign: "center", position: "relative", zIndex: 3 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.4rem 1.2rem", borderRadius: 50,
              background: "rgba(0, 102, 255, 0.08)", border: "1px solid rgba(0, 102, 255, 0.25)",
              fontSize: "0.72rem", fontWeight: 600, color: "#66AAFF",
              letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "2rem",
              animation: "dfBorderPulse 2s ease-in-out infinite",
            }}>
              ⏰ Przedsprzedaż kończy się 1 września — Licencja Dożywotnia tylko teraz!
            </div>
          </motion.div>

          {/* DensFlow.Ai Full Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ marginBottom: "1.5rem" }}
          >
            <Image
              src="/densflow-logo-vertical.png"
              alt="DensFlow.Ai"
              width={340}
              height={340}
              style={{
                maxWidth: "75vw",
                height: "auto",
                animation: "logoGlow 3s ease-in-out infinite",
              }}
            />
          </motion.div>

          <motion.h1
            style={{ fontSize: "clamp(1.2rem, 2.8vw, 1.8rem)", fontWeight: 600, lineHeight: 1.3, marginBottom: "1.5rem", color: "var(--nc-text-muted)" }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Cyfrowy Gabinet <span style={{ color: "var(--nc-text)" }}>Stomatologiczny</span> w 5 Minut
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
            <motion.button
              onClick={() => handleCtaRedirect()}
              style={{
                padding: "1rem 2.5rem", borderRadius: 50, border: "none",
                background: "linear-gradient(135deg, #0066FF 0%, #00CCFF 100%)", backgroundSize: "200% 100%",
                animation: "dfGradientShift 3s ease-in-out infinite",
                color: "#fff", fontSize: "1rem", fontWeight: 700, cursor: "pointer",
                fontFamily: "inherit",
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 16px 50px rgba(0, 102, 255, 0.4)" }}
              whileTap={{ scale: 0.97 }}
            >
              Kup Licencję Dożywotnią →
            </motion.button>
            <motion.a href="#funkcje"
              style={{
                padding: "1rem 2.5rem", borderRadius: 50,
                background: "transparent", border: "1px solid var(--nc-glass-border)",
                color: "var(--nc-text)", fontSize: "1rem", fontWeight: 500, textDecoration: "none",
              }}
              whileHover={{ borderColor: "rgba(0, 102, 255, 0.4)", background: "rgba(0, 102, 255, 0.05)" }}
            >
              Zobacz funkcje
            </motion.a>
            <motion.a href="https://demo.densflow.ai" target="_blank" rel="noopener noreferrer"
              style={{
                padding: "1rem 2.5rem", borderRadius: 50,
                background: "transparent", border: "1px solid rgba(0, 204, 255, 0.3)",
                color: "#00CCFF", fontSize: "1rem", fontWeight: 600, textDecoration: "none",
              }}
              whileHover={{ borderColor: "rgba(0, 204, 255, 0.6)", background: "rgba(0, 204, 255, 0.08)" }}
            >
              🧪 Wypróbuj demo
            </motion.a>
          </motion.div>

          {/* Countdown in hero */}
          <motion.div
            style={{ marginTop: "2.5rem", marginBottom: "1rem" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <p style={{ fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--nc-text-dim)", marginBottom: "0.75rem" }}>
              Do końca przedsprzedaży pozostało:
            </p>
            <CountdownTimer compact />
          </motion.div>

          {/* Trust badges */}
          <motion.div
            style={{
              display: "flex", justifyContent: "center", gap: "2.5rem", marginTop: "2rem",
              flexWrap: "wrap",
            }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            {[
              "♾️ Licencja dożywotnia",
              "⏰ Tylko do 1 września",
              "💡 Współtwórz produkt",
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
            <span style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#0066FF", fontWeight: 600 }}>
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
                whileHover={{ borderColor: "rgba(0, 102, 255, 0.25)", y: -3 }}
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
            <span style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#00CCFF", fontWeight: 600 }}>
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
            <span style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#0066FF", fontWeight: 600 }}>
              Tylko w DensFlow.Ai
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
                whileHover={{ y: -5, borderColor: "rgba(0, 102, 255, 0.3)" }}
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
            <span style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#00CCFF", fontWeight: 600 }}>
              Zbudowane w produkcji
            </span>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", marginTop: "0.8rem" }}>
              <span className="gradient-text">Battle-Tested</span> w Prawdziwym Gabinecie
            </h2>
            <p style={{ color: "var(--nc-text-muted)", fontSize: "0.9rem", marginTop: "0.5rem" }}>
              DensFlow.Ai powstał z potrzeb realnego gabinetu stomatologicznego z 3+ miesiącami w produkcji.
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
            <span style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#3388FF", fontWeight: 600 }}>
              Tylko w Przedsprzedaży
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", marginTop: "0.8rem" }}>
              Współtwórz <span className="gradient-text">Produkt Przyszłości</span>
            </h2>
            <p style={{ color: "var(--nc-text-muted)", maxWidth: 600, margin: "1rem auto 0", fontSize: "0.95rem", lineHeight: 1.7 }}>
              Kupując w przedsprzedaży nie tylko zyskujesz dożywotni dostęp — <strong style={{ color: "var(--nc-text)" }}>realnie wpływasz na to, jak DensFlow.Ai będzie wyglądał</strong>.
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
                whileHover={{ borderColor: "rgba(0, 102, 255, 0.3)", y: -3 }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{perk.icon}</div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.5rem" }}>{perk.title}</h4>
                <p style={{ fontSize: "0.82rem", color: "var(--nc-text-muted)", lineHeight: 1.5 }}>{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ PRICING — SINGLE LIFETIME LICENSE ═══ */}
      <Section id="cennik">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "5rem 2rem" }}>

          {/* ── URGENCY BANNER ── */}
          <motion.div
            style={{
              maxWidth: 700, margin: "0 auto 2.5rem", padding: "1rem 1.5rem",
              background: "rgba(255, 60, 60, 0.06)", border: "1px solid rgba(255, 60, 60, 0.2)",
              borderRadius: 14, textAlign: "center",
            }}
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p style={{ fontSize: "0.88rem", color: "#ff6b6b", margin: 0, fontWeight: 700, lineHeight: 1.6 }}>
              ⚠️ Ta oferta jest JEDNORAZOWA i NIEPOWTARZALNA
            </p>
            <p style={{ fontSize: "0.78rem", color: "var(--nc-text-muted)", margin: "0.3rem 0 0", lineHeight: 1.5 }}>
              Licencja dożywotnia jest dostępna <strong style={{ color: "var(--nc-text)" }}>wyłącznie w przedsprzedaży do 1 września 2026</strong>.
              Po tej dacie DensFlow.Ai będzie dostępny <strong>tylko w modelu subskrypcyjnym</strong> — od 599 do 1 499 PLN miesięcznie. Bez wyjątków.
            </p>
          </motion.div>

          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <span style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#0066FF", fontWeight: 600 }}>
              Przedsprzedaż
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", marginTop: "0.8rem" }}>
              Licencja <span className="gradient-text">Dożywotnia</span>
            </h2>
            <p style={{ color: "var(--nc-text-muted)", fontSize: "0.95rem", maxWidth: 650, margin: "0.5rem auto 0" }}>
              Jedna cena. <strong style={{ color: "var(--nc-text)" }}>Wszystkie funkcje. Na zawsze.</strong><br />
              Po 1 września 2026 DensFlow.Ai przejdzie na model subskrypcyjny. Licencja dożywotnia <strong style={{ color: "#ff6b6b" }}>nigdy więcej nie będzie dostępna</strong>.
            </p>
          </div>

          {/* Countdown */}
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p style={{ fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--nc-text-dim)", marginBottom: "0.75rem" }}>
              Koniec przedsprzedaży za:
            </p>
            <CountdownTimer />
          </div>

          {/* ── BIG LIFETIME CARD ── */}
          <motion.div
            style={{
              maxWidth: 700, margin: "0 auto 3rem",
              background: "linear-gradient(145deg, rgba(0, 102, 255, 0.06) 0%, rgba(0, 204, 255, 0.03) 100%)",
              border: "2px solid rgba(0, 102, 255, 0.3)",
              borderRadius: 24, padding: "3rem",
              position: "relative", overflow: "hidden", textAlign: "center",
            }}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            whileHover={{ borderColor: "rgba(0, 102, 255, 0.5)" }}
          >
            {/* Ribbon */}
            <div style={{
              position: "absolute", top: 20, right: -35, transform: "rotate(45deg)",
              background: "linear-gradient(135deg, #ff4444, #cc0000)", padding: "0.3rem 3rem",
              fontSize: "0.6rem", fontWeight: 700, color: "#fff", letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}>
              Tylko do 1.09!
            </div>

            {/* Decorative glows */}
            <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(0, 102, 255, 0.06) 0%, transparent 70%)", top: -150, right: -100 }} />
            <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(0, 204, 255, 0.04) 0%, transparent 70%)", bottom: -100, left: -80 }} />

            <div style={{ position: "relative" }}>
              <div style={{ fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#0066FF", fontWeight: 600, marginBottom: "0.5rem" }}>
                🦷 DensFlow.Ai — Pełen Pakiet
              </div>

              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "0.4rem", margin: "1rem 0" }}>
                <span className="gradient-text" style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)", fontWeight: 800, lineHeight: 1 }}>
                  9 999
                </span>
                <span style={{ fontSize: "1.2rem", color: "var(--nc-text-muted)", fontWeight: 600 }}>PLN</span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--nc-text-dim)", marginBottom: "0.5rem" }}>
                jednorazowo · dożywotnio · wszystkie obecne i przyszłe funkcje
              </p>
              <p style={{ fontSize: "0.72rem", color: "#ff6b6b", fontWeight: 600, marginBottom: "1.5rem" }}>
                ⏰ Oferta wygasa 1 września 2026. Potem tylko subskrypcja od 599 PLN/mies.
              </p>

              {/* Perks row */}
              <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
                {["♾️ Dożywotni dostęp", "🚀 Wszystkie funkcje", "💡 Współtworzenie produktu", "🧪 Beta dostęp", "🤝 Dedykowane wsparcie"].map((p) => (
                  <span key={p} style={{
                    padding: "0.35rem 0.85rem", borderRadius: 50,
                    background: "rgba(130,255,160,0.08)", border: "1px solid rgba(130,255,160,0.12)",
                    fontSize: "0.72rem", color: "var(--nc-text)", fontWeight: 500,
                  }}>{p}</span>
                ))}
              </div>

              {/* All features grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem", textAlign: "left", marginBottom: "2.5rem" }}>
                {allFeatures.map((cat) => (
                  <div key={cat.cat}>
                    <div style={{ fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#0066FF", fontWeight: 600, marginBottom: "0.5rem" }}>
                      {cat.cat}
                    </div>
                    {cat.items.map((f) => (
                      <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.35rem" }}>
                        <span style={{ color: "rgba(130,255,160,0.7)", fontSize: "0.65rem" }}>✓</span>
                        <span style={{ fontSize: "0.78rem", color: "var(--nc-text-muted)" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <motion.button
                onClick={() => handleCtaRedirect()}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  padding: "1rem 3rem", borderRadius: 50,
                  background: "linear-gradient(135deg, #0066FF 0%, #00CCFF 100%)", backgroundSize: "200% 100%",
                  animation: "dfGradientShift 3s ease-in-out infinite",
                  color: "#fff", fontSize: "1rem", fontWeight: 700,
                  border: "none", cursor: "pointer", fontFamily: "inherit",
                }}
                whileHover={{ scale: 1.05, boxShadow: "0 16px 50px rgba(0, 102, 255, 0.4)" }}
                whileTap={{ scale: 0.97 }}
              >
                Kup Licencję Dożywotnią →
              </motion.button>
            </div>
          </motion.div>

          {/* ── FUTURE SUBSCRIPTION COMPARISON (BOLD, PROMINENT) ── */}
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                Po 1 września — <span style={{ color: "#ff6b6b" }}>tylko subskrypcja</span>
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--nc-text-muted)" }}>
                Tak będzie wyglądał cennik po premierze. <strong style={{ color: "var(--nc-text)" }}>Licencja dożywotnia nie będzie już dostępna.</strong>
              </p>
            </div>

            <div className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
              {futurePlans.map((p) => (
                <motion.div key={p.name}
                  style={{
                    padding: "2rem 1.5rem", borderRadius: 16, textAlign: "center",
                    background: "var(--nc-glass)", border: "1px solid var(--nc-glass-border)",
                  }}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.75rem" }}>{p.name}</div>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "0.25rem", marginBottom: "0.3rem" }}>
                    <span style={{ fontSize: "2rem", fontWeight: 800, color: "var(--nc-text)" }}>{p.price}</span>
                    <span style={{ fontSize: "0.82rem", color: "var(--nc-text-muted)" }}>PLN/mies.</span>
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "rgba(255,130,130,0.7)", fontWeight: 600, marginBottom: "0.75rem" }}>
                    = {p.yearly} PLN rocznie
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--nc-text-muted)", lineHeight: 1.5, marginBottom: "0.75rem" }}>{p.features}</div>
                  <div style={{ textAlign: "left", borderTop: "1px solid var(--nc-glass-border)", paddingTop: "0.75rem" }}>
                    {(p as any).items?.map((item: string) => (
                      <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.35rem", marginBottom: "0.25rem" }}>
                        <span style={{ color: "var(--nc-text-dim)", fontSize: "0.6rem" }}>✓</span>
                        <span style={{ fontSize: "0.7rem", color: "var(--nc-text-muted)" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Value comparison callout */}
            <motion.div
              style={{
                maxWidth: 700, margin: "2rem auto 0", padding: "1.25rem 2rem",
                background: "rgba(130,255,160,0.04)", border: "1px solid rgba(130,255,160,0.15)",
                borderRadius: 14, textAlign: "center",
              }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p style={{ fontSize: "0.88rem", color: "var(--nc-text)", margin: 0, fontWeight: 600, lineHeight: 1.6 }}>
                💰 Licencja dożywotnia za <strong className="gradient-text">9 999 PLN</strong> = pełny pakiet Enterprise za <strong>mniej niż 7 miesięcy subskrypcji</strong>.
                <br />
                <span style={{ color: "rgba(130,255,160,0.8)" }}>Oszczędzasz <strong>dziesiątki tysięcy złotych</strong> w skali lat. Nigdy więcej nie płacisz.</span>
              </p>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ═══ SOCIAL PROOF ═══ */}
      <Section>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "5rem 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#0066FF", fontWeight: 600 }}>
              Zaufali Nam
            </span>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", marginTop: "0.8rem" }}>
              Dlaczego <span className="gradient-text">warto dołączyć</span> teraz?
            </h2>
          </div>

          {/* Stats row */}
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem", marginBottom: "3rem" }}>
            {socialProof.map((sp, i) => (
              <motion.div key={sp.label}
                style={{
                  background: "var(--nc-glass)", border: "1px solid var(--nc-glass-border)",
                  borderRadius: 16, padding: "1.75rem", textAlign: "center",
                }}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ borderColor: "rgba(224, 120, 48, 0.25)", y: -3 }}
              >
                <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{sp.icon}</div>
                <div className="gradient-text" style={{ fontSize: "1.8rem", fontWeight: 800, lineHeight: 1 }}>{sp.value}</div>
                <div style={{ fontSize: "0.7rem", color: "var(--nc-text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: "0.4rem" }}>{sp.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Testimonial-style trust blocks */}
          <div className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <motion.div
              style={{
                background: "var(--nc-glass)", border: "1px solid var(--nc-glass-border)",
                borderRadius: 16, padding: "2rem",
              }}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ borderColor: "rgba(224, 120, 48, 0.2)" }}
            >
              <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>🏥</div>
              <p style={{ fontSize: "0.9rem", color: "var(--nc-text)", fontWeight: 600, marginBottom: "0.5rem" }}>
                Zbudowane w prawdziwym gabinecie
              </p>
              <p style={{ fontSize: "0.82rem", color: "var(--nc-text-muted)", lineHeight: 1.7 }}>
                DensFlow.Ai nie jest teorią — został stworzony i jest używany w produkcji w gabinecie stomatologicznym od ponad 3 miesięcy.
                Każda funkcja rozwiązuje realne problemy, z którymi lekarze i recepcja mierzą się codziennie.
              </p>
            </motion.div>
            <motion.div
              style={{
                background: "var(--nc-glass)", border: "1px solid var(--nc-glass-border)",
                borderRadius: 16, padding: "2rem",
              }}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.1 }}
              whileHover={{ borderColor: "rgba(107, 66, 201, 0.2)" }}
            >
              <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>🧪</div>
              <p style={{ fontSize: "0.9rem", color: "var(--nc-text)", fontWeight: 600, marginBottom: "0.5rem" }}>
                Bezpłatne demo przed zakupem
              </p>
              <p style={{ fontSize: "0.82rem", color: "var(--nc-text-muted)", lineHeight: 1.7 }}>
                Przetestuj DensFlow.Ai na demo z przykładowymi danymi zanim podejmiesz decyzję.
                Widzisz dokładnie co kupujesz — zero niespodzianek.
              </p>
              <a href="https://demo.densflow.ai" target="_blank" rel="noopener noreferrer" style={{
                display: "inline-block", marginTop: "0.75rem", padding: "0.5rem 1.25rem", borderRadius: 25,
                background: "linear-gradient(135deg, #0066FF, #00CCFF)", color: "#fff",
                fontSize: "0.78rem", fontWeight: 700, textDecoration: "none",
              }}>Wypróbuj demo →</a>
            </motion.div>
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
              background: "linear-gradient(145deg, rgba(0, 102, 255, 0.06) 0%, rgba(0, 204, 255, 0.04) 100%)", border: "1px solid var(--nc-glass-border)",
              borderRadius: 28, padding: "4rem 3rem", position: "relative", overflow: "hidden",
            }}
            whileHover={{ borderColor: "rgba(0, 102, 255, 0.25)" }}
          >
            <div style={{
              position: "absolute", width: 500, height: 500, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(0, 102, 255, 0.06) 0%, transparent 70%)",
              top: -200, left: "50%", transform: "translateX(-50%)",
            }} />

            <div style={{ position: "relative" }}>
              <Image src="/densflow-icon.png" alt="DensFlow.Ai" width={64} height={64} style={{ borderRadius: 14, marginBottom: "1rem" }} />
              <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", marginBottom: "0.75rem" }}>
                Dołącz do <span className="gradient-text">Przedsprzedaży</span>
              </h2>
              <p style={{ color: "var(--nc-text-muted)", fontSize: "0.95rem", marginBottom: "0.5rem", lineHeight: 1.7 }}>
                Zapisz się i <strong style={{ color: "var(--nc-text)" }}>jako pierwszy/a</strong> otrzymaj możliwość zakupu licencji dożywotniej za <strong className="gradient-text">9 999 PLN</strong>.
              </p>
              <p style={{ color: "#ff6b6b", fontSize: "0.82rem", fontWeight: 600, marginBottom: "1rem" }}>
                ⏰ Oferta kończy się 1 września 2026. Potem tylko subskrypcja od 599 PLN/mies.
              </p>

              {/* Mini countdown */}
              <div style={{ marginBottom: "2rem" }}>
                <CountdownTimer compact />
              </div>

              {/* Email form → redirects to registration page */}
              <form onSubmit={(e) => { e.preventDefault(); handleCtaRedirect(ctaEmail); }} style={{
                display: "flex", gap: "0.75rem", maxWidth: 500, margin: "0 auto",
                flexWrap: "wrap", justifyContent: "center",
              }}>
                <input
                  type="email"
                  placeholder="twoj@email.com"
                  value={ctaEmail}
                  onChange={(e) => setCtaEmail(e.target.value)}
                  style={{
                    flex: 1, minWidth: 220, padding: "0.9rem 1.25rem",
                    borderRadius: 50, border: "1px solid var(--nc-glass-border)",
                    background: "var(--nc-glass)", color: "var(--nc-text)",
                    fontSize: "0.9rem", fontFamily: "inherit", outline: "none",
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = "rgba(0, 102, 255, 0.5)"}
                  onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
                />
                <motion.button
                  type="submit"
                  style={{
                    padding: "0.9rem 2rem", borderRadius: 50, border: "none",
                    background: "linear-gradient(135deg, #0066FF 0%, #00CCFF 100%)", backgroundSize: "200% 100%",
                    animation: "dfGradientShift 3s ease-in-out infinite",
                    color: "#fff", fontSize: "0.9rem", fontWeight: 700,
                    cursor: "pointer", fontFamily: "inherit",
                  }}
                  whileHover={{ scale: 1.05, boxShadow: "0 12px 40px rgba(0, 102, 255, 0.4)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  Zapisz Się →
                </motion.button>
              </form>

              <p style={{ marginTop: "1.5rem", fontSize: "0.72rem", color: "var(--nc-text-dim)" }}>
                Klikając „Zapisz Się&quot; przejdziesz do formularza rejestracji. Twoje dane są chronione zgodnie z RODO.
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
            <span style={{ background: "var(--nc-gradient-text)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Novik</span>Code
          </span>
        </Link>
        <p style={{ fontSize: "0.72rem", color: "var(--nc-text-dim)", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
          © {new Date().getFullYear()} Novik Code · DensFlow.Ai jest produktem Novik Code
        </p>
        <p style={{ fontSize: "0.68rem", color: "var(--nc-text-dim)", marginBottom: "0.75rem", lineHeight: 1.6 }}>
          ELMAR Sp. z o.o. · NIP: 7542680826 · Opole, Polska<br />
          tel. <a href="tel:+48790740770" style={{ color: "#0066FF" }}>790 740 770</a> · <a href="mailto:marcin@nowosielski.pl" style={{ color: "#0066FF" }}>marcin@nowosielski.pl</a>
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap" }}>
          {[
            { href: "/densflow/regulamin", label: "Regulamin" },
            { href: "/densflow/polityka-prywatnosci", label: "Polityka Prywatności" },
            { href: "/densflow/polityka-cookies", label: "Polityka Cookies" },
          ].map((link) => (
            <Link key={link.href} href={link.href} style={{ fontSize: "0.65rem", color: "var(--nc-text-dim)", textDecoration: "underline", textUnderlineOffset: 3 }}>
              {link.label}
            </Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
