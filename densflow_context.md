# DensFlow.Ai / NovikCode — Kontekst Projektu

> Last Updated: 2026-03-23

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

---

## API Routes

### `POST /api/densflow-lead`
- **Input**: `{ email, first_name, last_name, phone, rodo_consent, marketing_consent }`
- **Walidacja**: email format, phone 9+ digits, rodo_consent required
- **Akcje**: Upsert do `densflow_leads` → wysyłka emaila potwierdzającego (Resend)
- **Email**: branded DensFlow.Ai, informacja o przedsprzedaży licencji dożywotniej 9 999 PLN

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
- Email input → redirect do `/densflow/zapisz-sie`
- Przycisk "Kup Licencję Dożywotnią" → redirect do formularza

### DensFlow Formularz (`/densflow/zapisz-sie`)
- Pola: email (pre-filled z URL param), imię, nazwisko, telefon
- Checkboxy: RODO (wymagany), marketing (opcjonalny)
- Submit → POST `/api/densflow-lead`
- Success → potwierdzenie + sprawdź email

### Rutynka Landing (`/rutynka`)
- Jasny motyw: lavender gradient (#f0edff → #fff0f5 → #e8fff5)
- Font: Nunito (headings), Inter (body)
- Kolory: purple #6C5CE7, pink #E84393, green #00B894
- Sekcje: hero, profile dzieci (symulacja), funkcje, benefits, dla kogo, jak to działa, CTA "wkrótce w sprzedaży"

### Podstrony prawne (`/densflow/regulamin`, `/densflow/polityka-prywatnosci`, `/densflow/polityka-cookies`)
- ELMAR Sp. z o.o. dane rejestrowe
- Dark mode, spójne z DensFlow

---

## Przedsprzedaż DensFlow.Ai

### Oferta
- **Licencja dożywotnia**: 9 999 PLN jednorazowo
- **Deadline**: 1 września 2026
- **Po deadline**: tylko subskrypcja od 599 PLN/mies.
- **Plany**: Starter (299 PLN/mies.), Pro (599 PLN/mies.), Enterprise (999 PLN/mies.)

### Flow
1. Użytkownik wchodzi na densflow.ai lub novikcode.com/densflow
2. Wpisuje email w CTA → redirect do /densflow/zapisz-sie?email=...
3. Wypełnia formularz (imię, nazwisko, tel, zgoda RODO)
4. Submit → zapis do Supabase + email potwierdzający
5. W emailu: podsumowanie danych, info o licencji, CTA (placeholder — Stripe TBD)

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

## Recent Changes (od 2026-03-23)
- Przebudowa Rutynka landing page — playful styl aplikacji (lavender, Nunito, kolorowe karty)
- System przedsprzedaży DensFlow.Ai: API, formularz, email, Supabase tabela
- Multi-domain middleware: densflow.ai → /densflow
- Podpięcie domeny densflow.ai w Vercel
- Env vars Supabase + Resend ustawione w Vercel
