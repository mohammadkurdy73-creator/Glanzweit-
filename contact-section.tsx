'use client'

import { useState, type FormEvent } from 'react'
import { Phone, Mail, MapPin, Clock, CheckCircle2, Send } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const services = [
  'Büroreinigung',
  'Gebäudereinigung',
  'Fensterreinigung',
  'Treppenhausreinigung',
  'Bauendreinigung',
  'Sonstiges',
]

const contactInfo = [
  { icon: Phone, label: 'Telefon', value: '030 123 456 789', href: 'tel:+4930123456789' },
  { icon: Mail, label: 'E-Mail', value: 'info@glanzweit.de', href: 'mailto:info@glanzweit.de' },
  { icon: MapPin, label: 'Adresse', value: 'Musterstraße 12, 10115 Berlin' },
  { icon: Clock, label: 'Erreichbarkeit', value: 'Mo – Fr: 08:00 – 18:00 Uhr' },
]

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="kontakt" className="scroll-mt-24 bg-secondary py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-8">
          {/* Info */}
          <Reveal className="lg:col-span-2">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Kontakt
            </span>
            <h2 className="mt-3 text-balance font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Kostenloses Angebot anfordern
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              Erzählen Sie uns von Ihrem Objekt. Wir melden uns innerhalb von 24 Stunden mit einem
              unverbindlichen Angebot bei Ihnen.
            </p>

            <ul className="mt-8 space-y-4">
              {contactInfo.map((info) => {
                const content = (
                  <>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <info.icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm text-muted-foreground">{info.label}</span>
                      <span className="block font-semibold text-navy">{info.value}</span>
                    </span>
                  </>
                )
                return (
                  <li key={info.label}>
                    {info.href ? (
                      <a href={info.href} className="flex items-center gap-4 transition-opacity hover:opacity-80">
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4">{content}</div>
                    )}
                  </li>
                )
              })}
            </ul>
          </Reveal>

          {/* Form */}
          <Reveal className="lg:col-span-3" delay={120}>
            <div className="rounded-3xl border border-border bg-card p-6 shadow-xl sm:p-9">
              {submitted ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-bold text-navy">Vielen Dank!</h3>
                  <p className="mt-3 max-w-sm text-pretty leading-relaxed text-muted-foreground">
                    Ihre Anfrage ist bei uns eingegangen. Wir melden uns schnellstmöglich mit Ihrem
                    persönlichen Angebot.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="Name" htmlFor="name">
                      <input id="name" name="name" type="text" required placeholder="Max Mustermann" className={inputClass} />
                    </Field>
                    <Field label="Telefon" htmlFor="phone">
                      <input id="phone" name="phone" type="tel" placeholder="030 123 456 789" className={inputClass} />
                    </Field>
                  </div>

                  <Field label="E-Mail" htmlFor="email">
                    <input id="email" name="email" type="email" required placeholder="max@beispiel.de" className={inputClass} />
                  </Field>

                  <Field label="Gewünschte Leistung" htmlFor="service">
                    <select id="service" name="service" required defaultValue="" className={inputClass}>
                      <option value="" disabled>
                        Bitte auswählen
                      </option>
                      {services.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Ihre Nachricht" htmlFor="message">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Beschreiben Sie kurz Ihr Objekt und Ihre Wünsche..."
                      className={`${inputClass} resize-none`}
                    />
                  </Field>

                  <button
                    type="submit"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:bg-primary/90"
                  >
                    Angebot anfordern
                    <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </button>
                  <p className="text-center text-xs text-muted-foreground">
                    Mit dem Absenden stimmen Sie unserer Datenschutzerklärung zu.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

const inputClass =
  'w-full rounded-xl border border-input bg-background px-4 py-3 text-navy placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20'

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-1.5 block text-sm font-medium text-navy">{label}</span>
      {children}
    </label>
  )
}
