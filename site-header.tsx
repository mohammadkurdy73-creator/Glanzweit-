'use client'

import { useEffect, useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Ablauf', href: '#ablauf' },
  { label: 'Warum wir', href: '#warum-wir' },
  { label: 'Einsatzgebiet', href: '#einsatzgebiet' },
  { label: 'Über uns', href: '#ueber-uns' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-border bg-background/85 backdrop-blur-md py-3'
          : 'border-b border-transparent bg-transparent py-5',
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" className="flex items-center" aria-label="Glanzweit Startseite">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={scrolled ? '/glanzweit-logo-full-blue.svg' : '/glanzweit-logo-full-white.svg'}
            alt="Glanzweit – Reinigungsservice & Pflege"
            className="h-9 w-auto transition-opacity duration-300 sm:h-10"
          />
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Hauptnavigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                scrolled ? 'text-muted-foreground' : 'text-white/80',
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:+4930123456789"
            className={cn(
              'flex items-center gap-2 text-sm font-semibold transition-colors hover:text-primary',
              scrolled ? 'text-navy' : 'text-white',
            )}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            030 123 456 789
          </a>
          <a
            href="#kontakt"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:bg-primary/90"
          >
            Kostenloses Angebot
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-xl border transition-colors lg:hidden',
            scrolled ? 'border-border text-navy' : 'border-white/20 text-white',
          )}
          aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-navy transition-colors hover:bg-secondary"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#kontakt"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-primary px-5 py-3 text-center text-base font-semibold text-primary-foreground"
            >
              Kostenloses Angebot
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
