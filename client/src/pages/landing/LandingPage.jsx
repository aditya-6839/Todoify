import React from 'react';
import MarketingNavbar from '@/components/layout/MarketingNavbar';
import HeroSection from '@/components/landing/HeroSection';
import BrandMarquee from '@/components/landing/BrandMarquee';
import BentoFeatures from '@/components/landing/BentoFeatures';
import HowItWorks from '@/components/landing/HowItWorks';
import Testimonials from '@/components/landing/Testimonials';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-[#FAF9F5] selection:bg-[#C96442]/15 selection:text-[#C96442]">
            <style>{`
                @keyframes heroFloat {
                    from { transform: translateY(0px) rotate(-0.5deg); }
                    to   { transform: translateY(-14px) rotate(0.5deg); }
                }
                @keyframes marqueeLTR {
                    from { transform: translateX(0); }
                    to   { transform: translateX(-50%); }
                }
                @keyframes revealUp {
                    from { opacity: 0; transform: translateY(28px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .reveal { animation: revealUp 0.7s cubic-bezier(.22,1,.36,1) both; }
                .d1 { animation-delay: 0.08s; }
                .d2 { animation-delay: 0.18s; }
                .d3 { animation-delay: 0.28s; }
                .d4 { animation-delay: 0.40s; }
                .d5 { animation-delay: 0.52s; }
                .marquee { animation: marqueeLTR 30s linear infinite; }
                .marquee:hover { animation-play-state: paused; }
                .scrollbar-none::-webkit-scrollbar { display: none; }
            `}</style>

            <MarketingNavbar />

            <main>
                <HeroSection />
                <BrandMarquee />
                <BentoFeatures />
                <HowItWorks />
                <Testimonials />
                <CTASection />
            </main>

            <Footer />
        </div>
    );
};

export default LandingPage;
