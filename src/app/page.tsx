"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────
   SECTION WRAPPER — Reveal-on-scroll
   ───────────────────────────────────────────── */
function Section({
  children,
  id,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.section>
  );
}

/* ─────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */
const services = [
  {
    icon: "🚀",
    title: "Web Applications",
    desc: "Full-stack Next.js applications with real-time features, PWA capabilities, and premium UX.",
  },
  {
    icon: "🤖",
    title: "AI Integration",
    desc: "GPT-powered assistants, automated content generation, smart email drafting, and voice interfaces.",
  },
  {
    icon: "📱",
    title: "SaaS Platforms",
    desc: "Multi-tenant architecture, subscription billing, admin dashboards, and scalable infrastructure.",
  },
  {
    icon: "⚡",
    title: "Automation",
    desc: "Cron-driven workflows, SMS/email/push notification pipelines, social media auto-posting.",
  },
  {
    icon: "🎨",
    title: "Premium Design",
    desc: "Dark mode aesthetics, glassmorphic interfaces, micro-animations, and mobile-first responsive design.",
  },
  {
    icon: "🔒",
    title: "Security & GDPR",
    desc: "Role-based access control, audit logging, rate limiting, biometric signing, and full GDPR compliance.",
  },
];

const techStack = [
  "Next.js", "React", "TypeScript", "Supabase", "Vercel",
  "OpenAI", "Framer Motion", "Stripe", "Node.js", "PostgreSQL",
];

const stats = [
  { value: "85+", label: "API Endpoints" },
  { value: "16", label: "Integrations" },
  { value: "39+", label: "Database Tables" },
  { value: "17", label: "Automated Crons" },
];

/* ─────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────── */
export default function Home() {
  return (
    <div style={{ position: "relative" }}>
      {/* ═══ NAVIGATION ═══ */}
      <nav
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
          background: "rgba(6, 6, 10, 0.8)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--nc-glass-border)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Image src="/logo.png" alt="Novik Code" width={36} height={36} style={{ borderRadius: 8 }} />
          <span
            style={{
              fontWeight: 700,
              fontSize: "1.1rem",
              letterSpacing: "0.05em",
            }}
          >
            <span className="gradient-text">Novik</span>Code
          </span>
        </div>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {[
            { href: "#services", label: "Services" },
            { href: "#work", label: "Work" },
            { href: "#contact", label: "Contact" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontSize: "0.85rem",
                color: "var(--nc-text-muted)",
                letterSpacing: "0.05em",
                transition: "color 0.3s",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#e8e6f0")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(232, 230, 240, 0.5)")
              }
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            style={{
              padding: "0.5rem 1.25rem",
              borderRadius: 50,
              background: "var(--nc-gradient-main)",
              color: "#fff",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow =
                "0 8px 30px rgba(224, 120, 48, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Get in Touch
          </a>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
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
        {/* Background gradient orbs */}
        <div
          style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(224, 120, 48, 0.12) 0%, transparent 70%)",
            top: "10%",
            left: "-10%",
            filter: "blur(60px)",
            animation: "float 8s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(107, 66, 201, 0.12) 0%, transparent 70%)",
            bottom: "5%",
            right: "-5%",
            filter: "blur(60px)",
            animation: "float 10s ease-in-out infinite reverse",
          }}
        />

        <div
          style={{
            maxWidth: "var(--nc-max-width)",
            width: "100%",
            textAlign: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Logo hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Image
              src="/logo.png"
              alt="Novik Code"
              width={200}
              height={200}
              style={{
                borderRadius: 24,
                margin: "0 auto 2rem",
                display: "block",
                animation: "pulse-glow 4s ease-in-out infinite",
              }}
              priority
            />
          </motion.div>

          <motion.h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: "1.5rem",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Design · Development ·{" "}
            <span className="gradient-text">Innovation</span>
          </motion.h1>

          <motion.p
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
              color: "var(--nc-text-muted)",
              maxWidth: 650,
              margin: "0 auto 2.5rem",
              lineHeight: 1.8,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            We build <strong style={{ color: "var(--nc-text)" }}>premium digital products</strong>{" "}
            powered by AI. From stunning web applications to intelligent SaaS platforms — we code the future.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <a
              href="#work"
              style={{
                padding: "0.9rem 2.5rem",
                borderRadius: 50,
                background: "var(--nc-gradient-main)",
                backgroundSize: "200% 100%",
                animation: "gradient-shift 3s ease-in-out infinite",
                color: "#fff",
                fontSize: "0.95rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 40px rgba(224, 120, 48, 0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              See Our Work
            </a>
            <a
              href="#contact"
              style={{
                padding: "0.9rem 2.5rem",
                borderRadius: 50,
                background: "transparent",
                border: "1px solid var(--nc-glass-border)",
                color: "var(--nc-text)",
                fontSize: "0.95rem",
                fontWeight: 500,
                letterSpacing: "0.04em",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(224, 120, 48, 0.5)";
                e.currentTarget.style.background = "rgba(224, 120, 48, 0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              Contact Us
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            style={{
              marginTop: "4rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <span
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--nc-text-dim)",
              }}
            >
              Scroll down
            </span>
            <motion.div
              style={{
                width: 20,
                height: 32,
                borderRadius: 10,
                border: "1px solid var(--nc-glass-border)",
                display: "flex",
                justifyContent: "center",
                paddingTop: 6,
              }}
              animate={{ y: [0, 4, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
            >
              <div
                style={{
                  width: 3,
                  height: 8,
                  borderRadius: 3,
                  background: "var(--nc-gradient-main)",
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <Section>
        <div
          style={{
            maxWidth: "var(--nc-max-width)",
            margin: "0 auto",
            padding: "3rem 2rem",
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
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div
                className="gradient-text"
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 800,
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "var(--nc-text-muted)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ═══ SERVICES ═══ */}
      <Section id="services">
        <div
          style={{
            maxWidth: "var(--nc-max-width)",
            margin: "0 auto",
            padding: "var(--nc-section-gap) 2rem",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--nc-orange)",
                fontWeight: 600,
              }}
            >
              What We Do
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                marginTop: "1rem",
              }}
            >
              Crafting{" "}
              <span className="gradient-text">Digital Excellence</span>
            </h2>
            <p
              style={{
                color: "var(--nc-text-muted)",
                maxWidth: 550,
                margin: "1rem auto 0",
                fontSize: "1.05rem",
              }}
            >
              End-to-end development with obsessive attention to detail,
              performance, and user experience.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                style={{
                  background: "var(--nc-glass)",
                  border: "1px solid var(--nc-glass-border)",
                  borderRadius: "var(--nc-border-radius)",
                  padding: "2rem",
                  transition: "all 0.4s ease",
                  cursor: "default",
                  position: "relative",
                  overflow: "hidden",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{
                  borderColor: "rgba(224, 120, 48, 0.3)",
                  background: "rgba(255, 255, 255, 0.06)",
                  y: -4,
                }}
              >
                {/* Gradient dot top-right */}
                <div
                  style={{
                    position: "absolute",
                    top: -40,
                    right: -40,
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    background:
                      i % 2 === 0
                        ? "radial-gradient(circle, rgba(224, 120, 48, 0.08) 0%, transparent 70%)"
                        : "radial-gradient(circle, rgba(107, 66, 201, 0.08) 0%, transparent 70%)",
                  }}
                />
                <div
                  style={{
                    fontSize: "2rem",
                    marginBottom: "1rem",
                    position: "relative",
                  }}
                >
                  {s.icon}
                </div>
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    marginBottom: "0.75rem",
                    position: "relative",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    color: "var(--nc-text-muted)",
                    fontSize: "0.92rem",
                    lineHeight: 1.7,
                    position: "relative",
                  }}
                >
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ TECH STACK ═══ */}
      <Section>
        <div
          style={{
            maxWidth: "var(--nc-max-width)",
            margin: "0 auto",
            padding: "0 2rem 4rem",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--nc-purple-light)",
              fontWeight: 600,
            }}
          >
            Tech Stack
          </span>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
              margin: "1rem 0 2.5rem",
            }}
          >
            Built with <span className="gradient-text">Modern Technology</span>
          </h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0.75rem",
            }}
          >
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
                  transition: "all 0.3s",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                whileHover={{
                  borderColor: "rgba(224, 120, 48, 0.4)",
                  color: "#e8e6f0",
                  background: "rgba(224, 120, 48, 0.08)",
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
        <div
          style={{
            maxWidth: "var(--nc-max-width)",
            margin: "0 auto",
            padding: "var(--nc-section-gap) 2rem",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--nc-orange)",
                fontWeight: 600,
              }}
            >
              Case Study
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                marginTop: "1rem",
              }}
            >
              Our <span className="gradient-text">Flagship Product</span>
            </h2>
          </div>

          {/* Case study card */}
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
          >
            {/* Background glow */}
            <div
              style={{
                position: "absolute",
                width: 400,
                height: 400,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(224, 120, 48, 0.08) 0%, transparent 70%)",
                top: -100,
                right: -100,
              }}
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "3rem",
                alignItems: "center",
              }}
            >
              <div>
                <div
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
                >
                  🦷 Healthcare · SaaS
                </div>
                <h3
                  style={{
                    fontSize: "2rem",
                    fontWeight: 800,
                    marginBottom: "1rem",
                    lineHeight: 1.2,
                  }}
                >
                  Dental Clinic{" "}
                  <span className="gradient-text">Management Platform</span>
                </h3>
                <p
                  style={{
                    color: "var(--nc-text-muted)",
                    fontSize: "1rem",
                    lineHeight: 1.8,
                    marginBottom: "2rem",
                  }}
                >
                  A comprehensive all-in-one platform for modern dental clinics.
                  From patient booking and consent signing to AI-powered email
                  drafting and social media automation — we built the complete
                  digital infrastructure.
                </p>
                {/* Feature pills */}
                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
                >
                  {[
                    "Online Booking",
                    "Patient Portal",
                    "AI Assistant",
                    "SMS Automation",
                    "E-Commerce",
                    "Push Notifications",
                    "Social Media AI",
                    "Consent PDF Signing",
                  ].map((f) => (
                    <span
                      key={f}
                      style={{
                        padding: "0.35rem 0.85rem",
                        borderRadius: 50,
                        background: "var(--nc-glass)",
                        border: "1px solid var(--nc-glass-border)",
                        fontSize: "0.75rem",
                        color: "var(--nc-text-muted)",
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats column */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1.5rem",
                }}
              >
                {[
                  { val: "85+", label: "API Endpoints", icon: "⚡" },
                  { val: "16", label: "Service Integrations", icon: "🔗" },
                  { val: "17", label: "Automated Crons", icon: "⏰" },
                  { val: "39+", label: "Database Tables", icon: "🗄️" },
                  { val: "PWA", label: "Native-Like App", icon: "📱" },
                  { val: "AI", label: "GPT-4o Powered", icon: "🤖" },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      background: "var(--nc-glass)",
                      border: "1px solid var(--nc-glass-border)",
                      borderRadius: 12,
                      padding: "1.25rem",
                      textAlign: "center",
                      transition: "border-color 0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(224, 120, 48, 0.3)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(255, 255, 255, 0.08)")
                    }
                  >
                    <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                      {item.icon}
                    </div>
                    <div
                      className="gradient-text"
                      style={{
                        fontSize: "1.8rem",
                        fontWeight: 800,
                        lineHeight: 1,
                      }}
                    >
                      {item.val}
                    </div>
                    <div
                      style={{
                        fontSize: "0.7rem",
                        color: "var(--nc-text-muted)",
                        marginTop: "0.35rem",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ═══ CONTACT ═══ */}
      <Section id="contact">
        <div
          style={{
            maxWidth: "var(--nc-max-width)",
            margin: "0 auto",
            padding: "var(--nc-section-gap) 2rem",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--nc-purple-light)",
              fontWeight: 600,
            }}
          >
            Let&apos;s Talk
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          >
            Ready to Build{" "}
            <span className="gradient-text">Something Extraordinary</span>?
          </h2>
          <p
            style={{
              color: "var(--nc-text-muted)",
              maxWidth: 550,
              margin: "0 auto 3rem",
              fontSize: "1.05rem",
            }}
          >
            Whether you need a complete platform or a single brilliant feature —
            we&apos;re here to make it happen.
          </p>

          <motion.a
            href="mailto:hello@novikcode.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "1rem 3rem",
              borderRadius: 50,
              background: "var(--nc-gradient-main)",
              backgroundSize: "200% 100%",
              animation: "gradient-shift 3s ease-in-out infinite",
              color: "#fff",
              fontSize: "1.1rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            whileHover={{
              scale: 1.04,
              boxShadow: "0 16px 50px rgba(224, 120, 48, 0.35)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            ✉️ hello@novikcode.com
          </motion.a>

          <p
            style={{
              marginTop: "2rem",
              fontSize: "0.82rem",
              color: "var(--nc-text-dim)",
            }}
          >
            Opole, Poland · Available Worldwide
          </p>
        </div>
      </Section>

      {/* ═══ FOOTER ═══ */}
      <footer
        style={{
          borderTop: "1px solid var(--nc-glass-border)",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            marginBottom: "1rem",
          }}
        >
          <Image src="/logo.png" alt="Novik Code" width={28} height={28} style={{ borderRadius: 6 }} />
          <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>
            <span className="gradient-text">Novik</span>Code
          </span>
        </div>
        <p
          style={{
            fontSize: "0.72rem",
            color: "var(--nc-text-dim)",
            letterSpacing: "0.1em",
          }}
        >
          © {new Date().getFullYear()} Novik Code. Design · Development ·
          Innovation
        </p>
      </footer>
    </div>
  );
}
