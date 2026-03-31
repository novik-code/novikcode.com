import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM_ADDRESS = "DensFlow.Ai <gabinet@mikrostomart.pl>";
const ADMIN_EMAIL = "marcin@nowosielski.pl";

/* ─── DensFlow.Ai branded email template ─── */
function makeDensFlowEmail(bodyContent: string): string {
  return `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #06060a; color: #e0e0e0; padding: 0; border-radius: 12px; overflow: hidden;">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #0066FF 0%, #00CCFF 100%); padding: 2rem; text-align: center;">
      <h1 style="margin: 0; color: #fff; font-size: 1.6rem; font-weight: 800; letter-spacing: 0.02em;">
        DensFlow<span style="color: rgba(255,255,255,0.85); font-weight: 300;">.Ai</span>
      </h1>
      <p style="margin: 0.3rem 0 0; color: rgba(255,255,255,0.7); font-size: 0.85rem;">
        Cyfrowy Gabinet Stomatologiczny
      </p>
    </div>
    
    <!-- Body -->
    <div style="padding: 2rem;">
      ${bodyContent}
    </div>
    
    <!-- Footer -->
    <div style="padding: 1.5rem 2rem; background: rgba(0,0,0,0.3); text-align: center; font-size: 0.72rem; color: rgba(255,255,255,0.35); line-height: 1.6;">
      <p style="margin: 0;">ELMAR Sp. z o.o. · NIP: 7542680826 · Opole, Polska</p>
      <p style="margin: 0.25rem 0 0;">
        📞 790 740 770 · 
        <a href="mailto:marcin@nowosielski.pl" style="color: #0066FF; text-decoration: none;">marcin@nowosielski.pl</a> · 
        <a href="https://novikcode.com/densflow" style="color: #0066FF; text-decoration: none;">novikcode.com/densflow</a>
      </p>
      <p style="margin: 0.5rem 0 0; font-size: 0.65rem; color: rgba(255,255,255,0.2);">
        Otrzymujesz tę wiadomość, ponieważ zapisałeś/aś się na listę zainteresowanych DensFlow.Ai.
        Aby zrezygnować, odpowiedz na tę wiadomość z tematem "REZYGNUJĘ".
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

    // Upsert into Supabase
    const { error: dbError } = await supabaseAdmin.from("densflow_leads").upsert(
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
    );

    if (dbError) {
      console.error("[DensFlow Lead] DB error:", dbError);
      return NextResponse.json({ error: "Błąd zapisu danych. Spróbuj ponownie." }, { status: 500 });
    }

    // Send confirmation email
    const emailHtml = makeDensFlowEmail(`
      <h2 style="color: #0066FF; margin: 0 0 1rem; font-size: 1.3rem;">
        🎉 Dziękujemy za zainteresowanie, ${first_name}!
      </h2>
      
      <p style="margin: 0 0 1rem; line-height: 1.7;">
        Twoje zgłoszenie zostało przyjęte. Jesteś teraz na liście osób zainteresowanych
        <strong style="color: #fff;">licencją dożywotnią DensFlow.Ai</strong>.
      </p>
      
      <div style="background: rgba(0, 102, 255, 0.08); border: 1px solid rgba(0, 102, 255, 0.2); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;">
        <h3 style="margin: 0 0 0.75rem; color: #fff; font-size: 1.1rem;">📋 Twoje dane:</h3>
        <p style="margin: 0 0 0.4rem;"><strong>👤 Imię i nazwisko:</strong> ${first_name} ${last_name}</p>
        <p style="margin: 0 0 0.4rem;"><strong>📧 Email:</strong> ${email}</p>
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
          <li>🧪 Bezpłatne demo do przetestowania przed zakupem</li>
        </ul>
        <p style="margin: 0; font-size: 0.8rem; color: #ff6b6b; font-weight: 600;">
          ⏰ Oferta ważna do 1 września 2026. Po tej dacie — tylko subskrypcja od 599 PLN/mies.
        </p>
      </div>
      
      <div style="text-align: center; margin: 2rem 0 1rem;">
        <p style="margin: 0 0 1rem; color: rgba(255,255,255,0.6); font-size: 0.9rem;">
          Wkrótce skontaktujemy się z Tobą w sprawie szczegółów zakupu licencji.
        </p>
        <a href="https://novikcode.com/densflow" 
           style="display: inline-block; padding: 0.85rem 2.5rem; background: linear-gradient(135deg, #0066FF, #00CCFF); color: #fff; text-decoration: none; border-radius: 50px; font-weight: 700; font-size: 0.95rem;">
           🦷 Zobacz DensFlow.Ai →
        </a>
      </div>
      
      <p style="margin-top: 1.5rem; font-size: 0.8rem; color: rgba(255,255,255,0.35); line-height: 1.6;">
        Masz pytania? Odpisz na tę wiadomość lub zadzwoń: <a href="tel:+48790740770" style="color: #0066FF;">790 740 770</a>.
      </p>
    `);

    try {
      await resend.emails.send({
        from: FROM_ADDRESS,
        to: [email],
        subject: "🎉 Witaj w przedsprzedaży DensFlow.Ai — Licencja Dożywotnia",
        html: emailHtml,
      });
      console.log(`[DensFlow Lead] Confirmation email sent to ${email}`);
    } catch (emailErr: any) {
      console.error("[DensFlow Lead] Email error:", emailErr);
      // Don't fail the whole request if email fails
    }

    // Notify admin about the full lead
    try {
      const now = new Date().toLocaleString("pl-PL", { timeZone: "Europe/Warsaw" });
      await resend.emails.send({
        from: FROM_ADDRESS,
        to: [ADMIN_EMAIL],
        subject: `🎉 Pełny zapis DensFlow — ${first_name} ${last_name}`,
        html: makeDensFlowEmail(`
          <h2 style="color: #22c55e; margin: 0 0 1rem; font-size: 1.3rem;">
            🎉 Nowy pełny zapis do przedsprzedaży!
          </h2>
          <div style="background: rgba(0, 102, 255, 0.08); border: 1px solid rgba(0, 102, 255, 0.2); border-radius: 12px; padding: 1.5rem; margin: 1rem 0;">
            <p style="margin: 0 0 0.4rem;"><strong>👤 Imię i nazwisko:</strong> ${first_name} ${last_name}</p>
            <p style="margin: 0 0 0.4rem;"><strong>📧 Email:</strong> ${email}</p>
            <p style="margin: 0 0 0.4rem;"><strong>📱 Telefon:</strong> ${cleanPhone}</p>
            <p style="margin: 0 0 0.4rem;"><strong>✅ Zgoda RODO:</strong> Tak</p>
            <p style="margin: 0;"><strong>📢 Zgoda marketing:</strong> ${marketing_consent ? 'Tak' : 'Nie'}</p>
          </div>
          <p style="margin: 1rem 0 0; font-size: 0.85rem; color: rgba(255,255,255,0.5);">
            Data zapisu: ${now}<br/>
            Źródło: densflow-landing (pełny formularz)
          </p>
          <p style="margin: 1rem 0 0; font-size: 0.9rem; color: #fff; font-weight: 600;">
            💰 Ta osoba jest gotowa do kontaktu w sprawie licencji dożywotniej!
          </p>
        `),
      });
      console.log(`[DensFlow Lead] Admin notification sent to ${ADMIN_EMAIL}`);
    } catch (adminErr: any) {
      console.error("[DensFlow Lead] Admin email error:", adminErr);
    }

    return NextResponse.json({ success: true, message: "Dziękujemy! Sprawdź swoją skrzynkę email." });
  } catch (err: any) {
    console.error("[DensFlow Lead] Error:", err);
    return NextResponse.json({ error: "Wystąpił błąd. Spróbuj ponownie." }, { status: 500 });
  }
}
