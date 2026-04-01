import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";
import { createPayUOrder } from "@/lib/payuService";
import { Resend } from "resend";
import { randomUUID } from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM_ADDRESS = "DensFlow.Ai <gabinet@mikrostomart.pl>";
const ADMIN_EMAIL = "marcin@nowosielski.pl";

const LICENSE_AMOUNT = 999900; // 9999.00 PLN in grosze

/* ─── DensFlow.Ai branded email template ─── */
function makeDensFlowEmail(bodyContent: string): string {
  return `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #06060a; color: #e0e0e0; padding: 0; border-radius: 12px; overflow: hidden;">
    <div style="background: linear-gradient(135deg, #0066FF 0%, #00CCFF 100%); padding: 2rem; text-align: center;">
      <h1 style="margin: 0; color: #fff; font-size: 1.6rem; font-weight: 800; letter-spacing: 0.02em;">
        DensFlow<span style="color: rgba(255,255,255,0.85); font-weight: 300;">.Ai</span>
      </h1>
      <p style="margin: 0.3rem 0 0; color: rgba(255,255,255,0.7); font-size: 0.85rem;">
        Cyfrowy Gabinet Stomatologiczny
      </p>
    </div>
    <div style="padding: 2rem;">
      ${bodyContent}
    </div>
    <div style="padding: 1.5rem 2rem; background: rgba(0,0,0,0.3); text-align: center; font-size: 0.72rem; color: rgba(255,255,255,0.35); line-height: 1.6;">
      <p style="margin: 0;">ELMAR Sp. z o.o. · NIP: 7542680826 · Opole, Polska</p>
      <p style="margin: 0.25rem 0 0;">
        📞 790 740 770 · 
        <a href="mailto:marcin@nowosielski.pl" style="color: #0066FF; text-decoration: none;">marcin@nowosielski.pl</a>
      </p>
    </div>
  </div>`;
}

/* ─── POST handler ─── */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, first_name, last_name, phone, rodo_consent, marketing_consent } = body;

    // Validate
    if (!email || !first_name || !last_name || !phone) {
      return NextResponse.json(
        { error: "Wszystkie pola są wymagane (email, imię, nazwisko, telefon)." },
        { status: 400 }
      );
    }

    if (!rodo_consent) {
      return NextResponse.json(
        { error: "Zgoda na przetwarzanie danych osobowych (RODO) jest wymagana." },
        { status: 400 }
      );
    }

    // Email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Nieprawidłowy format adresu email." }, { status: 400 });
    }

    // Phone format (Polish, at least 9 digits)
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");
    if (!/^\+?\d{9,15}$/.test(cleanPhone)) {
      return NextResponse.json({ error: "Nieprawidłowy format numeru telefonu." }, { status: 400 });
    }

    const buyerName = `${first_name.trim()} ${last_name.trim()}`;
    const emailLower = email.toLowerCase().trim();

    // ──────────────────────────────────────────────────────
    // STEP 1: Save lead to Supabase (ALWAYS)
    // ──────────────────────────────────────────────────────
    const { data: lead, error: dbError } = await supabaseAdmin.from("densflow_leads").upsert(
      {
        email: emailLower,
        first_name: first_name.trim(),
        last_name: last_name.trim(),
        phone: cleanPhone,
        rodo_consent,
        marketing_consent: marketing_consent || false,
        source: "densflow-landing",
        status: "new",
        updated_at: new Date().toISOString(),
      },
      { onConflict: "email" }
    ).select().single();

    if (dbError) {
      console.error("[DensFlow Lead] DB error:", dbError);
      return NextResponse.json({ error: "Błąd zapisu danych. Spróbuj ponownie." }, { status: 500 });
    }

    // ──────────────────────────────────────────────────────
    // STEP 2: Send emails (ALWAYS — even if PayU fails)
    // ──────────────────────────────────────────────────────
    // Confirmation email to buyer
    try {
      await resend.emails.send({
        from: FROM_ADDRESS,
        to: [emailLower],
        subject: "🎉 Witaj w przedsprzedaży DensFlow.Ai — Licencja Dożywotnia",
        html: makeDensFlowEmail(`
          <h2 style="color: #0066FF; margin: 0 0 1rem; font-size: 1.3rem;">
            🎉 Dziękujemy za zainteresowanie, ${first_name.trim()}!
          </h2>
          <p style="margin: 0 0 1rem; line-height: 1.7;">
            Twoje zgłoszenie zostało przyjęte. Jesteś teraz na liście osób zainteresowanych
            <strong style="color: #fff;">licencją dożywotnią DensFlow.Ai</strong>.
          </p>
          <div style="background: rgba(0, 102, 255, 0.08); border: 1px solid rgba(0, 102, 255, 0.2); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;">
            <h3 style="margin: 0 0 0.75rem; color: #fff; font-size: 1.1rem;">📋 Twoje dane:</h3>
            <p style="margin: 0 0 0.4rem;"><strong>👤 Imię i nazwisko:</strong> ${buyerName}</p>
            <p style="margin: 0 0 0.4rem;"><strong>📧 Email:</strong> ${emailLower}</p>
            <p style="margin: 0;"><strong>📱 Telefon:</strong> ${cleanPhone}</p>
          </div>
          <div style="background: rgba(0, 102, 255, 0.05); border: 1px solid rgba(0, 102, 255, 0.15); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;">
            <h3 style="margin: 0 0 0.75rem; color: #0066FF; font-size: 1.1rem;">💎 Licencja Dożywotnia — Przedsprzedaż</h3>
            <p style="margin: 0 0 0.5rem; line-height: 1.6;">
              <strong style="color: #fff; font-size: 1.4rem;">9 999 PLN</strong> 
              <span style="color: rgba(255,255,255,0.5);">jednorazowo · na zawsze</span>
            </p>
            <ul style="margin: 0.75rem 0; padding-left: 1.25rem; line-height: 2; color: rgba(255,255,255,0.7);">
              <li>♾️ Dożywotni dostęp do wszystkich obecnych i przyszłych funkcji</li>
              <li>🚀 Strona WWW, portal pacjenta, AI asystent, social media automation</li>
              <li>💡 Współtworzenie produktu — Twój głos kształtuje roadmapę</li>
              <li>🧪 Beta dostęp do nowych funkcji</li>
            </ul>
            <p style="margin: 0; font-size: 0.8rem; color: #ff6b6b; font-weight: 600;">
              ⏰ Oferta ważna do 1 września 2026. Po tej dacie — tylko subskrypcja od 599 PLN/mies.
            </p>
          </div>
          <p style="margin-top: 1.5rem; font-size: 0.8rem; color: rgba(255,255,255,0.35); line-height: 1.6;">
            Masz pytania? Odpisz na tę wiadomość lub zadzwoń: <a href="tel:+48790740770" style="color: #0066FF;">790 740 770</a>.
          </p>
        `),
      });
      console.log(`[DensFlow Lead] Confirmation email sent to ${emailLower}`);
    } catch (emailErr: any) {
      console.error("[DensFlow Lead] Email error:", emailErr.message);
    }

    // Admin notification
    try {
      const now = new Date().toLocaleString("pl-PL", { timeZone: "Europe/Warsaw" });
      await resend.emails.send({
        from: FROM_ADDRESS,
        to: [ADMIN_EMAIL],
        subject: `🛒 Nowe zamówienie DensFlow — ${buyerName}`,
        html: makeDensFlowEmail(`
          <h2 style="color: #0066FF; margin: 0 0 1rem; font-size: 1.3rem;">
            🛒 Nowy zapis do przedsprzedaży + próba płatności
          </h2>
          <div style="background: rgba(0, 102, 255, 0.08); border: 1px solid rgba(0, 102, 255, 0.2); border-radius: 12px; padding: 1.5rem; margin: 1rem 0;">
            <p style="margin: 0 0 0.4rem;"><strong>👤 Kupujący:</strong> ${buyerName}</p>
            <p style="margin: 0 0 0.4rem;"><strong>📧 Email:</strong> ${emailLower}</p>
            <p style="margin: 0 0 0.4rem;"><strong>📱 Telefon:</strong> ${cleanPhone}</p>
            <p style="margin: 0 0 0.4rem;"><strong>✅ Zgoda RODO:</strong> Tak</p>
            <p style="margin: 0;"><strong>📢 Zgoda marketing:</strong> ${marketing_consent ? 'Tak' : 'Nie'}</p>
          </div>
          <p style="margin: 1rem 0 0; font-size: 0.85rem; color: rgba(255,255,255,0.5);">
            Data: ${now} · Źródło: densflow-landing
          </p>
        `),
      });
    } catch {
      // Non-critical
    }

    // ──────────────────────────────────────────────────────
    // STEP 3: Try PayU order (GRACEFUL — if fails, still succeed)
    // ──────────────────────────────────────────────────────
    let payuRedirectUrl: string | null = null;
    let payuError: string | null = null;

    try {
      const host = req.headers.get("host") || "www.novikcode.com";
      const protocol = host.includes("localhost") ? "http" : "https";
      const baseUrl = `${protocol}://${host}`;

      const extOrderId = `DF-${Date.now()}-${randomUUID().slice(0, 8)}`;

      // Create order in DB
      await supabaseAdmin.from("densflow_orders").insert({
        lead_id: lead?.id || null,
        ext_order_id: extOrderId,
        status: "pending",
        amount: LICENSE_AMOUNT,
        buyer_email: emailLower,
        buyer_name: buyerName,
        buyer_phone: cleanPhone,
      });

      // Create PayU order
      const result = await createPayUOrder({
        orderId: extOrderId,
        description: "DensFlow.Ai — Licencja Dożywotnia",
        amount: LICENSE_AMOUNT,
        buyerEmail: emailLower,
        buyerFirstName: first_name.trim(),
        buyerLastName: last_name.trim(),
        buyerPhone: cleanPhone,
        continueUrl: `${baseUrl}/densflow/platnosc-sukces?order=${extOrderId}`,
        notifyUrl: `${baseUrl}/api/densflow-payu-webhook`,
      });

      payuRedirectUrl = result.redirectUri;

      // Update order with PayU order ID
      await supabaseAdmin.from("densflow_orders").update({
        payu_order_id: result.orderId,
        updated_at: new Date().toISOString(),
      }).eq("ext_order_id", extOrderId);

      console.log(`[DensFlow Lead] PayU order created: ${extOrderId} → redirect OK`);
    } catch (payuErr: any) {
      // PayU failed — but email was already sent, lead already saved
      console.error("[DensFlow Lead] PayU error (non-blocking):", payuErr.message);
      payuError = payuErr.message;
    }

    // Return success — with or without PayU redirect
    return NextResponse.json({
      success: true,
      payuRedirectUrl, // null if PayU failed — frontend handles gracefully
      payuError: payuError || null, // null if PayU succeeded
      message: "Dziękujemy! Sprawdź swoją skrzynkę email.",
    });
  } catch (err: any) {
    console.error("[DensFlow Lead] Error:", err);
    return NextResponse.json({ error: "Wystąpił błąd. Spróbuj ponownie." }, { status: 500 });
  }
}
