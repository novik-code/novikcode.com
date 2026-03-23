"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
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

/* ─── DATA ─── */
const features = [
  {
    icon: "🌅",
    title: "Poranna rutyna",
    desc: "Spersonalizowana lista zadań porannych: mycie zębów, ubieranie się, pakowanie plecaka — krok po kroku z wizualnym postępem.",
    color: "#FF9F43",
  },
  {
    icon: "🌙",
    title: "Wieczorna rutyna",
    desc: "Wieczorny rytuał: kąpiel, piżama, czytanie, przygotowanie na jutro — spokojne zakończenie dnia z nagrodą na końcu.",
    color: "#6C5CE7",
  },
  {
    icon: "👨‍👩‍👧‍👦",
    title: "Profile dzieci",
    desc: "Każde dziecko ma własny profil z avatarem, własnymi rutynami i indywidualnym postępem. Idealnie dla rodzin z kilkorgiem dzieci.",
    color: "#00B894",
  },
  {
    icon: "🏆",
    title: "System nagród",
    desc: "Punkty za ukończone zadania, odznaki za serie, emoji-nagrody. Zmotywuj dziecko pozytywnym wzmocnieniem zamiast kary.",
    color: "#FDCB6E",
  },
  {
    icon: "🎉",
    title: "Konfetti i animacje",
    desc: "Ukończenie rutyny = eksplozja konfetti! Micro-animacje przy każdym odhaczeniu zadania. Dziecko czuje się jak bohater.",
    color: "#E17055",
  },
  {
    icon: "📊",
    title: "Postępy i statystyki",
    desc: "Widoczna historia: ile dni z rzędu udało się ukończyć rutynę. Wykresy, serie, rekordy — widoczne dla rodziców i dzieci.",
    color: "#0984E3",
  },
  {
    icon: "🎨",
    title: "Personalizacja",
    desc: "Własne zadania, kolejność, ikony, kolory — każda rutyna dopasowana do Twojego dziecka. Zero sztywnych schematów.",
    color: "#A29BFE",
  },
  {
    icon: "📲",
    title: "PWA — działa jak aplikacja",
    desc: "Zainstaluj na telefonie lub tablecie jak natywną aplikację. Działa offline. Bez App Store, bez aktualizacji.",
    color: "#55E6C1",
  },
];

const benefits = [
  { emoji: "⏰", text: "Mniej porannego chaosu" },
  { emoji: "😊", text: "Spokojniejsze wieczory" },
  { emoji: "🧠", text: "Dziecko uczy się samodzielności" },
  { emoji: "📵", text: "Bez reklam, bez śledzenia" },
  { emoji: "👪", text: "Dla całej rodziny" },
  { emoji: "🔒", text: "Dane 100% prywatne" },
];

const targetAudience = [
  { icon: "👶", title: "Rodzice maluchów (3-6 lat)", desc: "Wizualne checklisy z obrazkami, proste zadania, duże przyciski." },
  { icon: "🧒", title: "Rodzice starszych dzieci (7-12)", desc: "Bardziej złożone rutyny, system punktów i odznak, samodyscyplina." },
  { icon: "👨‍👩‍👧‍👦", title: "Rodziny wielodzietne", desc: "Osobne profile, rywalizacja między rodzeństwem, wspólne cele." },
  { icon: "🧑‍🏫", title: "Pedagodzy i terapeuci", desc: "Strukturyzacja dnia dla dzieci z ADHD, ASD i innymi potrzebami." },
];

/* ─── PAGE ─── */
export default function RutynkaPage() {
  const [email, setEmail] = useState("");

  return (
    <div style={{ position: "relative", background: "#0a0a14", color: "#e8e6f0", fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>

      {/* ═══ CSS ═══ */}
      <style>{`
        @keyframes floatEmoji { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        .rutynka-gradient { background: linear-gradient(135deg, #6C5CE7 0%, #A29BFE 50%, #FF9F43 100%); background-size: 200% 100%; animation: gradientShift 4s ease-in-out infinite; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .rutynka-btn { background: linear-gradient(135deg, #6C5CE7 0%, #A29BFE 100%); background-size: 200% 100%; animation: gradientShift 3s ease-in-out infinite; }
        .hide-mobile { display: inline-flex; }
        @media (max-width: 768px) { .hide-mobile { display: none !important; } .mobile-stack { grid-template-columns: 1fr !important; } }
      `}</style>

      {/* ═══ NAV ═══ */}
      <motion.nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: "0.8rem 2rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "rgba(10, 10, 20, 0.85)", backdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(108, 92, 231, 0.15)",
        }}
        initial={{ y: -100 }} animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
          <Image src="/logo.png" alt="Novik Code" width={28} height={28} style={{ borderRadius: 6 }} />
          <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "#e8e6f0" }}>
            <span style={{ background: "var(--nc-gradient-text)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Novik</span>Code
          </span>
        </Link>
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          {[
            { href: "#funkcje", label: "Funkcje" },
            { href: "#dla-kogo", label: "Dla kogo" },
            { href: "#zapisz-sie", label: "Powiadomienie" },
          ].map((l) => (
            <motion.a key={l.href} href={l.href} className="hide-mobile"
              style={{ fontSize: "0.78rem", color: "rgba(232,230,240,0.5)", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500, textDecoration: "none" }}
              whileHover={{ color: "#e8e6f0" }}
            >{l.label}</motion.a>
          ))}
          <motion.a href="#zapisz-sie"
            className="rutynka-btn"
            style={{
              padding: "0.5rem 1.2rem", borderRadius: 50,
              color: "#fff", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.05em",
              textTransform: "uppercase", textDecoration: "none",
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(108, 92, 231, 0.35)" }}
          >🌅 Powiadom mnie</motion.a>
        </div>
      </motion.nav>

      {/* ═══ HERO ═══ */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden", padding: "7rem 2rem 5rem",
      }}>
        {/* Animated gradient bg */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <div style={{
            position: "absolute", width: "60%", height: "60%", top: "10%", left: "20%",
            background: "radial-gradient(ellipse, rgba(108, 92, 231, 0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
          }} />
          <div style={{
            position: "absolute", width: "40%", height: "40%", bottom: "10%", right: "10%",
            background: "radial-gradient(ellipse, rgba(255, 159, 67, 0.08) 0%, transparent 70%)",
            filter: "blur(50px)",
          }} />
        </div>

        <div style={{ maxWidth: 850, width: "100%", textAlign: "center", position: "relative", zIndex: 3 }}>
          {/* Coming soon badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.4rem 1.2rem", borderRadius: 50,
              background: "rgba(108, 92, 231, 0.1)", border: "1px solid rgba(108, 92, 231, 0.3)",
              fontSize: "0.72rem", fontWeight: 600, color: "#A29BFE",
              letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "2rem",
              animation: "pulse 2s ease-in-out infinite",
            }}>
              🚀 Wkrótce w sprzedaży — zostaw maila, powiadomimy Cię!
            </div>
          </motion.div>

          {/* Giant emoji */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            style={{ fontSize: "clamp(4rem, 10vw, 7rem)", marginBottom: "1rem", animation: "floatEmoji 3s ease-in-out infinite" }}
          >
            🌅
          </motion.div>

          {/* Title */}
          <motion.h1
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: "1.5rem" }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="rutynka-gradient">Rutynka</span>
          </motion.h1>

          <motion.p
            style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)", fontWeight: 600, color: "#e8e6f0", marginBottom: "1rem", lineHeight: 1.4 }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Poranne i wieczorne rutyny<br />dla Twojego dziecka
          </motion.p>

          <motion.p
            style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)", color: "rgba(232,230,240,0.5)", maxWidth: 550, margin: "0 auto 2.5rem", lineHeight: 1.8 }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Aplikacja która zamienia poranny chaos i wieczorne negocjacje w <strong style={{ color: "#e8e6f0" }}>zabawę</strong>.
            Dziecko samo odhacza zadania, zdobywa nagrody i uczy się samodzielności.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.a href="#zapisz-sie"
              className="rutynka-btn"
              style={{
                padding: "1rem 2.5rem", borderRadius: 50,
                color: "#fff", fontSize: "1rem", fontWeight: 700, textDecoration: "none",
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 16px 50px rgba(108, 92, 231, 0.4)" }}
              whileTap={{ scale: 0.97 }}
            >
              Powiadom mnie o premierze →
            </motion.a>
            <motion.a href="#funkcje"
              style={{
                padding: "1rem 2.5rem", borderRadius: 50,
                background: "transparent", border: "1px solid rgba(108, 92, 231, 0.25)",
                color: "#e8e6f0", fontSize: "1rem", fontWeight: 500, textDecoration: "none",
              }}
              whileHover={{ borderColor: "rgba(108, 92, 231, 0.5)", background: "rgba(108, 92, 231, 0.05)" }}
            >
              Zobacz funkcje
            </motion.a>
          </motion.div>

          {/* Quick benefits */}
          <motion.div
            style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "3rem", flexWrap: "wrap" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            {benefits.slice(0, 4).map((b) => (
              <span key={b.text} style={{ fontSize: "0.78rem", color: "rgba(232,230,240,0.5)" }}>
                {b.emoji} {b.text}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <Section id="funkcje">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "5rem 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#A29BFE", fontWeight: 600 }}>
              Funkcje
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", marginTop: "0.8rem" }}>
              Wszystko czego potrzebuje <span className="rutynka-gradient">Twoja rodzina</span>
            </h2>
          </div>

          <div className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {features.map((f, i) => (
              <motion.div key={f.title}
                style={{
                  background: "rgba(15, 15, 25, 0.6)", border: "1px solid rgba(108, 92, 231, 0.1)",
                  borderRadius: 18, padding: "2rem", position: "relative", overflow: "hidden",
                }}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                whileHover={{ borderColor: `${f.color}40`, y: -4 }}
              >
                <div style={{
                  position: "absolute", top: -30, right: -30, width: 100, height: 100, borderRadius: "50%",
                  background: `radial-gradient(circle, ${f.color}10 0%, transparent 70%)`,
                }} />
                <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{f.icon}</div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.5rem", color: f.color }}>{f.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "rgba(232,230,240,0.45)", lineHeight: 1.7 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ BENEFITS ROW ═══ */}
      <Section>
        <div style={{
          maxWidth: 1100, margin: "0 auto", padding: "3rem 2rem",
          borderTop: "1px solid rgba(108, 92, 231, 0.1)", borderBottom: "1px solid rgba(108, 92, 231, 0.1)",
        }}>
          <div className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "1.5rem", textAlign: "center" }}>
            {benefits.map((b, i) => (
              <motion.div key={b.text}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              >
                <div style={{ fontSize: "1.8rem", marginBottom: "0.4rem" }}>{b.emoji}</div>
                <div style={{ fontSize: "0.75rem", color: "rgba(232,230,240,0.5)", lineHeight: 1.4 }}>{b.text}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ TARGET AUDIENCE ═══ */}
      <Section id="dla-kogo">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "5rem 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#FF9F43", fontWeight: 600 }}>
              Dla kogo
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", marginTop: "0.8rem" }}>
              Rutynka pomaga <span className="rutynka-gradient">każdej rodzinie</span>
            </h2>
          </div>

          <div className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }}>
            {targetAudience.map((t, i) => (
              <motion.div key={t.title}
                style={{
                  background: "rgba(15, 15, 25, 0.6)", border: "1px solid rgba(108, 92, 231, 0.1)",
                  borderRadius: 18, padding: "2rem", textAlign: "center",
                }}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ borderColor: "rgba(108, 92, 231, 0.3)", y: -3 }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>{t.icon}</div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.5rem" }}>{t.title}</h4>
                <p style={{ fontSize: "0.82rem", color: "rgba(232,230,240,0.45)", lineHeight: 1.5 }}>{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ HOW IT WORKS ═══ */}
      <Section>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "5rem 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#00B894", fontWeight: 600 }}>
              Jak to działa
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", marginTop: "0.8rem" }}>
              W <span className="rutynka-gradient">3 prostych krokach</span>
            </h2>
          </div>

          {[
            { step: "1", title: "Stwórz profil dziecka", desc: "Dodaj imię, avatar i wiek. Rutynka automatycznie dostosuje trudność i zadania.", emoji: "👤" },
            { step: "2", title: "Ustaw rutyny", desc: "Wybierz gotowe szablony lub stwórz własne: poranne, wieczorne, weekendowe. Dostosuj kolejność i ikony.", emoji: "📝" },
            { step: "3", title: "Dziecko odhacza — Ty odpoczywasz", desc: "Dziecko samodzielnie przechodzi przez zadania. Za ukończoną rutynę zdobywa nagrody i konfetti 🎉!", emoji: "✅" },
          ].map((s, i) => (
            <motion.div key={s.step}
              style={{
                display: "flex", gap: "1.5rem", alignItems: "flex-start",
                padding: "2rem", marginBottom: "1.5rem",
                background: "rgba(15, 15, 25, 0.5)", border: "1px solid rgba(108, 92, 231, 0.1)",
                borderRadius: 18,
              }}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.15 }}
            >
              <div style={{
                minWidth: 56, height: 56, borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(108, 92, 231, 0.15), rgba(162, 155, 254, 0.1))",
                border: "1px solid rgba(108, 92, 231, 0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.5rem",
              }}>{s.emoji}</div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
                  <span className="rutynka-gradient" style={{ fontWeight: 800, fontSize: "0.7rem", letterSpacing: "0.1em" }}>KROK {s.step}</span>
                </div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.4rem" }}>{s.title}</h4>
                <p style={{ fontSize: "0.88rem", color: "rgba(232,230,240,0.45)", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ═══ COMING SOON CTA ═══ */}
      <Section id="zapisz-sie">
        <div style={{ maxWidth: 650, margin: "0 auto", padding: "5rem 2rem", textAlign: "center" }}>
          <motion.div
            style={{
              background: "linear-gradient(145deg, rgba(108, 92, 231, 0.08) 0%, rgba(255, 159, 67, 0.04) 100%)",
              border: "2px solid rgba(108, 92, 231, 0.25)",
              borderRadius: 28, padding: "3rem 2.5rem", position: "relative", overflow: "hidden",
            }}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Decorative */}
            <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(108, 92, 231, 0.06) 0%, transparent 70%)", top: -120, right: -80 }} />

            <div style={{ position: "relative" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🚀</div>
              <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, marginBottom: "0.75rem" }}>
                <span className="rutynka-gradient">Wkrótce w sprzedaży</span>
              </h2>
              <p style={{ fontSize: "0.95rem", color: "rgba(232,230,240,0.5)", marginBottom: "2rem", lineHeight: 1.7 }}>
                Zostaw maila — powiadomimy Cię gdy Rutynka będzie dostępna do pobrania.
                Bądź jednym z pierwszych użytkowników!
              </p>

              {/* Email form (visual only) */}
              <div style={{ display: "flex", gap: "0.75rem", maxWidth: 450, margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
                <input
                  type="email" placeholder="twoj@email.pl"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: 1, minWidth: 220, padding: "0.85rem 1.25rem", borderRadius: 50,
                    background: "rgba(15, 15, 25, 0.8)", border: "1px solid rgba(108, 92, 231, 0.2)",
                    color: "#e8e6f0", fontSize: "0.9rem", outline: "none",
                  }}
                />
                <motion.button
                  className="rutynka-btn"
                  style={{
                    padding: "0.85rem 2rem", borderRadius: 50, border: "none",
                    color: "#fff", fontSize: "0.9rem", fontWeight: 700, cursor: "pointer",
                  }}
                  whileHover={{ scale: 1.05, boxShadow: "0 12px 40px rgba(108, 92, 231, 0.35)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  Powiadom mnie 🔔
                </motion.button>
              </div>

              <p style={{ fontSize: "0.7rem", color: "rgba(232,230,240,0.3)", marginTop: "1rem" }}>
                Żadnego spamu. Tylko jedno powiadomienie o premierze. Obiecujemy 🤞
              </p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ═══ TECH STACK ═══ */}
      <Section>
        <div style={{
          maxWidth: 1100, margin: "0 auto", padding: "3rem 2rem",
          borderTop: "1px solid rgba(108, 92, 231, 0.1)",
        }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "rgba(232,230,240,0.5)" }}>
              Zbudowane z najlepszych technologii
            </h3>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "2.5rem", flexWrap: "wrap" }}>
            {["Vue 3", "Vite", "PWA", "TypeScript", "LocalStorage", "CSS Animations"].map((tech) => (
              <span key={tech} style={{
                padding: "0.4rem 1rem", borderRadius: 50,
                background: "rgba(108, 92, 231, 0.06)", border: "1px solid rgba(108, 92, 231, 0.1)",
                fontSize: "0.72rem", color: "rgba(232,230,240,0.4)", fontWeight: 500,
              }}>{tech}</span>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ borderTop: "1px solid rgba(108, 92, 231, 0.1)", padding: "2.5rem 2rem", textAlign: "center" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem", textDecoration: "none" }}>
          <Image src="/logo.png" alt="Novik Code" width={28} height={28} style={{ borderRadius: 6 }} />
          <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "#e8e6f0" }}>
            <span style={{ background: "var(--nc-gradient-text)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Novik</span>Code
          </span>
        </Link>
        <p style={{ fontSize: "0.72rem", color: "rgba(232,230,240,0.3)", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
          © {new Date().getFullYear()} Novik Code · Rutynka jest produktem Novik Code
        </p>
        <p style={{ fontSize: "0.68rem", color: "rgba(232,230,240,0.25)", lineHeight: 1.6 }}>
          ELMAR Sp. z o.o. · NIP: 7542680826 · Opole, Polska<br />
          <a href="mailto:marcin@nowosielski.pl" style={{ color: "#6C5CE7" }}>marcin@nowosielski.pl</a> · tel. <a href="tel:+48790740770" style={{ color: "#6C5CE7" }}>790 740 770</a>
        </p>
      </footer>
    </div>
  );
}
