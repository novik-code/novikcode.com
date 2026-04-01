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

    // 1. Upsert lead into Supabase
    const { data: lead, error: dbError } = await supabaseAdmin.from("densflow_leads").upsert(
      {
        email: email.toLowerCase().trim(),
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

    // 2. Determine base URL for callbacks
    const host = req.headers.get("host") || "www.novikcode.com";
    const protocol = host.includes("localhost") ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;

    // 3. Create order in DB
    const extOrderId = `DF-${Date.now()}-${randomUUID().slice(0, 8)}`;
    const buyerName = `${first_name.trim()} ${last_name.trim()}`;

    const { error: orderError } = await supabaseAdmin.from("densflow_orders").insert({
      lead_id: lead?.id || null,
      ext_order_id: extOrderId,
      status: "pending",
      amount: LICENSE_AMOUNT,
      buyer_email: email.toLowerCase().trim(),
      buyer_name: buyerName,
      buyer_phone: cleanPhone,
    });

    if (orderError) {
      console.error("[DensFlow Lead] Order create error:", orderError);
      return NextResponse.json({ error: "Błąd tworzenia zamówienia." }, { status: 500 });
    }

    // 4. Create PayU order
    let payuRedirectUrl: string;
    try {
      const result = await createPayUOrder({
        orderId: extOrderId,
        description: "DensFlow.Ai — Licencja Dożywotnia",
        amount: LICENSE_AMOUNT,
        buyerEmail: email.toLowerCase().trim(),
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

      console.log(`[DensFlow Lead] PayU order created: ${extOrderId} → ${result.orderId}`);
    } catch (payuErr: any) {
      console.error("[DensFlow Lead] PayU error:", payuErr.message);

      // Update order to failed state
      await supabaseAdmin.from("densflow_orders").update({
        status: "cancelled",
        payu_status: "CREATE_ERROR",
        payu_payload: { error: payuErr.message },
        updated_at: new Date().toISOString(),
      }).eq("ext_order_id", extOrderId);

      return NextResponse.json({ error: "Błąd połączenia z systemem płatności. Spróbuj ponownie." }, { status: 500 });
    }

    // 5. Notify admin about new lead + purchase attempt
    try {
      const now = new Date().toLocaleString("pl-PL", { timeZone: "Europe/Warsaw" });
      await resend.emails.send({
        from: FROM_ADDRESS,
        to: [ADMIN_EMAIL],
        subject: `🛒 Nowe zamówienie DensFlow — ${buyerName}`,
        html: makeDensFlowEmail(`
          <h2 style="color: #0066FF; margin: 0 0 1rem; font-size: 1.3rem;">
            🛒 Nowe zamówienie w trakcie płatności
          </h2>
          <div style="background: rgba(0, 102, 255, 0.08); border: 1px solid rgba(0, 102, 255, 0.2); border-radius: 12px; padding: 1.5rem; margin: 1rem 0;">
            <p style="margin: 0 0 0.4rem;"><strong>👤 Kupujący:</strong> ${buyerName}</p>
            <p style="margin: 0 0 0.4rem;"><strong>📧 Email:</strong> ${email}</p>
            <p style="margin: 0 0 0.4rem;"><strong>📱 Telefon:</strong> ${cleanPhone}</p>
            <p style="margin: 0;"><strong>📋 Zamówienie:</strong> ${extOrderId}</p>
          </div>
          <p style="margin: 1rem 0 0; font-size: 0.85rem; color: rgba(255,255,255,0.5);">
            Data: ${now} · Status: Przekierowano do PayU
          </p>
        `),
      });
    } catch {
      // Non-critical
    }

    return NextResponse.json({
      success: true,
      payuRedirectUrl,
      orderId: extOrderId,
    });
  } catch (err: any) {
    console.error("[DensFlow Lead] Error:", err);
    return NextResponse.json({ error: "Wystąpił błąd. Spróbuj ponownie." }, { status: 500 });
  }
}
