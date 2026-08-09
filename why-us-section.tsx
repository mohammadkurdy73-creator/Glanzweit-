import { ShieldCheck, Clock, Tag, HeartHandshake, ClipboardCheck, Sparkles } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const reasons = [
  {
    icon: Sparkles,
    title: 'Gründliche Reinigung',
    description: 'Wir arbeiten sorgfältig bis ins kleinste Detail – für sichtbar saubere Ergebnisse.',
  },
  {
    icon: ShieldCheck,
    title: 'Voll versichert',
    description: 'Ihr Objekt ist bei jedem Einsatz professionell und zuverlässig abgesichert.',
  },
  {
    icon: Clock,
    title: 'Pünktlich & flexibel',
    description:
      'Wir passen uns Ihrem Zeitplan an – auch früh morgens oder außerhalb Ihrer Geschäftszeiten.',
  },
  {
    icon: HeartHandshake,
    title: 'Fester Ansprechpartner',
    description: 'Ein persönlicher Ansprechpartner begleitet Sie zuverlässig bei jedem Auftrag.',
  },
  {
    icon: Tag,
    title: 'Faire Festpreise',
    description: 'Transparente Angebote ohne versteckte Kosten – klar und nachvollziehbar.',
  },
  {
    icon: ClipboardCheck,
    title: 'Qualitätskontrolle',
    description: 'Regelmäßige Kontrollen sorgen für gleichbleibend hohe Reinigungsqualität.',
  },
]

export function WhyUsSection() {
  return (
    <section id="warum-wir" className="scroll-mt-24 bg-secondary py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Warum Glanzweit
            </span>
            <h2 className="mt-3 text-balance font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Warum Kunden uns vertrauen
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              Wir stehen für Zuverlässigkeit, sorgfältige Arbeit und transparente Kommunikation.
              Unser Ziel ist eine langfristige Zusammenarbeit und zufriedene Kunden.
            </p>
            <div className="mt-8 rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display text-xl font-bold text-navy">
                Kostenloses Beratungsgespräch
              </h3>
              <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
                Wir beraten Sie persönlich und erstellen ein individuelles Reinigungskonzept für Ihr
                Objekt.
              </p>
              <a
                href="#kontakt"
                className="mt-5 inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Jetzt anfragen
              </a>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-8">
            {reasons.map((reason, i) => (
              <Reveal
                as="article"
                key={reason.title}
                delay={i * 70}
                className="flex gap-4 rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                  <reason.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-navy">{reason.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-muted-foreground">{reason.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
