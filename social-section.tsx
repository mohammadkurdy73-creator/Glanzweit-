'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'

// Uses the phone number already configured for the site (see contact section / footer).
const WHATSAPP_HREF = 'https://wa.me/4930123456789'

type Platform = {
  key: string
  name: string
  handle: string
  href: string
  icon: (props: { className?: string }) => JSX.Element
  src: string
  alt: string
}

// Rotation order: Instagram → WhatsApp → Facebook → TikTok → …
const platforms: Platform[] = [
  {
    key: 'instagram',
    name: 'Instagram',
    handle: '@glanzweit',
    href: 'https://instagram.com/glanzweit',
    icon: InstagramIcon,
    src: '/images/social/instagram.png',
    alt: 'Glanzweit auf Instagram – @glanzweit',
  },
  {
    key: 'whatsapp',
    name: 'WhatsApp',
    handle: 'Direkt schreiben',
    href: WHATSAPP_HREF,
    icon: WhatsAppIcon,
    src: '/images/social/whatsapp.png',
    alt: 'Glanzweit auf WhatsApp – Chat mit uns',
  },
  {
    key: 'facebook',
    name: 'Facebook',
    handle: 'Glanzweit Reinigung',
    href: 'https://facebook.com/glanzweit',
    icon: FacebookIcon,
    src: '/images/social/facebook.png',
    alt: 'Glanzweit auf Facebook – Glanzweit Reinigung',
  },
  {
    key: 'tiktok',
    name: 'TikTok',
    handle: '@glanzweit',
    href: 'https://tiktok.com/@glanzweit',
    icon: TikTokIcon,
    src: '/images/social/tiktok.png',
    alt: 'Glanzweit auf TikTok – @glanzweit',
  },
]

// Display order in the left-hand navigation.
const navOrder = ['instagram', 'facebook', 'tiktok', 'whatsapp']
const navItems = navOrder.map((key) => {
  const i = platforms.findIndex((p) => p.key === key)
  return { ...platforms[i], index: i }
})

// Artwork is 2456 × 1315 with generous transparent side margins.
// The stage crops to the artwork itself so the card reads large on screen.
const ART_W = 2456
const ART_H = 1315
const STAGE_W = 1240 // visible artwork width inside the source image
const OVERSIZE = (ART_W / STAGE_W) * 100

const HOLD_MS = 2400
const OUT_MS = 420
const IN_MS = 720

type Phase = 'in' | 'out' | 'reset'

export function SocialSection() {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('in')
  const target = useRef<number | null>(null)
  const paused = useRef(false)

  useEffect(() => {
    if (phase === 'in') {
      const t = setTimeout(() => {
        if (!paused.current) setPhase('out')
      }, HOLD_MS)
      return () => clearTimeout(t)
    }
    if (phase === 'out') {
      const t = setTimeout(() => {
        setIndex((i) => target.current ?? (i + 1) % platforms.length)
        target.current = null
        setPhase('reset')
      }, OUT_MS)
      return () => clearTimeout(t)
    }
    // 'reset' — repositioned while fully masked, then animate back in.
    let raf2 = 0
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setPhase('in'))
    })
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
  }, [phase])

  const goTo = useCallback(
    (i: number) => {
      if (i === index || phase !== 'in') return
      target.current = i
      setPhase('out')
    },
    [index, phase],
  )

  const active = platforms[index]

  // Exit: the card is wiped away toward the right edge.
  // Enter: it is wiped back in from the right edge. Only one card ever exists.
  const stageStyle =
    phase === 'in'
      ? {
          clipPath: 'inset(0% 0% 0% 0%)',
          transform: 'translate3d(0,0,0) scale(1)',
          transition: `clip-path ${IN_MS}ms cubic-bezier(0.16,1,0.3,1), transform ${IN_MS}ms cubic-bezier(0.16,1,0.3,1)`,
        }
      : phase === 'out'
        ? {
            clipPath: 'inset(0% 0% 0% 100%)',
            transform: 'translate3d(-3%,0,0) scale(0.97)',
            transition: `clip-path ${OUT_MS}ms cubic-bezier(0.65,0,0.35,1), transform ${OUT_MS}ms cubic-bezier(0.65,0,0.35,1)`,
          }
        : {
            clipPath: 'inset(0% 0% 0% 100%)',
            transform: 'translate3d(4%,0,0) scale(1.03)',
            transition: 'none',
          }

  return (
    <section id="social-media" className="scroll-mt-24 bg-background py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
        {/* LEFT — call to action */}
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Folgen Sie uns
          </span>

          <h2 className="mt-3 text-balance font-display text-3xl font-extrabold leading-tight tracking-tight text-navy sm:text-4xl">
            Bleiben Sie
            <span className="relative ml-2 inline-block">
              auf dem Laufenden
              <svg
                viewBox="0 0 260 12"
                aria-hidden="true"
                className="absolute -bottom-2 left-0 w-full text-primary"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 9C60 3 200 3 258 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          <p className="mt-7 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            Entdecken Sie aktuelle Einblicke, Tipps und Neuigkeiten rund um Glanzweit.
          </p>

          <ul className="mt-9 max-w-md">
            {navItems.map((item, i) => {
              const Icon = item.icon
              const isActive = item.index === index
              return (
                <li key={item.key} className={i > 0 ? 'border-t border-border' : undefined}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => goTo(item.index)}
                    onFocus={() => goTo(item.index)}
                    className="group relative -mx-3 flex items-center gap-4 rounded-2xl px-3 py-4 transition-colors duration-300 hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:px-4"
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 top-1/2 h-8 w-[3px] -translate-y-1/2 rounded-full bg-primary transition-all duration-500 ${
                        isActive ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
                      }`}
                    />
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground ${
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                          : 'bg-primary/10 text-primary'
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2 font-display font-bold text-navy">
                        {item.name}
                        {isActive ? (
                          <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-primary"
                          />
                        ) : null}
                      </span>
                      <span className="block text-sm text-muted-foreground">{item.handle}</span>
                    </span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-primary transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="sr-only">{item.name} öffnen (neuer Tab)</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </Reveal>

        {/* RIGHT — open visual stage, no enclosing frame */}
        <Reveal delay={120}>
          <div
            className="relative mx-auto w-full max-w-[380px] sm:max-w-[440px] lg:max-w-[500px]"
            onMouseEnter={() => (paused.current = true)}
            onMouseLeave={() => (paused.current = false)}
          >
            {/* subtle brand texture behind the stage */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-8 -inset-y-10 text-primary/20"
              style={{
                backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
                backgroundSize: '22px 22px',
                maskImage: 'radial-gradient(60% 55% at 50% 50%, #000 0%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(60% 55% at 50% 50%, #000 0%, transparent 100%)',
              }}
            />

            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: `${STAGE_W} / ${ART_H}` }}
              role="group"
              aria-roledescription="Präsentation"
              aria-label="Glanzweit auf Social Media"
              aria-live="polite"
            >
              <div className="absolute inset-0 will-change-transform" style={stageStyle}>
                <div
                  className="absolute left-1/2 top-0 h-full -translate-x-1/2"
                  style={{ width: `${OVERSIZE}%` }}
                >
                  <Image
                    key={active.key}
                    src={active.src || '/placeholder.svg'}
                    alt={active.alt}
                    width={ART_W}
                    height={ART_H}
                    priority
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* progress indicators */}
            <div className="mt-8 flex items-center justify-center gap-3">
              {platforms.map((p, i) => {
                const isActive = i === index
                return (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`${p.name}-Karte anzeigen`}
                    aria-current={isActive}
                    className="group py-2"
                  >
                    <span
                      className={`block h-[3px] overflow-hidden rounded-full bg-border transition-all duration-500 ${
                        isActive ? 'w-14' : 'w-6 group-hover:bg-primary/40'
                      }`}
                    >
                      <span
                        className="block h-full origin-left rounded-full bg-primary"
                        style={{
                          transform: isActive
                            ? phase === 'reset'
                              ? 'scaleX(0)'
                              : 'scaleX(1)'
                            : 'scaleX(0)',
                          transition:
                            isActive && phase === 'in' ? `transform ${HOLD_MS}ms linear` : 'none',
                        }}
                      />
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9c-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 5.19a4.65 4.65 0 1 0 0 9.3 4.65 4.65 0 0 0 0-9.3Zm0 7.67a3.02 3.02 0 1 1 0-6.04 3.02 3.02 0 0 1 0 6.04Zm5.92-7.85a1.09 1.09 0 1 1-2.17 0 1.09 1.09 0 0 1 2.17 0Z" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.25 10.44 22v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.77l-.44 2.91h-2.33V22C18.34 21.25 22 17.08 22 12.06Z" />
    </svg>
  )
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-1.84-2.48V9.77a5.68 5.68 0 1 0 4.93 5.63V8.87a7.03 7.03 0 0 0 4.1 1.31V7.09a4.24 4.24 0 0 1-3.04-1.27z" />
    </svg>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.02c-.24.68-1.42 1.31-1.96 1.36-.5.05-.97.23-3.34-.7-2.84-1.12-4.62-4.06-4.76-4.25-.14-.19-1.13-1.51-1.13-2.88 0-1.37.71-2.04.97-2.32.25-.28.55-.35.73-.35s.37 0 .53.01c.17.01.4-.06.62.48.23.54.77 1.88.84 2.02.07.14.11.3.02.48-.09.19-.14.3-.28.47-.14.16-.29.36-.42.48-.14.14-.28.29-.12.57.16.28.71 1.18 1.53 1.91 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.16-.19.7-.82.89-1.1.19-.28.37-.23.62-.14.25.09 1.59.75 1.86.89.28.14.46.21.53.33.07.12.07.68-.17 1.36Z" />
    </svg>
  )
}
