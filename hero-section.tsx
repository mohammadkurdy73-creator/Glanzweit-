import Image from 'next/image'
import { ArrowRight, CheckCircle2, ShieldCheck, CalendarCheck, Zap } from 'lucide-react'

const highlights = ['Versichert & zertifiziert', 'Geschulte Fachkräfte', 'Faire Festpreise']

export function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden bg-navy pt-28 pb-20 sm:pt-36 lg:pb-28">
      {/* subtle background accents */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-8">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur">
            <span className="flex items-center text-primary">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            </span>
            Ihr Partner für saubere Arbeitsplätze
          </div>

          <h1 className="mt-6 text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Glänzende Sauberkeit für Ihre <span className="text-brand-yellow">Räume</span>
          </h1>

          <p className="mt-6 text-pretty text-lg leading-relaxed text-white/70">
            Glanzweit ist Ihr zuverlässiger Partner für professionelle Gebäudereinigung.
            Wir schaffen saubere Arbeitsumgebungen mit Sorgfalt, Qualität und einem hohen Anspruch an jedes Detail.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#kontakt"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition-all hover:-translate-y-0.5 hover:bg-primary/90"
            >
              Kostenloses Angebot
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a
              href="#leistungen"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-4 text-base font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              Unsere Leistungen
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm font-medium text-white/80">
                <CheckCircle2 className="h-5 w-5 text-primary" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
            <Image
              src="/images/hero-cleaning.png"
              alt="Professionelle Reinigungskraft von Glanzweit bei der Arbeit in einem hellen modernen Büro"
              width={900}
              height={1000}
              priority
              className="h-full w-full object-cover"
            />
          </div>

          {/* floating feature cards */}
          <div className="absolute -bottom-5 -left-3 hidden items-center gap-2.5 rounded-2xl border border-white/20 bg-navy/55 px-4 py-3 shadow-xl backdrop-blur-md sm:flex">
            <CalendarCheck className="h-5 w-5 text-brand-yellow" aria-hidden="true" />
            <p className="font-display text-sm font-semibold text-white">Flexible Termine</p>
          </div>
          <div className="absolute -right-3 top-6 hidden items-center gap-2.5 rounded-2xl border border-white/20 bg-navy/55 px-4 py-3 shadow-xl backdrop-blur-md sm:flex">
            <Zap className="h-5 w-5 text-brand-yellow" aria-hidden="true" />
            <p className="font-display text-sm font-semibold text-white">Schnelle Reaktionszeit</p>
          </div>
        </div>
      </div>
    </section>
  )
}
