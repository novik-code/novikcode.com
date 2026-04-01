"use client";

import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order") || "";

  return (
    <div style={{
      minHeight: "100vh", background: "#06060a", color: "#e8e6f0",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      display: "flex", flexDirection: "column",
    }}>
      {/* Nav */}
      <nav style={{
        padding: "0.8rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid rgba(0, 102, 255, 0.08)",
      }}>
        <Link href="/densflow" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
          <Image src="/logo.png" alt="Novik Code" width={28} height={28} style={{ borderRadius: 6 }} />
          <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "#e8e6f0" }}>
            <span style={{ color: "#0066FF" }}>Dens</span>Flow.Ai
          </span>
        </Link>
      </nav>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: 560, width: "100%", textAlign: "center" }}
        >
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            style={{ fontSize: "5rem", marginBottom: "1rem" }}
          >
            🎉
          </motion.div>

          <h1 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, marginBottom: "0.75rem" }}>
            <span style={{ color: "#22c55e" }}>Dziękujemy</span> za zakup!
          </h1>

          <p style={{ fontSize: "1rem", color: "rgba(232,230,240,0.6)", lineHeight: 1.7, marginBottom: "2rem" }}>
            Twoja płatność została przekazana do realizacji.
            Po jej potwierdzeniu wyślemy Ci email z dalszymi instrukcjami.
          </p>

          <div style={{
            background: "rgba(34, 197, 94, 0.06)", border: "1px solid rgba(34, 197, 94, 0.15)",
            borderRadius: 16, padding: "1.5rem", marginBottom: "2rem", textAlign: "left",
          }}>
            <h3 style={{ margin: "0 0 1rem", color: "#22c55e", fontSize: "1rem" }}>✅ Co dalej?</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { emoji: "📧", text: "Otrzymasz email z potwierdzeniem płatności" },
                { emoji: "📞", text: "Skontaktujemy się z Tobą w ciągu 24h" },
                { emoji: "🔧", text: "Przygotujemy indywidualną konfigurację Twojego gabinetu" },
                { emoji: "🚀", text: "Uruchomimy DensFlow.Ai dla Twojej kliniki" },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.15 }}
                  style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
                >
                  <span style={{ fontSize: "1.3rem" }}>{step.emoji}</span>
                  <span style={{ color: "rgba(232,230,240,0.7)", fontSize: "0.9rem" }}>{step.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {orderId && (
            <p style={{ fontSize: "0.75rem", color: "rgba(232,230,240,0.25)", marginBottom: "1.5rem" }}>
              Nr zamówienia: {orderId}
            </p>
          )}

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/densflow"
              style={{
                display: "inline-block", padding: "0.85rem 2rem", borderRadius: 50,
                background: "linear-gradient(135deg, #0066FF, #00CCFF)", color: "#fff",
                textDecoration: "none", fontWeight: 700, fontSize: "0.9rem",
              }}
            >
              ← Wróć do DensFlow.Ai
            </Link>
            <a href="https://demo.densflow.ai"
              style={{
                display: "inline-block", padding: "0.85rem 2rem", borderRadius: 50,
                background: "rgba(0, 102, 255, 0.08)", border: "1px solid rgba(0, 102, 255, 0.2)",
                color: "#0066FF", textDecoration: "none", fontWeight: 700, fontSize: "0.9rem",
              }}
            >
              🧪 Przetestuj Demo
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function PlatnoscSukcesPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#06060a" }} />}>
      <SuccessContent />
    </Suspense>
  );
}
