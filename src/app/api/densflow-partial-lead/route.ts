import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM_ADDRESS = "DensFlow.Ai <noreply@mikrostomart.pl>";
const ADMIN_EMAIL = "marcin@nowosielski.pl";

/**
 * POST /api/densflow-partial-lead
 * Saves a partial lead (email only) from the landing page CTA.
 * Sends admin notification so no lead is ever lost.
 */
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Nieprawidłowy email" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Upsert — only insert if this email doesn't exist yet (don't overwrite full leads)
    const { error: dbError } = await supabaseAdmin.from("densflow_leads").upsert(
      {
        email: normalizedEmail,
        source: "densflow-landing-partial",
        status: "partial",
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "email",
        // Don't overwrite first_name/last_name/phone if they already exist
        ignoreDuplicates: true,
      }
    );

    if (dbError) {
      console.error("[Partial Lead] DB error:", dbError);
      // Don't fail — the email might already exist as a full lead, which is fine
    }

    // Notify admin
    try {
      const now = new Date().toLocaleString("pl-PL", { timeZone: "Europe/Warsaw" });
      await resend.emails.send({
        from: FROM_ADDRESS,
        to: [ADMIN_EMAIL],
        subject: `🔔 Nowy lead DensFlow — ${normalizedEmail}`,
        html: `
          <div style="font-family: 'Segoe UI', sans-serif; max-width: 500px; margin: 0 auto; background: #0a0a12; color: #e0e0e0; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #0066FF, #00CCFF); padding: 1.5rem; text-align: center;">
              <h2 style="margin: 0; color: #fff; font-size: 1.2rem;">🔔 Nowy Lead — Landing Page</h2>
            </div>
            <div style="padding: 1.5rem;">
              <p style="margin: 0 0 1rem;">Ktoś podał swój email na stronie <strong>novikcode.com/densflow</strong>:</p>
              <div style="background: rgba(0,102,255,0.1); border: 1px solid rgba(0,102,255,0.25); border-radius: 10px; padding: 1rem; text-align: center;">
                <p style="margin: 0; font-size: 1.2rem; font-weight: 700; color: #fff;">📧 ${normalizedEmail}</p>
              </div>
              <p style="margin: 1rem 0 0; font-size: 0.8rem; color: rgba(255,255,255,0.4);">
                Status: częściowy lead (sam email, bez formularza)<br/>
                Data: ${now}
              </p>
              <p style="margin: 1rem 0 0; font-size: 0.8rem; color: rgba(255,255,255,0.5);">
                Jeśli ta osoba wypełni pełny formularz, dostaniesz osobne powiadomienie z pełnymi danymi.
              </p>
            </div>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("[Partial Lead] Admin email error:", emailErr);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Partial Lead] Error:", err);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
