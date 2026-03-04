import React from 'react'
import HeroSection from '@/components/marketing/HeroSection'
import BrandMarquee from '@/components/marketing/BrandMarquee'
import HowItWorks from '@/components/marketing/HowItWorks'
import ReviewsSection from '@/components/marketing/ReviewsSection'
import CTASection from '@/components/marketing/CTASection'
import FooterSection from '@/components/marketing/FooterSection'

const LandingPage = () => {
  return (
    <main className="bg-background">
      <HeroSection />
      <BrandMarquee />
      <HowItWorks />
      <ReviewsSection />
      <CTASection />
      <FooterSection />
    </main>
  )
}

export default LandingPage

