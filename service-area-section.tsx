import { Reveal } from '@/components/reveal'
import { MapPin } from 'lucide-react'

const legendTowns = [
  'Braunschweig',
  'Vechelde',
  'Wolfenbüttel',
  'Lehre',
  'Cremlingen',
  'Sickte',
  'Wendeburg',
  'Meine',
  'Vordorf',
  'Lengede',
  'Salzgitter',
  'Peine',
  'Ilsede',
  'Königslutter am Elm',
  'Gifhorn',
  'Hildesheim',
  'Giesen',
  'Harsum',
  'Schellerten',
  'Algermissen',
  'Söhlde',
  'Holle',
  'Bad Salzdetfurth',
  'Sarstedt',
  'Diekholzen',
  'Nordstemmen',
  'Bockenem',
]

export function ServiceAreaSection() {
  return (
    <section id="einsatzgebiet" className="scroll-mt-24 bg-background pb-8 pt-20 lg:pb-12 lg:pt-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)] lg:items-center lg:gap-12">
          {/* Left: heading + legend */}
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Unser Einsatzgebiet
            </span>
            <h2 className="mt-3 text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-5xl">
              Für Sie in der Region im Einsatz
            </h2>
            <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
              Wir betreuen Unternehmen und Gewerbekunden in Braunschweig, Hildesheim und der
              gesamten Region – schnell, zuverlässig und persönlich.
            </p>

            <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="font-display text-lg font-bold text-navy">Unser Servicegebiet</h3>
              </div>
              <ul className="mt-4 columns-2 gap-x-6 [&>li]:break-inside-avoid">
                {legendTowns.map((name) => (
                  <li key={name} className="mb-2.5 flex items-center gap-2 text-sm text-navy/80">
                    <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="leading-tight">{name}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center gap-2 border-t border-border pt-4 text-sm text-muted-foreground">
                <span
                  className="h-4 w-6 rounded-sm border border-dashed border-primary bg-primary/10"
                  aria-hidden="true"
                />
                Unser Einsatzgebiet
              </div>
            </div>
          </Reveal>

          {/* Right: vector map */}
          <Reveal delay={120}>
            <div className="relative aspect-[21/20] overflow-hidden rounded-3xl border border-border bg-muted shadow-xl">
              {/* The uploaded map is a square canvas with wide empty edges; the
                  percentage-based frame below trims only that outer background
                  so the service area fills the container on every screen size. */}
              <img
                src="/images/service-area-map.svg"
                alt="Karte des gesamten Einsatzgebiets von Glanzweit rund um Braunschweig und Hildesheim"
                className="absolute left-[-15.5%] top-[-12.5%] h-[125%] w-[119%] max-w-none"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
