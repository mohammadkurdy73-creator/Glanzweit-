# Glanzweit – Projektkontext

Website für **Glanzweit**, eine Firma für Premium-Gebäudereinigung (Büro, Gebäude, Fenster, Treppenhaus, Bauendreinigung). Sprache der Website: **Deutsch** (`lang="de"`). Der Inhaber spricht Arabisch (syrischer Dialekt). Antworten im Chat daher auf Arabisch, Website-Texte auf Deutsch.

## Tech-Stack
- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4, shadcn/ui (Stil `base-nova`), lucide-react Icons
- Schriften: Inter (`--font-inter`) und Manrope (`--font-manrope`)
- Paketmanager: **pnpm**. Ursprünglich mit v0.app erstellt.

## Befehle
- `pnpm install`: Abhängigkeiten installieren
- `pnpm dev`: lokaler Server
- `pnpm build`: Produktions-Build
- `pnpm lint`: ESLint

## Struktur (wichtig)
Die richtige Projektstruktur steckt in `glanzweit-5.zip`:
`app/` (layout, page, globals.css), `components/` (Sektionen + `ui/button.tsx`), `lib/utils.ts`, `public/` (Logos + `images/`).
Die Dateien im Repo-Root wurden flach hochgeladen und sind **noch nicht** in diese Ordner sortiert. Die Bilder aus `public/images/` gibt es nur in der Zip.

Seitenaufbau (`page.tsx`): Header → Hero → Services → Process → WhyUs → ServiceArea → About → Social → Contact → Footer.

## Design
- Primärfarbe Navy/Blau, Theme-Color `#0a2475`, Akzent `brand-yellow`
- Logos: `glanzweit-logo-full-{blue,white}.svg`, `glanzweit-mark-{blue,white}.svg`

## Arbeitsregeln
- Am Anfang jeder Sitzung `HANDOVER.md` lesen.
- Am Ende jeder Sitzung `HANDOVER.md` aktualisieren und committen + pushen. Nichts ungepusht lassen.
- Bevor du Angaben in `HANDOVER.md` vertraust, prüfen, ob die genannten Dateien wirklich existieren.
