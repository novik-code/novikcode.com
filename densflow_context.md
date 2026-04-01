# DensFlow.Ai / NovikCode — Kontekst Projektu

> Last Updated: 2026-04-01

## Przegląd

Projekt `novikcode.com` to strona firmy Novik Code (software house by ELMAR Sp. z o.o.) która hostuje:
- **/** — strona software house NovikCode (portfolio, kontakt)
- **/densflow** — landing page produktu DensFlow.Ai (cyfrowy gabinet stomatologiczny)
- **/rutynka** — landing page aplikacji Rutynka (poranne/wieczorne rutyny dla dzieci)

### Domeny
| Domena | Routing | 
|--------|---------|
| `novikcode.com` | Serwuje normalnie wszystkie routes |
| `densflow.ai` | Middleware rewrite → `/densflow/*` |
| `www.densflow.ai` | Primary, redirect z densflow.ai (307) |

---

## Architektura

### Multi-domain middleware (`src/middleware.ts`)
- Sprawdza `Host` header
- Jeśli `densflow.ai` → rewrite ścieżki: `/` → `/densflow`, `/zapisz-sie` → `/densflow/zapisz-sie` itd.
- Jeśli `novikcode.com` → passthrough

### Stack
- **Framework**: Next.js 16 + React 19 + TypeScript
- **Animacje**: Framer Motion
- **Baza danych**: Supabase (ten sam projekt co mikrostomart: `keucogopujdolzmfajjv`)
- **Email**: Resend (API key, domena: mikrostomart.pl)
- **Płatności**: PayU REST API v2.1 (OAuth2, produkcja)
- **Hosting**: Vercel (team: novik-codes-projects, project: novikcode-com)

---

## Tabele w Supabase

### `densflow_leads`
| Kolumna | Typ | Opis |
|---------|-----|------|
| id | UUID (PK) | auto-generated |
| email | TEXT UNIQUE | email leada |
| first_name | TEXT | imię |
| last_name | TEXT | nazwisko |
| phone | TEXT | telefon |
| rodo_consent | BOOLEAN | zgoda RODO (required) |
| marketing_consent | BOOLEAN | zgoda marketingowa (optional) |
| source | TEXT | default: 'densflow-landing' |
| status | TEXT | new / contacted / purchased |
| created_at | TIMESTAMPTZ | auto |
| updated_at | TIMESTAMPTZ | auto |

### `densflow_orders`
| Kolumna | Typ | Opis |
|---------|-----|------|
| id | UUID (PK) | auto-generated |
| lead_id | UUID (FK → densflow_leads) | powiązany lead |
| payu_order_id | TEXT | ID zamówienia w PayU |
| ext_order_id | TEXT UNIQUE | nasz internal ID (DF-timestamp-uuid) |
| status | TEXT | pending / completed / cancelled / refunded |
| amount | INTEGER | kwota w groszach (999900 = 9999.00 PLN) |
| currency | TEXT | PLN |
| buyer_email | TEXT | email kupującego |
| buyer_name | TEXT | imię i nazwisko |
| buyer_phone | TEXT | telefon |
| payu_status | TEXT | raw status PayU (PENDING/COMPLETED/CANCELED) |
| payu_payload | JSONB | ostatni webhook payload |
| created_at | TIMESTAMPTZ | auto |
| updated_at | TIMESTAMPTZ | auto |

---

## API Routes

### `POST /api/densflow-lead`
- **Input**: `{ email, first_name, last_name, phone, rodo_consent, marketing_consent }`
- **Walidacja**: email format, phone 9+ digits, rodo_consent required
- **Flow (3 kroki)**:
  1. Upsert do `densflow_leads` (zawsze)
  2. Wysyłka emaila potwierdzającego + notyfikacja admina (zawsze)
  3. Tworzenie zamówienia PayU 9 999 PLN → redirect URL (graceful — jeśli PayU padnie, lead i email i tak są zapisane)
- **Response**: `{ success, payuRedirectUrl, payuError, message }`

### `POST /api/densflow-partial-lead`
- **Input**: `{ email }`
- **Akcja**: Fire-and-forget zapis emaila do `densflow_leads` (z landing page CTA)

### `POST /api/densflow-payu-webhook`
- **Input**: PayU webhook notification (JSON body + OpenPayU-Signature header)
- **Weryfikacja**: MD5 signature z second_key
- **Akcje**: Aktualizacja `densflow_orders.status`, aktualizacja `densflow_leads.status = 'purchased'`, email potwierdzenia zakupu do kupującego + notyfikacja admina

---

## Strony

### NovikCode Homepage (`/`)
- Dark mode, glassmorphic cards, animacje framer-motion
- Sekcje: hero, services, products (DensFlow + Rutynka), technologies, contact
- Nawigacja: DensFlow, Rutynka, kontakt

### DensFlow Landing (`/densflow`)
- Dark mode (#06060a), niebieski gradient (#0066FF → #00CCFF)
- Sekcje: hero z countdown, funkcje, plany cenowe (Starter/Pro/Enterprise), problemy, narzędzia unikalne, FAQ, przedsprzedaż CTA
- Countdown do 1 września 2026
- 3 CTA-przyciski (nawigacja, hero, cennik) → wszystkie scrollują do `#zapisz-sie`
- Sekcja `#zapisz-sie`: email input → redirect do `/densflow/zapisz-sie?email=...`

### DensFlow Formularz (`/densflow/zapisz-sie`)
- Pola: email (pre-filled z URL param), imię, nazwisko, telefon
- Checkboxy: RODO (wymagany), marketing (opcjonalny)
- Przycisk: "💳 Zapłać 9 999 PLN"
- Submit → POST `/api/densflow-lead` → redirect do PayU checkout
- Jeśli PayU padnie → potwierdzenie zapisu (lead + email wysłany)

### DensFlow Płatność Sukces (`/densflow/platnosc-sukces`)
- Strona podziękowania po powrocie z PayU
- Animacje (confetti, krokowe instrukcje)
- Info o dalszych krokach (email potwierdzenia, kontakt w 24h, konfiguracja)

### DensFlow Płatność Błąd (`/densflow/platnosc-blad`)
- Strona błędu płatności
- Przycisk "Spróbuj ponownie" → `/densflow/zapisz-sie`

### Rutynka Landing (`/rutynka`)
- Jasny motyw: lavender gradient (#f0edff → #fff0f5 → #e8fff5)
- Font: Nunito (headings), Inter (body)
- Kolory: purple #6C5CE7, pink #E84393, green #00B894
- Sekcje: hero, profile dzieci (symulacja), funkcje, benefits, dla kogo, jak to działa, CTA "wkrótce w sprzedaży"

### Podstrony prawne (`/densflow/regulamin`, `/densflow/polityka-prywatnosci`, `/densflow/polityka-cookies`)
- ELMAR Sp. z o.o. dane rejestrowe
- Dark mode, spójne z DensFlow

---

## Kluczowe pliki

| Plik | Opis |
|------|------|
| `src/middleware.ts` | Multi-domain routing (densflow.ai → /densflow) |
| `src/lib/supabaseClient.ts` | Supabase admin client |
| `src/lib/payuService.ts` | PayU OAuth2, create-order, verify webhook signature |
| `src/app/densflow/page.tsx` | DensFlow landing page (1095 linii) |
| `src/app/densflow/zapisz-sie/page.tsx` | Formularz zapisu + PayU redirect |
| `src/app/api/densflow-lead/route.ts` | API: zapis leada + PayU order |
| `src/app/api/densflow-payu-webhook/route.ts` | Webhook PayU (status updates, emaile) |

---

## PayU Konfiguracja

- **Punkt płatności**: Densflow REST (pos_id: 4426310)
- **Protokół**: REST API (Checkout)
- **Środowisko**: Produkcja (secure.payu.com)
- **Webhook**: Dynamiczny — `notifyUrl` wysyłany w każdym zamówieniu (PayU REST nie ma statycznego pola webhook w panelu)
- **Env vars**: `PAYU_POS_ID`, `PAYU_CLIENT_ID`, `PAYU_CLIENT_SECRET`, `PAYU_SECOND_KEY`, `PAYU_SANDBOX=false`

---

## Przedsprzedaż DensFlow.Ai

### Oferta
- **Licencja dożywotnia**: 9 999 PLN jednorazowo
- **Deadline**: 1 września 2026
- **Po deadline**: tylko subskrypcja od 599 PLN/mies.
- **Plany**: Starter (299 PLN/mies.), Pro (599 PLN/mies.), Enterprise (999 PLN/mies.)

### Flow zakupowy
1. Użytkownik wchodzi na densflow.ai lub novikcode.com/densflow
2. Klika CTA → scroll do sekcji `#zapisz-sie`
3. Wpisuje email → redirect do `/densflow/zapisz-sie?email=...`
4. Wypełnia formularz (imię, nazwisko, tel, zgoda RODO)
5. Klika "💳 Zapłać 9 999 PLN" → API: zapis leada + email + PayU order
6. Redirect na PayU checkout (BLIK / przelew / karta)
7. PayU webhook → aktualizacja statusu w DB
8. Redirect na `/densflow/platnosc-sukces`
9. Email potwierdzenia zakupu do kupującego + notyfikacja admina

---

## Firma
- **Spółka**: ELMAR Sp. z o.o.
- **NIP**: 7542680826
- **Adres**: Opole, Polska
- **Telefon**: 790 740 770
- **Email**: marcin@nowosielski.pl
- **GitHub**: github.com/novik-code
- **Vercel**: novik-codes-projects

---

## Recent Changes (od 2026-04-01)
- **PayU checkout**: Integracja PayU REST API do zakupu licencji dożywotniej (9 999 PLN)
- **payuService.ts**: OAuth2, create-order, verify webhook signature
- **densflow_orders**: Nowa tabela Supabase do śledzenia zamówień
- **Webhook handler**: `/api/densflow-payu-webhook` — weryfikacja podpisu, aktualizacja statusu, emaile
- **Strony sukces/błąd**: `/densflow/platnosc-sukces` i `/densflow/platnosc-blad`
- **Ujednolicone CTA**: Wszystkie 3 przyciski zakupowe scrollują do sekcji email-first
- **Graceful PayU**: Jeśli PayU padnie, lead i email i tak są zapisane

## Older Changes (od 2026-03-23)
- Przebudowa Rutynka landing page — playful styl aplikacji (lavender, Nunito, kolorowe karty)
- System przedsprzedaży DensFlow.Ai: API, formularz, email, Supabase tabela
- Multi-domain middleware: densflow.ai → /densflow
- Podpięcie domeny densflow.ai w Vercel
- Env vars Supabase + Resend ustawione w Vercel
