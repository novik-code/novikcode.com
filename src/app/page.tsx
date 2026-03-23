"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────
   ANIMATED COUNTER
   ───────────────────────────────────────────── */
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * value);
      setCount(start);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─────────────────────────────────────────────
   FLOATING PARTICLES
   ───────────────────────────────────────────── */
function Particles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 1.5 + Math.random() * 3,
    delay: Math.random() * 15,
    duration: 10 + Math.random() * 15,
    color: i % 3 === 0
      ? "rgba(224, 120, 48, 0.4)"
      : i % 3 === 1
        ? "rgba(107, 66, 201, 0.3)"
        : "rgba(212, 175, 55, 0.3)",
  }));

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1, overflow: "hidden" }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            bottom: "-10px",
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animation: `particleFloat ${p.duration}s ${p.delay}s infinite ease-in`,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   CURSOR GLOW
   ───────────────────────────────────────────── */
function CursorGlow() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 30 });
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [x, y]);

  return (
    <motion.div
      style={{
        position: "fixed",
        width: 400,
        height: 400,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(224, 120, 48, 0.06) 0%, rgba(107, 66, 201, 0.03) 40%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 2,
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    />
  );
}

/* ─────────────────────────────────────────────
   SECTION WRAPPER — Reveal-on-scroll
   ───────────────────────────────────────────── */
function Section({
  children,
  id,
  delay = 0,
}: {
  children: React.ReactNode;
  id?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.section>
  );
}

/* ─────────────────────────────────────────────
   MAGNETIC BUTTON
   ───────────────────────────────────────────── */
function MagneticButton({ children, href, primary = false }: { children: React.ReactNode; href: string; primary?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouse = useCallback((e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.15);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.15);
  }, [x, y]);

  const reset = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{
        x, y,
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: primary ? "1rem 2.5rem" : "1rem 2.5rem",
        borderRadius: 50,
        background: primary ? "var(--nc-gradient-main)" : "transparent",
        backgroundSize: primary ? "200% 100%" : undefined,
        animation: primary ? "gradient-shift 3s ease-in-out infinite" : undefined,
        border: primary ? "none" : "1px solid var(--nc-glass-border)",
        color: "#fff",
        fontSize: "0.95rem",
        fontWeight: 600,
        letterSpacing: "0.04em",
        textDecoration: "none",
        transition: "box-shadow 0.3s, border-color 0.3s, background 0.3s",
      }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      whileHover={{
        scale: 1.05,
        boxShadow: primary
          ? "0 16px 50px rgba(224, 120, 48, 0.35)"
          : "0 8px 30px rgba(107, 66, 201, 0.2)",
      }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.a>
  );
}

/* ─────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */
const services = [
  { icon: "🚀", title: "Web Applications", desc: "Full-stack Next.js applications with real-time features, PWA capabilities, and premium UX that converts visitors into customers." },
  { icon: "🤖", title: "AI Integration", desc: "GPT-powered assistants, automated content generation, smart email drafting, voice interfaces, and intelligent automation." },
  { icon: "📱", title: "SaaS Platforms", desc: "Multi-tenant architecture, subscription billing, admin dashboards, and infinitely scalable cloud infrastructure." },
  { icon: "⚡", title: "Automation", desc: "Cron-driven workflows, SMS/email/push notification pipelines, social media auto-posting, and smart scheduling." },
  { icon: "🎨", title: "Premium Design", desc: "Dark mode aesthetics, glassmorphic interfaces, cinematic animations, and mobile-first responsive experiences." },
  { icon: "🔒", title: "Security & GDPR", desc: "Role-based access, audit logging, rate limiting, biometric signatures, encryption, and full GDPR compliance." },
];

const stats = [
  { value: 85, suffix: "+", label: "API Endpoints" },
  { value: 16, suffix: "", label: "Integrations" },
  { value: 39, suffix: "+", label: "Database Tables" },
  { value: 17, suffix: "", label: "Automated Crons" },
];

const techStack = [
  "Next.js", "React", "TypeScript", "Supabase", "Vercel",
  "OpenAI", "Framer Motion", "Stripe", "Node.js", "PostgreSQL",
];

/* ─────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────── */
export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div style={{ position: "relative" }}>
      {mounted && <CursorGlow />}
      {mounted && <Particles />}

      {/* ═══ NAVIGATION ═══ */}
      <motion.nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "1rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(6, 6, 10, 0.7)",
          backdropFilter: "blur(24px)",
          borderBottom: "1px solid var(--nc-glass-border)",
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <motion.div whileHover={{ rotate: 10, scale: 1.1 }} transition={{ type: "spring" }}>
            <Image src="/logo.png" alt="Novik Code" width={36} height={36} style={{ borderRadius: 8 }} />
          </motion.div>
          <span style={{ fontWeight: 700, fontSize: "1.1rem", letterSpacing: "0.05em" }}>
            <span className="gradient-text">Novik</span>Code
          </span>
        </div>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {[
            { href: "#services", label: "Services" },
            { href: "/dentflow", label: "🦷 DentFlow" },
            { href: "#work", label: "Work" },
            { href: "#contact", label: "Contact" },
          ].map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="hide-mobile"
              style={{
                fontSize: "0.85rem",
                color: "var(--nc-text-muted)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                fontWeight: 500,
                textDecoration: "none",
                position: "relative",
              }}
              whileHover={{ color: "#e8e6f0" }}
            >
              {link.label}
            </motion.a>
          ))}
          <MagneticButton href="#contact" primary>Get in Touch</MagneticButton>
        </div>
      </motion.nav>

      {/* ═══ HERO with animated logo background ═══ */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          padding: "6rem 2rem 4rem",
        }}
      >
        {/* ── ANIMATED LOGO BACKGROUND ── */}
        <div
          style={{
            position: "absolute",
            inset: "-20%",
            zIndex: 0,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: "url(/logo.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              animation: "kenBurns 30s ease-in-out infinite",
              opacity: 0.15,
              filter: "blur(2px) saturate(1.5)",
            }}
          />
        </div>

        {/* ── ROTATING GRADIENT GLOW ── */}
        <div
          style={{
            position: "absolute",
            width: "800px",
            height: "800px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "conic-gradient(from 0deg, rgba(224, 120, 48, 0.08), rgba(107, 66, 201, 0.08), rgba(212, 175, 55, 0.05), rgba(224, 120, 48, 0.08))",
              borderRadius: "50%",
              animation: "rotateGlow 20s linear infinite",
              filter: "blur(80px)",
            }}
          />
        </div>

        {/* ── DARK VIGNETTE ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at center, transparent 20%, var(--nc-bg) 75%)",
            zIndex: 0,
          }}
        />

        {/* ── CONTENT ── */}
        <div
          style={{
            maxWidth: "var(--nc-max-width)",
            width: "100%",
            textAlign: "center",
            position: "relative",
            zIndex: 3,
          }}
        >
          {/* Logo hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, filter: "blur(30px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Image
              src="/logo.png"
              alt="Novik Code"
              width={220}
              height={220}
              style={{
                borderRadius: 28,
                margin: "0 auto 2.5rem",
                display: "block",
                animation: "pulse-glow 4s ease-in-out infinite",
              }}
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "0.4rem 1.2rem",
                borderRadius: 50,
                background: "var(--nc-glass)",
                border: "1px solid var(--nc-glass-border)",
                fontSize: "0.72rem",
                fontWeight: 600,
                color: "var(--nc-text-muted)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "2rem",
                animation: "borderPulse 3s ease-in-out infinite",
              }}
            >
              ✦ Software House · AI-Powered Solutions
            </div>
          </motion.div>

          <motion.h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              marginBottom: "1.5rem",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Design · Development ·{" "}
            <span className="gradient-text">Innovation</span>
          </motion.h1>

          <motion.p
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
              color: "var(--nc-text-muted)",
              maxWidth: 650,
              margin: "0 auto 3rem",
              lineHeight: 1.8,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            We build <strong style={{ color: "var(--nc-text)" }}>premium digital products</strong>{" "}
            powered by AI. From stunning web applications to intelligent SaaS platforms — we code the future.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <MagneticButton href="#work" primary>See Our Work →</MagneticButton>
            <MagneticButton href="#contact">Contact Us</MagneticButton>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            style={{ marginTop: "5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <span style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--nc-text-dim)" }}>
              Explore
            </span>
            <motion.div
              style={{
                width: 1,
                height: 40,
                background: "linear-gradient(to bottom, var(--nc-orange), transparent)",
              }}
              animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.3, 0.8, 0.3] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <Section>
        <div
          className="stats-grid"
          style={{
            maxWidth: "var(--nc-max-width)",
            margin: "0 auto",
            padding: "3.5rem 2rem",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2rem",
            borderTop: "1px solid var(--nc-glass-border)",
            borderBottom: "1px solid var(--nc-glass-border)",
          }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              style={{ textAlign: "center" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <div className="gradient-text" style={{ fontSize: "2.8rem", fontWeight: 800, lineHeight: 1, marginBottom: "0.5rem" }}>
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--nc-text-muted)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ═══ SERVICES ═══ */}
      <Section id="services">
        <div style={{ maxWidth: "var(--nc-max-width)", margin: "0 auto", padding: "var(--nc-section-gap) 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nc-orange)", fontWeight: 600 }}>
              What We Do
            </span>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginTop: "1rem" }}>
              Crafting <span className="gradient-text">Digital Excellence</span>
            </h2>
            <p style={{ color: "var(--nc-text-muted)", maxWidth: 550, margin: "1rem auto 0", fontSize: "1.05rem" }}>
              End-to-end development with obsessive attention to detail, performance, and user experience.
            </p>
          </div>

          <div
            className="mobile-stack"
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}
          >
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                style={{
                  background: "var(--nc-glass)",
                  border: "1px solid var(--nc-glass-border)",
                  borderRadius: "var(--nc-border-radius)",
                  padding: "2rem",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "default",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{
                  borderColor: "rgba(224, 120, 48, 0.3)",
                  background: "rgba(255, 255, 255, 0.06)",
                  y: -6,
                  transition: { duration: 0.3 },
                }}
              >
                {/* Gradient accent */}
                <motion.div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: "var(--nc-gradient-main)",
                    transformOrigin: "left",
                    scaleX: 0,
                  }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                />
                <div style={{ position: "absolute", top: -40, right: -40, width: 120, height: 120, borderRadius: "50%", background: i % 2 === 0 ? "radial-gradient(circle, rgba(224, 120, 48, 0.08) 0%, transparent 70%)" : "radial-gradient(circle, rgba(107, 66, 201, 0.08) 0%, transparent 70%)" }} />
                <div style={{ fontSize: "2rem", marginBottom: "1rem", position: "relative" }}>{s.icon}</div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.75rem", position: "relative" }}>{s.title}</h3>
                <p style={{ color: "var(--nc-text-muted)", fontSize: "0.92rem", lineHeight: 1.7, position: "relative" }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ TECH STACK ═══ */}
      <Section>
        <div style={{ maxWidth: "var(--nc-max-width)", margin: "0 auto", padding: "0 2rem 4rem", textAlign: "center" }}>
          <span style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nc-purple-light)", fontWeight: 600 }}>
            Tech Stack
          </span>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", margin: "1rem 0 2.5rem" }}>
            Built with <span className="gradient-text">Modern Technology</span>
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.75rem" }}>
            {techStack.map((tech, i) => (
              <motion.span
                key={tech}
                style={{
                  padding: "0.6rem 1.5rem",
                  borderRadius: 50,
                  background: "var(--nc-glass)",
                  border: "1px solid var(--nc-glass-border)",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  color: "var(--nc-text-muted)",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                whileHover={{
                  borderColor: "rgba(224, 120, 48, 0.4)",
                  color: "#e8e6f0",
                  background: "rgba(224, 120, 48, 0.08)",
                  scale: 1.08,
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ FEATURED WORK ═══ */}
      <Section id="work">
        <div style={{ maxWidth: "var(--nc-max-width)", margin: "0 auto", padding: "var(--nc-section-gap) 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nc-orange)", fontWeight: 600 }}>
              Case Study
            </span>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginTop: "1rem" }}>
              Our <span className="gradient-text">Flagship Product</span>
            </h2>
          </div>

          <motion.div
            style={{
              background: "var(--nc-gradient-card)",
              border: "1px solid var(--nc-glass-border)",
              borderRadius: 24,
              padding: "3rem",
              position: "relative",
              overflow: "hidden",
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ borderColor: "rgba(224, 120, 48, 0.2)" }}
          >
            <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(224, 120, 48, 0.06) 0%, transparent 70%)", top: -150, right: -150 }} />
            <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(107, 66, 201, 0.06) 0%, transparent 70%)", bottom: -100, left: -100 }} />

            <div className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}>
              <div>
                <motion.div
                  style={{
                    display: "inline-block",
                    padding: "0.3rem 1rem",
                    borderRadius: 50,
                    background: "rgba(224, 120, 48, 0.12)",
                    border: "1px solid rgba(224, 120, 48, 0.2)",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    color: "var(--nc-orange)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "1.5rem",
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  🦷 Healthcare · SaaS
                </motion.div>
                <h3 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "1rem", lineHeight: 1.2 }}>
                  Dental Clinic <span className="gradient-text">Management Platform</span>
                </h3>
                <p style={{ color: "var(--nc-text-muted)", fontSize: "1rem", lineHeight: 1.8, marginBottom: "2rem" }}>
                  A comprehensive all-in-one platform for modern dental clinics.
                  Patient booking, consent signing, AI email drafting, social media automation,
                  employee management — the complete digital infrastructure.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {["Online Booking", "Patient Portal", "AI Assistant", "SMS Automation", "E-Commerce", "Push Notifications", "Social Media AI", "Consent PDF Signing"].map((f) => (
                    <motion.span
                      key={f}
                      style={{
                        padding: "0.35rem 0.85rem",
                        borderRadius: 50,
                        background: "var(--nc-glass)",
                        border: "1px solid var(--nc-glass-border)",
                        fontSize: "0.75rem",
                        color: "var(--nc-text-muted)",
                      }}
                      whileHover={{ borderColor: "rgba(224, 120, 48, 0.3)", color: "#e8e6f0" }}
                    >
                      {f}
                    </motion.span>
                  ))}
                </div>

                {/* CTA to DentFlow */}
                <div style={{ marginTop: "2rem" }}>
                  <motion.a
                    href="/dentflow"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "0.5rem",
                      padding: "0.75rem 2rem", borderRadius: 50,
                      background: "var(--nc-gradient-main)", backgroundSize: "200% 100%",
                      animation: "gradient-shift 3s ease-in-out infinite",
                      color: "#fff", fontSize: "0.85rem", fontWeight: 600,
                      textDecoration: "none",
                    }}
                    whileHover={{ scale: 1.05, boxShadow: "0 12px 40px rgba(224, 120, 48, 0.3)" }}
                  >
                    🦷 Dowiedz się więcej o DentFlow →
                  </motion.a>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                {[
                  { val: "85+", label: "API Endpoints", icon: "⚡" },
                  { val: "16", label: "Integrations", icon: "🔗" },
                  { val: "17", label: "Automated Crons", icon: "⏰" },
                  { val: "39+", label: "Database Tables", icon: "🗄️" },
                  { val: "PWA", label: "Native-Like App", icon: "📱" },
                  { val: "AI", label: "GPT-4o Powered", icon: "🤖" },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    style={{
                      background: "var(--nc-glass)",
                      border: "1px solid var(--nc-glass-border)",
                      borderRadius: 14,
                      padding: "1.25rem",
                      textAlign: "center",
                    }}
                    whileHover={{
                      borderColor: "rgba(224, 120, 48, 0.3)",
                      y: -3,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{item.icon}</div>
                    <div className="gradient-text" style={{ fontSize: "1.7rem", fontWeight: 800, lineHeight: 1 }}>{item.val}</div>
                    <div style={{ fontSize: "0.68rem", color: "var(--nc-text-muted)", marginTop: "0.35rem", letterSpacing: "0.05em" }}>{item.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ═══ CONTACT ═══ */}
      <Section id="contact">
        <div style={{ maxWidth: "var(--nc-max-width)", margin: "0 auto", padding: "var(--nc-section-gap) 2rem", textAlign: "center" }}>
          <motion.div
            style={{
              background: "var(--nc-gradient-card)",
              border: "1px solid var(--nc-glass-border)",
              borderRadius: 32,
              padding: "5rem 3rem",
              position: "relative",
              overflow: "hidden",
            }}
            whileHover={{ borderColor: "rgba(107, 66, 201, 0.2)" }}
          >
            <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(107, 66, 201, 0.06) 0%, transparent 70%)", top: -200, left: "50%", transform: "translateX(-50%)" }} />

            <span style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--nc-purple-light)", fontWeight: 600, position: "relative" }}>
              Let&apos;s Talk
            </span>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginTop: "1rem", marginBottom: "1rem", position: "relative" }}>
              Ready to Build <span className="gradient-text">Something Extraordinary</span>?
            </h2>
            <p style={{ color: "var(--nc-text-muted)", maxWidth: 550, margin: "0 auto 3rem", fontSize: "1.05rem", position: "relative" }}>
              Whether you need a complete platform or a single brilliant feature — we&apos;re here to make it happen.
            </p>

            <div style={{ position: "relative" }}>
              <MagneticButton href="mailto:hello@novikcode.com" primary>
                ✉️ hello@novikcode.com
              </MagneticButton>
            </div>

            <p style={{ marginTop: "2rem", fontSize: "0.82rem", color: "var(--nc-text-dim)", position: "relative" }}>
              Opole, Poland · Available Worldwide
            </p>
          </motion.div>
        </div>
      </Section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ borderTop: "1px solid var(--nc-glass-border)", padding: "3rem 2rem", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "1rem" }}>
          <Image src="/logo.png" alt="Novik Code" width={28} height={28} style={{ borderRadius: 6 }} />
          <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>
            <span className="gradient-text">Novik</span>Code
          </span>
        </div>
        <p style={{ fontSize: "0.72rem", color: "var(--nc-text-dim)", letterSpacing: "0.1em" }}>
          © {new Date().getFullYear()} Novik Code. Design · Development · Innovation
        </p>
      </footer>
    </div>
  );
}
