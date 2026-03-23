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
    bg: "linear-gradient(135deg, #fff5eb, #ffecd2)",
  },
  {
    icon: "🌙",
    title: "Wieczorna rutyna",
    desc: "Wieczorny rytuał: kąpiel, piżama, czytanie, przygotowanie na jutro — spokojne zakończenie dnia z nagrodą na końcu.",
    color: "#6C5CE7",
    bg: "linear-gradient(135deg, #f0edff, #e8e4ff)",
  },
  {
    icon: "👨‍👩‍👧‍👦",
    title: "Profile dzieci",
    desc: "Każde dziecko ma własny profil z avatarem, własnymi rutynami i indywidualnym postępem. Idealnie dla rodzin z kilkorgiem dzieci.",
    color: "#00B894",
    bg: "linear-gradient(135deg, #e8fff5, #d4fce8)",
  },
  {
    icon: "🏆",
    title: "System nagród i gwiazd",
    desc: "Gwiazdki za ukończone zadania, odznaki za serie, sklep z nagrodami. Dzieci kupują nagrody za zdobyte gwiazdki!",
    color: "#F9CA24",
    bg: "linear-gradient(135deg, #fffde6, #fff9cc)",
  },
  {
    icon: "🎉",
    title: "Konfetti i animacje",
    desc: "Ukończenie rutyny = eksplozja konfetti! Micro-animacje przy każdym odhaczeniu zadania. Dziecko czuje się jak bohater.",
    color: "#E84393",
    bg: "linear-gradient(135deg, #fff0f5, #ffe4ef)",
  },
  {
    icon: "📊",
    title: "Postępy i statystyki",
    desc: "Historia serii: ile dni z rzędu udało się ukończyć rutynę. Wykresy, tygodniowe podsumowania, rekordy.",
    color: "#0984E3",
    bg: "linear-gradient(135deg, #e4f4ff, #d4ecff)",
  },
  {
    icon: "🎨",
    title: "Pełna personalizacja",
    desc: "Własne zadania z emoji, kolejność, timery, dźwięki. Zero sztywnych schematów — rutyna skrojona pod Twoje dziecko.",
    color: "#A29BFE",
    bg: "linear-gradient(135deg, #f0edff, #ece8ff)",
  },
  {
    icon: "📲",
    title: "PWA — działa jak aplikacja",
    desc: "Zainstaluj na telefonie lub tablecie. Działa offline. Wspiera tryb ciemny. Bez App Store, bez aktualizacji.",
    color: "#55EFC4",
    bg: "linear-gradient(135deg, #e8fff5, #d4fce8)",
  },
];

const childAvatars = [
  { name: "Michał", emoji: "🧑‍🦱", color: "#6C5CE7", colorLight: "#A29BFE", tasks: ["🪥 Mycie zębów", "👕 Ubranie się", "🎒 Plecak"], progress: 67 },
  { name: "Lilly", emoji: "👧", color: "#E84393", colorLight: "#FD79A8", tasks: ["🫧 Kąpiel", "👗 Piżama", "📖 Czytanie"], progress: 100 },
  { name: "Axel", emoji: "👦", color: "#00B894", colorLight: "#55EFC4", tasks: ["🥣 Śniadanie", "🧹 Porządek", "🖍️ Rysowanie"], progress: 33 },
];

const benefits = [
  { emoji: "⏰", text: "Mniej porannego chaosu" },
  { emoji: "😊", text: "Spokojniejsze wieczory" },
  { emoji: "🧠", text: "Dziecko uczy się samodzielności" },
  { emoji: "📵", text: "Bez reklam, bez śledzenia" },
  { emoji: "👪", text: "Dla całej rodziny" },
  { emoji: "🔒", text: "Dane 100% lokalne" },
];

const targetAudience = [
  { icon: "👶", title: "Rodzice maluchów (3–6 lat)", desc: "Wizualne checklisy z obrazkami, proste zadania, duże przyciski i dużo nagród." },
  { icon: "🧒", title: "Rodzice starszych dzieci (7–12)", desc: "Złożone rutyny, system gwiazdek i odznak, nauka samodyscypliny." },
  { icon: "👨‍👩‍👧‍👦", title: "Rodziny wielodzietne", desc: "3 profile dzieci, rywalizacja rodzeństwa, tygodniowe rankingi i podsumowania." },
  { icon: "🧑‍🏫", title: "Pedagodzy i terapeuci", desc: "Strukturyzacja dnia dla dzieci z ADHD, ASD — wizualna, przewidywalna, wspierająca." },
];

/* ─── PAGE ─── */
export default function RutynkaPage() {
  const [email, setEmail] = useState("");

  return (
    <div style={{
      position: "relative",
      background: "linear-gradient(135deg, #f0edff 0%, #fff0f5 50%, #e8fff5 100%)",
      color: "#2d3436",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      minHeight: "100vh",
    }}>
      {/* ═══ CSS ═══ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes bounceIn { 0% { transform: scale(0); } 50% { transform: scale(1.15); } 70% { transform: scale(0.95); } 100% { transform: scale(1); } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes confettiDrop { 0% { transform: translateY(-20px) rotate(0deg); opacity: 1; } 100% { transform: translateY(60px) rotate(720deg); opacity: 0; } }
        @keyframes checkPop { 0% { transform: scale(0) rotate(-45deg); } 50% { transform: scale(1.3) rotate(10deg); } 100% { transform: scale(1) rotate(0); } }
        .rutynka-title { font-family: 'Nunito', sans-serif; background: linear-gradient(135deg, #6C5CE7, #E84393, #00B894); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .rutynka-heading { font-family: 'Nunito', sans-serif; }
        .hide-mobile { display: inline-flex; }
        .progress-fill { transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1); }
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .mobile-stack { grid-template-columns: 1fr !important; }
          .mobile-stack-2 { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      {/* Floating decorative blobs */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "rgba(108, 92, 231, 0.06)", top: "-10%", right: "-5%", filter: "blur(60px)", animation: "float 8s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: 350, height: 350, borderRadius: "50%", background: "rgba(232, 67, 147, 0.05)", bottom: "10%", left: "-5%", filter: "blur(60px)", animation: "float 10s ease-in-out infinite reverse" }} />
        <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "rgba(0, 184, 148, 0.04)", top: "40%", left: "60%", filter: "blur(60px)", animation: "float 12s ease-in-out 2s infinite" }} />
      </div>

      {/* ═══ NAV ═══ */}
      <motion.nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: "0.75rem 2rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "rgba(240, 237, 255, 0.85)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(108, 92, 231, 0.1)",
          boxShadow: "0 2px 20px rgba(108, 92, 231, 0.06)",
        }}
        initial={{ y: -100 }} animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
          <Image src="/logo.png" alt="Novik Code" width={28} height={28} style={{ borderRadius: 6 }} />
          <span className="rutynka-heading" style={{ fontWeight: 800, fontSize: "0.9rem", color: "#2d3436" }}>
            <span style={{ color: "#6C5CE7" }}>Novik</span>Code
          </span>
        </Link>
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          {[
            { href: "#funkcje", label: "Funkcje" },
            { href: "#jak-to-dziala", label: "Jak to działa" },
            { href: "#zapisz-sie", label: "Premiera" },
          ].map((l) => (
            <motion.a key={l.href} href={l.href} className="hide-mobile"
              style={{ fontSize: "0.8rem", color: "#636e72", fontFamily: "'Nunito', sans-serif", fontWeight: 700, textDecoration: "none" }}
              whileHover={{ color: "#6C5CE7" }}
            >{l.label}</motion.a>
          ))}
          <motion.a href="#zapisz-sie"
            style={{
              padding: "0.5rem 1.2rem", borderRadius: 50,
              background: "linear-gradient(135deg, #6C5CE7 0%, #A29BFE 100%)",
              color: "#fff", fontSize: "0.78rem", fontWeight: 800, fontFamily: "'Nunito', sans-serif",
              textDecoration: "none", boxShadow: "0 4px 15px rgba(108, 92, 231, 0.2)",
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(108, 92, 231, 0.3)" }}
          >🌅 Powiadom mnie</motion.a>
        </div>
      </motion.nav>

      {/* ═══ HERO ═══ */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden", padding: "7rem 2rem 5rem",
      }}>
        <div style={{ maxWidth: 850, width: "100%", textAlign: "center", position: "relative", zIndex: 3 }}>
          {/* Coming soon badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <div className="rutynka-heading" style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.5rem 1.5rem", borderRadius: 50,
              background: "#fff", border: "2px solid rgba(108, 92, 231, 0.15)",
              fontSize: "0.78rem", fontWeight: 700, color: "#6C5CE7",
              boxShadow: "0 4px 20px rgba(108, 92, 231, 0.08)", marginBottom: "2rem",
            }}>
              🚀 Wkrótce w sprzedaży — zostaw maila!
            </div>
          </motion.div>

          {/* Giant emoji */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            style={{ fontSize: "clamp(4rem, 10vw, 7rem)", marginBottom: "0.5rem", animation: "float 3s ease-in-out infinite" }}
          >
            🌅
          </motion.div>

          {/* Title */}
          <motion.h1
            className="rutynka-title"
            style={{ fontSize: "clamp(3rem, 7vw, 5rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: "1rem" }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Rutynka
          </motion.h1>

          <motion.p
            className="rutynka-heading"
            style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", fontWeight: 700, color: "#2d3436", marginBottom: "1rem", lineHeight: 1.4 }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Poranne i wieczorne rutyny<br />dla Twojego dziecka 🧒
          </motion.p>

          <motion.p
            style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)", color: "#636e72", maxWidth: 520, margin: "0 auto 2.5rem", lineHeight: 1.8 }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Zamień poranny chaos i wieczorne negocjacje w <strong style={{ color: "#6C5CE7" }}>zabawę</strong>.
            Dziecko samo odhacza zadania, zdobywa gwiazdki ⭐ i uczy się samodzielności.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.a href="#zapisz-sie"
              className="rutynka-heading"
              style={{
                padding: "1rem 2.5rem", borderRadius: 50,
                background: "linear-gradient(135deg, #6C5CE7 0%, #E84393 100%)",
                color: "#fff", fontSize: "1rem", fontWeight: 800, textDecoration: "none",
                boxShadow: "0 8px 30px rgba(108, 92, 231, 0.25)",
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 12px 40px rgba(108, 92, 231, 0.35)" }}
              whileTap={{ scale: 0.97 }}
            >
              Powiadom mnie o premierze 🔔
            </motion.a>
            <motion.a href="#funkcje"
              className="rutynka-heading"
              style={{
                padding: "1rem 2.5rem", borderRadius: 50,
                background: "#fff", border: "2px solid rgba(108, 92, 231, 0.15)",
                color: "#6C5CE7", fontSize: "1rem", fontWeight: 700, textDecoration: "none",
                boxShadow: "0 4px 15px rgba(108, 92, 231, 0.06)",
              }}
              whileHover={{ borderColor: "#6C5CE7", boxShadow: "0 8px 25px rgba(108, 92, 231, 0.12)" }}
            >
              Zobacz funkcje ✨
            </motion.a>
          </motion.div>

          {/* Quick benefits row */}
          <motion.div
            style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "3rem", flexWrap: "wrap" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            {benefits.slice(0, 4).map((b) => (
              <span className="rutynka-heading" key={b.text} style={{ fontSize: "0.8rem", color: "#636e72", fontWeight: 700 }}>
                {b.emoji} {b.text}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ APP PREVIEW — SIMULATED CHILD CARDS ═══ */}
      <Section>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "3rem 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span className="rutynka-heading" style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#E84393", fontWeight: 700 }}>
              Tak wygląda Rutynka
            </span>
            <h2 className="rutynka-heading" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", marginTop: "0.5rem", color: "#2d3436" }}>
              Każde dziecko ma <span className="rutynka-title">własny świat</span>
            </h2>
          </div>

          <div className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
            {childAvatars.map((child, i) => (
              <motion.div key={child.name}
                style={{
                  background: "#fff",
                  borderRadius: 24,
                  padding: "1.75rem",
                  textAlign: "center",
                  borderTop: `4px solid ${child.color}`,
                  boxShadow: "0 4px 20px rgba(108, 92, 231, 0.08)",
                  position: "relative",
                  overflow: "hidden",
                }}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                whileHover={{ y: -6, boxShadow: "0 12px 40px rgba(108, 92, 231, 0.15)" }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "0.5rem", animation: "float 4s ease-in-out infinite", animationDelay: `${i * 0.5}s` }}>{child.emoji}</div>
                <h3 className="rutynka-heading" style={{ fontSize: "1.3rem", fontWeight: 800, color: child.color, marginBottom: "0.75rem" }}>{child.name}</h3>
                
                {/* Progress bar */}
                <div style={{ background: "#f0f0f0", borderRadius: 4, height: 8, marginBottom: "0.5rem", overflow: "hidden" }}>
                  <div className="progress-fill" style={{ width: `${child.progress}%`, height: "100%", borderRadius: 4, background: `linear-gradient(90deg, ${child.color}, ${child.colorLight})` }} />
                </div>
                <p className="rutynka-heading" style={{ fontSize: "0.8rem", fontWeight: 700, color: "#636e72", marginBottom: "1rem" }}>
                  {child.progress}% ukończone
                </p>

                {/* Task list */}
                {child.tasks.map((task, ti) => (
                  <div key={task} style={{
                    display: "flex", alignItems: "center", gap: "0.6rem",
                    padding: "0.5rem 0.75rem", marginBottom: "0.4rem",
                    background: ti < Math.ceil(child.tasks.length * child.progress / 100) ? "linear-gradient(135deg, #f0fff4, #e8fff0)" : "#fafafa",
                    borderRadius: 12, fontSize: "0.85rem",
                    fontFamily: "'Nunito', sans-serif", fontWeight: 700,
                    color: ti < Math.ceil(child.tasks.length * child.progress / 100) ? "#b2bec3" : "#2d3436",
                    textDecoration: ti < Math.ceil(child.tasks.length * child.progress / 100) ? "line-through" : "none",
                  }}>
                    <span style={{ fontSize: "1rem" }}>{ti < Math.ceil(child.tasks.length * child.progress / 100) ? "✅" : "⬜"}</span>
                    {task}
                  </div>
                ))}

                {child.progress === 100 && (
                  <div className="rutynka-heading" style={{ marginTop: "0.75rem", fontSize: "0.8rem", fontWeight: 800, color: "#00B894" }}>
                    🎉 Wszystko zrobione!
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ FEATURES ═══ */}
      <Section id="funkcje">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "5rem 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span className="rutynka-heading" style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#6C5CE7", fontWeight: 700 }}>
              Funkcje
            </span>
            <h2 className="rutynka-heading" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", marginTop: "0.5rem", color: "#2d3436" }}>
              Wszystko czego potrzebuje <span className="rutynka-title">Twoja rodzina</span>
            </h2>
          </div>

          <div className="mobile-stack-2" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
            {features.map((f, i) => (
              <motion.div key={f.title}
                style={{
                  background: f.bg,
                  borderRadius: 20,
                  padding: "1.75rem 1.5rem",
                  border: "1px solid rgba(108, 92, 231, 0.06)",
                  boxShadow: "0 2px 12px rgba(108, 92, 231, 0.04)",
                }}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6, boxShadow: `0 12px 30px ${f.color}20` }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{f.icon}</div>
                <h3 className="rutynka-heading" style={{ fontSize: "1rem", fontWeight: 800, marginBottom: "0.4rem", color: f.color }}>{f.title}</h3>
                <p style={{ fontSize: "0.82rem", color: "#636e72", lineHeight: 1.6 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ BENEFITS ═══ */}
      <Section>
        <div style={{
          maxWidth: 1000, margin: "0 auto", padding: "2.5rem 2rem",
          background: "#fff", borderRadius: 28,
          boxShadow: "0 4px 20px rgba(108, 92, 231, 0.06)",
          marginLeft: "2rem", marginRight: "2rem",
        }}>
          <div className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "1.5rem", textAlign: "center" }}>
            {benefits.map((b, i) => (
              <motion.div key={b.text}
                initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              >
                <div style={{ fontSize: "1.8rem", marginBottom: "0.4rem" }}>{b.emoji}</div>
                <div className="rutynka-heading" style={{ fontSize: "0.73rem", color: "#636e72", fontWeight: 700, lineHeight: 1.3 }}>{b.text}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ TARGET AUDIENCE ═══ */}
      <Section id="dla-kogo">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "5rem 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="rutynka-heading" style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#00B894", fontWeight: 700 }}>
              Dla kogo
            </span>
            <h2 className="rutynka-heading" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", marginTop: "0.5rem", color: "#2d3436" }}>
              Rutynka pomaga <span className="rutynka-title">każdej rodzinie</span>
            </h2>
          </div>

          <div className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }}>
            {targetAudience.map((t, i) => (
              <motion.div key={t.title}
                style={{
                  background: "#fff",
                  borderRadius: 22,
                  padding: "2rem 1.5rem",
                  textAlign: "center",
                  boxShadow: "0 4px 20px rgba(108, 92, 231, 0.06)",
                  border: "1px solid rgba(108, 92, 231, 0.06)",
                }}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 12px 35px rgba(108, 92, 231, 0.1)" }}
              >
                <div style={{ fontSize: "2.8rem", marginBottom: "0.75rem" }}>{t.icon}</div>
                <h4 className="rutynka-heading" style={{ fontSize: "0.95rem", fontWeight: 800, marginBottom: "0.5rem", color: "#2d3436" }}>{t.title}</h4>
                <p style={{ fontSize: "0.82rem", color: "#636e72", lineHeight: 1.5 }}>{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ HOW IT WORKS ═══ */}
      <Section id="jak-to-dziala">
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "5rem 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="rutynka-heading" style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#E84393", fontWeight: 700 }}>
              Jak to działa
            </span>
            <h2 className="rutynka-heading" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", marginTop: "0.5rem", color: "#2d3436" }}>
              W <span className="rutynka-title">3 prostych krokach</span>
            </h2>
          </div>

          {[
            { step: "1", title: "Stwórz profil dziecka", desc: "Dodaj imię, avatar i dostosuj rutyny. Możesz mieć do 3 profili dzieci z własnymi kolorami i zadaniami.", emoji: "👤", color: "#6C5CE7" },
            { step: "2", title: "Ustaw poranne i wieczorne rutyny", desc: "Wybierz gotowe zadania lub stwórz własne z emoji. Ustaw timery, kolejność, dźwięki ukończenia.", emoji: "📝", color: "#E84393" },
            { step: "3", title: "Dziecko odhacza — Ty odpoczywasz", desc: "Dziecko samodzielnie przechodzi przez zadania. Zdobywa gwiazdki, odblokowuje odznaki, kupuje nagrody w sklepie!", emoji: "✅", color: "#00B894" },
          ].map((s, i) => (
            <motion.div key={s.step}
              style={{
                display: "flex", gap: "1.5rem", alignItems: "flex-start",
                padding: "1.75rem", marginBottom: "1rem",
                background: "#fff", borderRadius: 20,
                boxShadow: "0 4px 20px rgba(108, 92, 231, 0.06)",
                borderLeft: `4px solid ${s.color}`,
              }}
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.15 }}
            >
              <div style={{
                minWidth: 52, height: 52, borderRadius: "50%",
                background: `${s.color}15`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.5rem", flexShrink: 0,
              }}>{s.emoji}</div>
              <div>
                <span className="rutynka-heading" style={{ fontWeight: 800, fontSize: "0.7rem", letterSpacing: "0.1em", color: s.color }}>KROK {s.step}</span>
                <h4 className="rutynka-heading" style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "0.3rem", color: "#2d3436" }}>{s.title}</h4>
                <p style={{ fontSize: "0.88rem", color: "#636e72", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ═══ COMING SOON CTA ═══ */}
      <Section id="zapisz-sie">
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "4rem 2rem", textAlign: "center" }}>
          <motion.div
            style={{
              background: "#fff",
              border: "2px solid rgba(108, 92, 231, 0.12)",
              borderRadius: 32, padding: "3rem 2.5rem",
              boxShadow: "0 8px 40px rgba(108, 92, 231, 0.08)",
              position: "relative", overflow: "hidden",
            }}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div style={{ position: "absolute", width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, rgba(108, 92, 231, 0.04) 0%, transparent 70%)", top: -80, right: -60 }} />
            <div style={{ position: "absolute", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(232, 67, 147, 0.03) 0%, transparent 70%)", bottom: -60, left: -40 }} />

            <div style={{ position: "relative" }}>
              <div style={{ fontSize: "3.5rem", marginBottom: "0.75rem", animation: "float 3s ease-in-out infinite" }}>🚀</div>
              <h2 className="rutynka-heading" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 900, marginBottom: "0.5rem", color: "#2d3436" }}>
                <span className="rutynka-title">Wkrótce w sprzedaży</span>
              </h2>
              <p style={{ fontSize: "0.92rem", color: "#636e72", marginBottom: "2rem", lineHeight: 1.7 }}>
                Zostaw maila — powiadomimy Cię gdy Rutynka będzie dostępna.<br />
                Bądź jednym z pierwszych użytkowników! 🎉
              </p>

              <div style={{ display: "flex", gap: "0.75rem", maxWidth: 420, margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
                <input
                  type="email" placeholder="twoj@email.pl"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: 1, minWidth: 200, padding: "0.85rem 1.25rem", borderRadius: 50,
                    background: "#f8f7ff", border: "2px solid rgba(108, 92, 231, 0.12)",
                    color: "#2d3436", fontSize: "0.9rem", outline: "none",
                    fontFamily: "'Nunito', sans-serif", fontWeight: 600,
                  }}
                />
                <motion.button
                  className="rutynka-heading"
                  style={{
                    padding: "0.85rem 1.8rem", borderRadius: 50, border: "none",
                    background: "linear-gradient(135deg, #6C5CE7, #E84393)",
                    color: "#fff", fontSize: "0.9rem", fontWeight: 800, cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(108, 92, 231, 0.2)",
                  }}
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(108, 92, 231, 0.3)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  Powiadom 🔔
                </motion.button>
              </div>

              <p className="rutynka-heading" style={{ fontSize: "0.7rem", color: "#b2bec3", marginTop: "1rem", fontWeight: 600 }}>
                Żadnego spamu. Tylko jedno powiadomienie o premierze 🤞
              </p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ borderTop: "1px solid rgba(108, 92, 231, 0.08)", padding: "2.5rem 2rem", textAlign: "center" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem", textDecoration: "none" }}>
          <Image src="/logo.png" alt="Novik Code" width={24} height={24} style={{ borderRadius: 5 }} />
          <span className="rutynka-heading" style={{ fontWeight: 800, fontSize: "0.85rem", color: "#2d3436" }}>
            <span style={{ color: "#6C5CE7" }}>Novik</span>Code
          </span>
        </Link>
        <p className="rutynka-heading" style={{ fontSize: "0.7rem", color: "#b2bec3", fontWeight: 600, marginBottom: "0.3rem" }}>
          © {new Date().getFullYear()} Novik Code · Rutynka jest produktem Novik Code
        </p>
        <p style={{ fontSize: "0.65rem", color: "#ddd", lineHeight: 1.5 }}>
          ELMAR Sp. z o.o. · NIP: 7542680826 · Opole, Polska ·{" "}
          <a href="mailto:marcin@nowosielski.pl" style={{ color: "#6C5CE7" }}>marcin@nowosielski.pl</a>
        </p>
      </footer>
    </div>
  );
}
