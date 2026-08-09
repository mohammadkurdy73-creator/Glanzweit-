import { Building2, Building, SprayCan, Footprints, Stethoscope, ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const services = [
  {
    icon: Building2,
    title: 'Büroreinigung',
    description:
      'Regelmäßige, gründliche Reinigung Ihrer Büroräume für ein produktives und gepflegtes Arbeitsumfeld.',
  },
  {
    icon: Building,
    title: 'Gebäudereinigung',
    description:
      'Professionelle Reinigung von Innenbereichen, Eingängen, Fluren, Treppenhäusern und Gemeinschaftsflächen in Wohn- und Gewerbeobjekten.',
  },
  {
    icon: SprayCan,
    title: 'Fensterreinigung',
    description:
      'Streifenfreie Reinigung von Fenstern, Glasflächen und Glastüren für einen gepflegten und professionellen Eindruck.',
  },
  {
    icon: Footprints,
    title: 'Treppenhausreinigung',
    description:
      'Zuverlässige Reinigung von Treppenhäusern, Eingangsbereichen und Aufzügen nach einem festen oder individuellen Reinigungsplan.',
  },
  {
    icon: Stethoscope,
    title: 'Praxisreinigung',
    description:
      'Hygienische Reinigung von Arztpraxen und medizinischen Einrichtungen nach hohen Sauberkeitsstandards.',
  },
]

export function ServicesSection() {
  return (
    <section id="leistungen" className="scroll-mt-24 bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Unsere Leistungen
          </span>
          <h2 className="mt-3 text-balance font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            Sauberkeit für jedes Objekt
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Ob Büro, Praxis oder Wohnanlage – wir bieten professionelle Reinigungslösungen,
            individuell abgestimmt auf Ihre Anforderungen.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal
              as="article"
              key={service.title}
              delay={i * 80}
              className="group relative flex flex-col rounded-3xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                <service.icon className="h-7 w-7" aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-display text-xl font-bold text-navy">{service.title}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">{service.description}</p>
              <a
                href="#kontakt"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
              >
                Mehr erfahren
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </a>
            </Reveal>
          ))}

          <Reveal
            as="article"
            delay={services.length * 80}
            className="flex flex-col justify-between rounded-3xl bg-navy p-8 text-navy-foreground"
          >
            <div>
              <h3 className="font-display text-xl font-bold">Individuelles Reinigungskonzept?</h3>
              <p className="mt-3 leading-relaxed text-white/70">
                Erzählen Sie uns von Ihrem Objekt – wir erstellen ein maßgeschneidertes Angebot.
              </p>
            </div>
            <a
              href="#kontakt"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90"
            >
              Jetzt anfragen
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
