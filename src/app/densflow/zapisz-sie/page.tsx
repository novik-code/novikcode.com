"use client";

import { motion } from "framer-motion";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

/* ─── Inner form component (needs Suspense because of useSearchParams) ─── */
function ZapiszSieForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [rodoConsent, setRodoConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) setEmail(emailParam);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/densflow-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          phone: phone.trim(),
          rodo_consent: rodoConsent,
          marketing_consent: marketingConsent,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Wystąpił błąd. Spróbuj ponownie.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMsg("Błąd połączenia. Sprawdź internet i spróbuj ponownie.");
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "0.85rem 1.25rem", borderRadius: 12,
    background: "rgba(0, 102, 255, 0.04)", border: "1px solid rgba(0, 102, 255, 0.15)",
    color: "#e8e6f0", fontSize: "0.95rem", outline: "none",
    fontFamily: "'Inter', sans-serif",
    transition: "border-color 0.3s",
  };

  return (
    <div style={{
      minHeight: "100vh", background: "var(--nc-bg, #06060a)", color: "#e8e6f0",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      display: "flex", flexDirection: "column",
    }}>
      <style>{`
        .df-input:focus { border-color: #0066FF !important; box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1); }
        .df-input::placeholder { color: rgba(232,230,240,0.3); }
      `}</style>

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
        <Link href="/densflow" style={{ fontSize: "0.8rem", color: "rgba(232,230,240,0.4)", textDecoration: "none" }}>
          ← Wróć do strony
        </Link>
      </nav>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: 520, width: "100%" }}
        >
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              style={{
                background: "rgba(0, 102, 255, 0.04)", border: "1px solid rgba(0, 102, 255, 0.15)",
                borderRadius: 24, padding: "3rem 2.5rem", textAlign: "center",
              }}
            >
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎉</div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.75rem", color: "#0066FF" }}>
                Dziękujemy, {firstName}!
              </h2>
              <p style={{ fontSize: "0.95rem", color: "rgba(232,230,240,0.6)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                Twoje zgłoszenie zostało przyjęte. Sprawdź swoją skrzynkę email
                <strong style={{ color: "#e8e6f0" }}> ({email}) </strong>
                — wysłaliśmy potwierdzenie z informacjami o przedsprzedaży.
              </p>
              <div style={{
                background: "rgba(130, 255, 160, 0.06)", border: "1px solid rgba(130, 255, 160, 0.15)",
                borderRadius: 14, padding: "1.25rem", marginBottom: "2rem",
              }}>
                <p style={{ fontSize: "0.85rem", color: "rgba(130, 255, 160, 0.8)", margin: 0 }}>
                  ✅ Wkrótce skontaktujemy się z Tobą w sprawie zakupu licencji dożywotniej.
                </p>
              </div>
              <Link href="/densflow"
                style={{
                  display: "inline-block", padding: "0.85rem 2rem", borderRadius: 50,
                  background: "linear-gradient(135deg, #0066FF, #00CCFF)", color: "#fff",
                  textDecoration: "none", fontWeight: 700, fontSize: "0.9rem",
                }}
              >
                ← Wróć do DensFlow.Ai
              </Link>
            </motion.div>
          ) : (
            <>
              <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <h1 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, marginBottom: "0.5rem" }}>
                  Dołącz do <span style={{ color: "#0066FF" }}>Przedsprzedaży</span>
                </h1>
                <p style={{ fontSize: "0.9rem", color: "rgba(232,230,240,0.5)", lineHeight: 1.6 }}>
                  Zapisz się i jako pierwszy/a otrzymaj możliwość zakupu<br />
                  licencji dożywotniej za <strong style={{ color: "#e8e6f0" }}>9 999 PLN</strong>.
                </p>
                <p style={{ fontSize: "0.75rem", color: "#ff6b6b", fontWeight: 600, marginTop: "0.5rem" }}>
                  ⏰ Oferta kończy się 1 września 2026. Potem tylko subskrypcja od 599 PLN/mies.
                </p>
              </div>

              <form onSubmit={handleSubmit} style={{
                background: "rgba(0, 102, 255, 0.03)", border: "1px solid rgba(0, 102, 255, 0.1)",
                borderRadius: 20, padding: "2rem",
              }}>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "rgba(232,230,240,0.5)", display: "block", marginBottom: "0.4rem" }}>
                    Adres email *
                  </label>
                  <input className="df-input" type="email" placeholder="twoj@email.pl" required
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                  <div>
                    <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "rgba(232,230,240,0.5)", display: "block", marginBottom: "0.4rem" }}>
                      Imię *
                    </label>
                    <input className="df-input" type="text" placeholder="Jan" required
                      value={firstName} onChange={(e) => setFirstName(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "rgba(232,230,240,0.5)", display: "block", marginBottom: "0.4rem" }}>
                      Nazwisko *
                    </label>
                    <input className="df-input" type="text" placeholder="Kowalski" required
                      value={lastName} onChange={(e) => setLastName(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "rgba(232,230,240,0.5)", display: "block", marginBottom: "0.4rem" }}>
                    Numer telefonu *
                  </label>
                  <input className="df-input" type="tel" placeholder="+48 790 740 770" required
                    value={phone} onChange={(e) => setPhone(e.target.value)}
                    style={inputStyle}
                  />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", cursor: "pointer" }}>
                    <input type="checkbox" required checked={rodoConsent}
                      onChange={(e) => setRodoConsent(e.target.checked)}
                      style={{ marginTop: "0.2rem", accentColor: "#0066FF", width: 18, height: 18 }}
                    />
                    <span style={{ fontSize: "0.78rem", color: "rgba(232,230,240,0.5)", lineHeight: 1.5 }}>
                      Wyrażam zgodę na przetwarzanie moich danych osobowych przez ELMAR Sp. z o.o. w celu realizacji
                      przedsprzedaży i obsługi zamówienia, zgodnie z{" "}
                      <a href="/densflow/polityka-prywatnosci" target="_blank" style={{ color: "#0066FF", textDecoration: "underline" }}>
                        Polityką Prywatności
                      </a>. *
                    </span>
                  </label>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", cursor: "pointer" }}>
                    <input type="checkbox" checked={marketingConsent}
                      onChange={(e) => setMarketingConsent(e.target.checked)}
                      style={{ marginTop: "0.2rem", accentColor: "#0066FF", width: 18, height: 18 }}
                    />
                    <span style={{ fontSize: "0.78rem", color: "rgba(232,230,240,0.5)", lineHeight: 1.5 }}>
                      Wyrażam zgodę na otrzymywanie informacji handlowych i marketingowych od ELMAR Sp. z o.o.
                      na podany adres email (opcjonalne).
                    </span>
                  </label>
                </div>

                {status === "error" && (
                  <div style={{
                    background: "rgba(255, 60, 60, 0.08)", border: "1px solid rgba(255, 60, 60, 0.2)",
                    borderRadius: 12, padding: "0.85rem", marginBottom: "1rem", textAlign: "center",
                  }}>
                    <p style={{ fontSize: "0.85rem", color: "#ff6b6b", margin: 0 }}>⚠️ {errorMsg}</p>
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  style={{
                    width: "100%", padding: "1rem", borderRadius: 14, border: "none",
                    background: status === "loading"
                      ? "rgba(0, 102, 255, 0.3)"
                      : "linear-gradient(135deg, #0066FF 0%, #00CCFF 100%)",
                    color: "#fff", fontSize: "1rem", fontWeight: 700, cursor: status === "loading" ? "wait" : "pointer",
                    opacity: status === "loading" ? 0.7 : 1,
                  }}
                  whileHover={status !== "loading" ? { scale: 1.02, boxShadow: "0 8px 30px rgba(0, 102, 255, 0.25)" } : {}}
                  whileTap={status !== "loading" ? { scale: 0.98 } : {}}
                >
                  {status === "loading" ? "⏳ Wysyłanie..." : "🦷 Zapisz się do przedsprzedaży"}
                </motion.button>

                <p style={{ fontSize: "0.68rem", color: "rgba(232,230,240,0.25)", textAlign: "center", marginTop: "1rem", lineHeight: 1.5 }}>
                  Twoje dane są bezpieczne i przetwarzane zgodnie z RODO.<br />
                  Nie udostępniamy ich podmiotom trzecim.
                </p>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Default export with Suspense boundary (required for useSearchParams in Next.js) ─── */
export default function ZapiszSiePage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#06060a" }} />}>
      <ZapiszSieForm />
    </Suspense>
  );
}
