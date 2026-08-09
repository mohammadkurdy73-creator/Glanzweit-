import Image from 'next/image'
import { Phone, ReceiptEuro, CalendarDays, SprayCan, ShieldCheck, Star, ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const steps = [
  {
    number: '01',
    icon: Phone,
    title: 'Kontakt aufnehmen',
    description: 'Senden Sie uns Ihre Anfrage telefonisch oder über unser Kontaktformular.',
    image: '/images/step-kontakt.png',
    alt: 'Person im dunkelblauen Sakko hält ein Smartphone für die Kontaktaufnahme',
  },
  {
    number: '02',
    icon: ReceiptEuro,
    title: 'Kostenloses Angebot',
    description: 'Wir analysieren Ihren Bedarf und erstellen ein individuelles, unverbindliches Angebot.',
    image: '/images/step-angebot.png',
    alt: 'Klemmbrett mit Angebotsunterlagen und Stift auf einem hellen Holztisch',
  },
  {
    number: '03',
    icon: CalendarDays,
    title: 'Termin vereinbaren',
    description: 'Gemeinsam finden wir einen passenden und flexiblen Termin.',
    image: '/images/step-termin.png',
    alt: 'Tischkalender mit markiertem Termin und einem silbernen Stift',
  },
  {
    number: '04',
    icon: SprayCan,
    title: 'Reinigung durchführen',
    description: 'Unser Team erscheint pünktlich und führt die Reinigung gründlich und professionell durch.',
    image: '/images/step-reinigung.png',
    alt: 'Reinigungskraft wischt den Boden eines hellen Raumes mit einem Flachmopp',
  },
  {
    number: '05',
    icon: ShieldCheck,
    title: 'Qualitätskontrolle',
    description: 'Wir prüfen das Ergebnis und stellen sicher, dass Sie zu 100 % zufrieden sind.',
    image: '/images/step-qualitaet.png',
    alt: 'Makellos saubere, helle Wohnzimmereinrichtung nach der Reinigung',
  },
]

function StepArrow() {
  return (
    <div
      aria-hidden="true"
      className="flex shrink-0 items-center justify-center py-4 md:w-8 md:py-0 lg:w-10"
    >
      <svg
        viewBox="0 0 40 12"
        fill="none"
        className="h-3 w-10 rotate-90 text-primary/60 md:rotate-0"
      >
        <line
          x1="1"
          y1="6"
          x2="29"
          y2="6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray="4 5"
        />
        <path
          d="M28.5 2 L33.5 6 L28.5 10"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export function ProcessSection() {
  return (
    <section id="ablauf" className="scroll-mt-24 bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            So einfach geht&apos;s
          </span>
          <h2 className="mt-3 text-balance font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            In 5 einfachen Schritten <span className="text-primary">zu Sauberkeit</span>
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Schnell, transparent und zuverlässig – so arbeiten wir für Sie.
          </p>
          <div className="mt-7 flex items-center justify-center gap-3" aria-hidden="true">
            <span className="h-px w-14 bg-gradient-to-r from-transparent to-primary/40" />
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="h-px w-14 bg-gradient-to-l from-transparent to-primary/40" />
          </div>
        </Reveal>

        {/* Horizontal process timeline: 01 -> 02 -> 03 -> 04 -> 05 */}
        <div className="mt-14 flex flex-col md:-mx-2 md:flex-row md:items-stretch md:overflow-x-auto md:px-2 md:pb-3 lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0">
          {steps.map((step, i) => (
            <div key={step.number} className="flex flex-col md:contents">
              <Reveal
                as="article"
                delay={i * 80}
                className="flex w-full flex-col rounded-3xl border border-border bg-card p-6 shadow-lg shadow-primary/5 ring-1 ring-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 md:w-56 md:shrink-0 md:grow md:basis-0 lg:w-auto"
              >
                <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
                  {step.number}
                </span>

                <span className="mx-auto mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <step.icon className="h-7 w-7" strokeWidth={1.75} aria-hidden="true" />
                </span>

                <h3 className="mt-6 text-balance text-center font-display text-lg font-bold text-navy">
                  {step.title}
                </h3>
                <p className="mt-3 text-pretty text-center text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>

                {/* Spacer keeps every image flush with the bottom of the card,
                    so all five images stay perfectly aligned in the row. */}
                <div aria-hidden="true" className="min-h-6 flex-1" />

                <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl bg-secondary">
                  <Image
                    src={step.image || '/placeholder.svg'}
                    alt={step.alt}
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 768px) 30vw, 90vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>

              {i < steps.length - 1 && <StepArrow />}
            </div>
          ))}
        </div>

        {/* Reassurance bar */}
        <Reveal
          delay={200}
          className="mt-10 flex flex-col items-center gap-6 rounded-3xl border border-border bg-card p-6 shadow-lg shadow-primary/5 lg:flex-row lg:justify-between lg:p-8"
        >
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <ShieldCheck className="h-6 w-6" aria-hidden="true" />
            </span>
            <div className="text-center lg:text-left">
              <p className="font-display text-base font-bold text-navy">
                Zuverlässig. Gründlich. Persönlich.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Darauf können Sie sich verlassen.
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <a
              href="#kontakt"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:bg-primary/90"
            >
              Jetzt kostenloses Angebot sichern
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a
              href="tel:+4930123456789"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-navy transition-colors hover:border-primary hover:text-primary"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              030 123 456 789
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
