import { SiteHeader } from '@/components/site-header'
import { HeroSection } from '@/components/hero-section'
import { ServicesSection } from '@/components/services-section'
import { ProcessSection } from '@/components/process-section'
import { WhyUsSection } from '@/components/why-us-section'
import { ServiceAreaSection } from '@/components/service-area-section'
import { AboutSection } from '@/components/about-section'
import { SocialSection } from '@/components/social-section'
import { ContactSection } from '@/components/contact-section'
import { SiteFooter } from '@/components/site-footer'
import { Star } from 'lucide-react'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <ServicesSection />
        <ProcessSection />
        <WhyUsSection />
        <ServiceAreaSection />
        <div className="flex items-center justify-center gap-5 bg-background py-1" aria-hidden="true">
          <span className="h-px w-16 bg-primary/45 sm:w-20" />
          <Star className="h-4 w-4 fill-primary text-primary" strokeWidth={1.5} />
          <span className="h-px w-16 bg-primary/45 sm:w-20" />
        </div>
        <AboutSection />
        <SocialSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}
