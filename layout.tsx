import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Manrope } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Glanzweit | Premium Gebäudereinigung',
  description:
    'Glanzweit ist Ihr zuverlässiger Partner für professionelle Büro-, Gebäude-, Fenster-, Treppenhaus- und Bauendreinigung. Höchste Qualität, faire Preise, geschulte Teams.',
  generator: 'v0.app',
  keywords: [
    'Gebäudereinigung',
    'Büroreinigung',
    'Fensterreinigung',
    'Treppenhausreinigung',
    'Bauendreinigung',
    'Reinigungsfirma',
    'Glanzweit',
  ],
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0a2475',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className="bg-background">
      <body className={`${inter.variable} ${manrope.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
