import { Phone, Mail, MapPin } from 'lucide-react'

const serviceLinks = [
  'Büroreinigung',
  'Gebäudereinigung',
  'Fensterreinigung',
  'Treppenhausreinigung',
  'Bauendreinigung',
]

const navLinks = [
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Warum wir', href: '#warum-wir' },
  { label: 'Einsatzgebiet', href: '#einsatzgebiet' },
  { label: 'Über uns', href: '#ueber-uns' },
  { label: 'Kontakt', href: '#kontakt' },
]

export function SiteFooter() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="#top" className="flex items-center" aria-label="Glanzweit Startseite">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/glanzweit-logo-full-white.svg"
                alt="Glanzweit – Reinigungsservice & Pflege"
                className="h-11 w-auto"
              />
            </a>
            <p className="mt-4 text-pretty leading-relaxed text-white/60">
              Ihr zuverlässiger Partner für professionelle Gebäudereinigung – für strahlende
              Sauberkeit in ganz Berlin und Umgebung.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white/90">
              Leistungen
            </h3>
            <ul className="mt-4 space-y-3">
              {serviceLinks.map((item) => (
                <li key={item}>
                  <a href="#leistungen" className="text-white/60 transition-colors hover:text-primary">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white/90">
              Navigation
            </h3>
            <ul className="mt-4 space-y-3">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-white/60 transition-colors hover:text-primary">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white/90">
              Kontakt
            </h3>
            <ul className="mt-4 space-y-3 text-white/60">
              <li>
                <a href="tel:+4930123456789" className="flex items-center gap-2.5 transition-colors hover:text-primary">
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  030 123 456 789
                </a>
              </li>
              <li>
                <a href="mailto:info@glanzweit.de" className="flex items-center gap-2.5 transition-colors hover:text-primary">
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  info@glanzweit.de
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                Musterstraße 12, 10115 Berlin
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Glanzweit Gebäudereinigung. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-primary">Impressum</a>
            <a href="#" className="transition-colors hover:text-primary">Datenschutz</a>
            <a href="#" className="transition-colors hover:text-primary">AGB</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
