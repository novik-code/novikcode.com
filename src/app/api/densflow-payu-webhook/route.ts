import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";
import { verifyPayUSignature, getPayUConfig } from "@/lib/payuService";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM_ADDRESS = "DensFlow.Ai <gabinet@mikrostomart.pl>";
const ADMIN_EMAIL = "marcin@nowosielski.pl";

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

/**
 * POST /api/densflow-payu-webhook
 * 
 * PayU sends status change notifications here.
 * Verifies signature, updates order status, sends emails on completion.
 */
export async function POST(req: NextRequest) {
  const bodyText = await req.text();
  const signatureHeader = req.headers.get("openpayu-signature") || "";

  console.log("[DensFlow PayU Webhook] Received notification");

  // Verify signature
  try {
    const config = getPayUConfig();
    if (!verifyPayUSignature(bodyText, signatureHeader, config.secondKey)) {
      console.error("[DensFlow PayU Webhook] Invalid signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  } catch (err: any) {
    console.error("[DensFlow PayU Webhook] Config error:", err.message);
    return NextResponse.json({ error: "Config error" }, { status: 500 });
  }

  try {
    const payload = JSON.parse(bodyText);
    const order = payload.order;

    if (!order) {
      console.error("[DensFlow PayU Webhook] No order in payload");
      return NextResponse.json({ error: "No order data" }, { status: 400 });
    }

    const payuOrderId = order.orderId;
    const payuStatus = order.status; // PENDING, WAITING_FOR_CONFIRMATION, COMPLETED, CANCELED
    const extOrderId = order.extOrderId;

    console.log(`[DensFlow PayU Webhook] Order ${extOrderId} → PayU status: ${payuStatus}`);

    // Map PayU status to our status
    let ourStatus = "pending";
    if (payuStatus === "COMPLETED") ourStatus = "completed";
    else if (payuStatus === "CANCELED") ourStatus = "cancelled";

    // Update order in DB
    const { data: updatedOrder, error: updateError } = await supabaseAdmin
      .from("densflow_orders")
      .update({
        payu_order_id: payuOrderId,
        payu_status: payuStatus,
        payu_payload: payload,
        status: ourStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("ext_order_id", extOrderId)
      .select()
      .single();

    if (updateError) {
      console.error("[DensFlow PayU Webhook] DB update error:", updateError);
      return NextResponse.json({ error: "DB error" }, { status: 500 });
    }

    // On COMPLETED — update lead status + send emails
    if (payuStatus === "COMPLETED" && updatedOrder) {
      console.log(`[DensFlow PayU Webhook] Payment COMPLETED for ${updatedOrder.buyer_email}`);

      // Update lead status
      if (updatedOrder.lead_id) {
        await supabaseAdmin
          .from("densflow_leads")
          .update({ status: "purchased", updated_at: new Date().toISOString() })
          .eq("id", updatedOrder.lead_id);
      }

      // Email to buyer
      try {
        await resend.emails.send({
          from: FROM_ADDRESS,
          to: [updatedOrder.buyer_email],
          subject: "🎉 Zakup potwierdzony — DensFlow.Ai Licencja Dożywotnia",
          html: makeDensFlowEmail(`
            <h2 style="color: #22c55e; margin: 0 0 1rem; font-size: 1.3rem;">
              ✅ Płatność potwierdzona!
            </h2>
            <p style="margin: 0 0 1rem; line-height: 1.7;">
              Dziękujemy za zakup <strong style="color: #fff;">Licencji Dożywotniej DensFlow.Ai</strong>!
            </p>
            <div style="background: rgba(34, 197, 94, 0.08); border: 1px solid rgba(34, 197, 94, 0.2); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;">
              <p style="margin: 0 0 0.4rem;"><strong>📋 Zamówienie:</strong> ${extOrderId}</p>
              <p style="margin: 0 0 0.4rem;"><strong>💰 Kwota:</strong> 9 999,00 PLN</p>
              <p style="margin: 0;"><strong>📧 Kupujący:</strong> ${updatedOrder.buyer_name}</p>
            </div>
            <p style="margin: 1rem 0; line-height: 1.7; color: rgba(255,255,255,0.7);">
              Wkrótce skontaktujemy się z Tobą w celu uruchomienia Twojego gabinetu w systemie DensFlow.Ai.
              Przygotujemy dla Ciebie indywidualną konfigurację.
            </p>
            <p style="margin-top: 1.5rem; font-size: 0.8rem; color: rgba(255,255,255,0.35); line-height: 1.6;">
              Masz pytania? Zadzwoń: <a href="tel:+48790740770" style="color: #0066FF;">790 740 770</a>
            </p>
          `),
        });
      } catch (emailErr: any) {
        console.error("[DensFlow PayU Webhook] Buyer email error:", emailErr.message);
      }

      // Email to admin
      try {
        const now = new Date().toLocaleString("pl-PL", { timeZone: "Europe/Warsaw" });
        await resend.emails.send({
          from: FROM_ADDRESS,
          to: [ADMIN_EMAIL],
          subject: `💰 SPRZEDAŻ! DensFlow Licencja — ${updatedOrder.buyer_name}`,
          html: makeDensFlowEmail(`
            <h2 style="color: #22c55e; margin: 0 0 1rem; font-size: 1.3rem;">
              💰 Nowa sprzedaż licencji dożywotniej!
            </h2>
            <div style="background: rgba(34, 197, 94, 0.08); border: 1px solid rgba(34, 197, 94, 0.2); border-radius: 12px; padding: 1.5rem; margin: 1rem 0;">
              <p style="margin: 0 0 0.4rem;"><strong>👤 Kupujący:</strong> ${updatedOrder.buyer_name}</p>
              <p style="margin: 0 0 0.4rem;"><strong>📧 Email:</strong> ${updatedOrder.buyer_email}</p>
              <p style="margin: 0 0 0.4rem;"><strong>📱 Telefon:</strong> ${updatedOrder.buyer_phone || 'brak'}</p>
              <p style="margin: 0 0 0.4rem;"><strong>💰 Kwota:</strong> 9 999,00 PLN</p>
              <p style="margin: 0;"><strong>📋 Zamówienie:</strong> ${extOrderId}</p>
            </div>
            <p style="margin: 1rem 0 0; font-size: 0.85rem; color: rgba(255,255,255,0.5);">
              Data: ${now}
            </p>
          `),
        });
      } catch (adminErr: any) {
        console.error("[DensFlow PayU Webhook] Admin email error:", adminErr.message);
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (err: any) {
    console.error("[DensFlow PayU Webhook] Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
