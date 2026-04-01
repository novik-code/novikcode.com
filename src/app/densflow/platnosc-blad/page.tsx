"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function PlatnoscBladPage() {
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
          style={{ maxWidth: 520, width: "100%", textAlign: "center" }}
        >
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>😔</div>

          <h1 style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontWeight: 800, marginBottom: "0.75rem" }}>
            Płatność <span style={{ color: "#ff6b6b" }}>nie powiodła się</span>
          </h1>

          <p style={{ fontSize: "0.95rem", color: "rgba(232,230,240,0.5)", lineHeight: 1.7, marginBottom: "2rem" }}>
            Nie martw się — Twoje dane zostały zapisane.
            Możesz spróbować ponownie lub skontaktować się z nami.
          </p>

          <div style={{
            background: "rgba(255, 107, 107, 0.06)", border: "1px solid rgba(255, 107, 107, 0.15)",
            borderRadius: 16, padding: "1.25rem", marginBottom: "2rem",
          }}>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "rgba(255, 107, 107, 0.8)", lineHeight: 1.6 }}>
              Możliwe przyczyny: niewystarczające środki, anulowana transakcja, problem z bankiem.
              Jeśli problem się powtarza, zadzwoń: <strong>790 740 770</strong>
            </p>
          </div>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/densflow/zapisz-sie"
              style={{
                display: "inline-block", padding: "0.85rem 2rem", borderRadius: 50,
                background: "linear-gradient(135deg, #0066FF, #00CCFF)", color: "#fff",
                textDecoration: "none", fontWeight: 700, fontSize: "0.9rem",
              }}
            >
              🔄 Spróbuj ponownie
            </Link>
            <Link href="/densflow"
              style={{
                display: "inline-block", padding: "0.85rem 2rem", borderRadius: 50,
                background: "rgba(0, 102, 255, 0.08)", border: "1px solid rgba(0, 102, 255, 0.2)",
                color: "#0066FF", textDecoration: "none", fontWeight: 700, fontSize: "0.9rem",
              }}
            >
              ← Wróć do strony
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
