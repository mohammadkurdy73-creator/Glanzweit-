import Image from 'next/image'
import { Check } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const points = [
  'Familiengeführtes Unternehmen mit Herz und Handschlagqualität',
  'Sorgfältig geschulte und langjährige Mitarbeiter',
  'Transparente Angebote ohne versteckte Kosten',
  'Persönliche Betreuung von der Anfrage bis zur Übergabe',
]

export function AboutSection() {
  return (
    <section id="ueber-uns" className="scroll-mt-24 bg-background pb-20 pt-8 lg:pb-28 lg:pt-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Über Glanzweit
          </span>
          <h2 className="mt-3 text-balance font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            Ihr Partner für strahlende Sauberkeit
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
            Was als kleines Familienunternehmen begann, ist heute ein verlässlicher Name in der
            professionellen Gebäudereinigung. Bei Glanzweit verbinden wir handwerkliche Sorgfalt
            mit modernen, umweltfreundlichen Reinigungsmethoden – und einem echten Anspruch an
            Perfektion.
          </p>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Unser Name ist Programm: Wir sorgen dafür, dass Ihre Räume weit über das Übliche hinaus
            glänzen. Dabei zählen für uns Vertrauen, Verlässlichkeit und Fairness genauso viel wie
            das makellose Ergebnis.
          </p>

          <ul className="mt-8 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="leading-relaxed text-navy">{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="order-1 lg:order-2" delay={120}>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-border shadow-2xl">
              <Image
                src="/images/team.png"
                alt="Das freundliche Reinigungsteam von Glanzweit in Uniform"
                width={800}
                height={640}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-6 rounded-2xl bg-primary px-6 py-4 text-primary-foreground shadow-xl">
              <p className="font-display text-2xl font-extrabold">Seit 2009</p>
              <p className="text-sm text-primary-foreground/85">für Sie im Einsatz</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
