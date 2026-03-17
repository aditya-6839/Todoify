import React from 'react';

const brands = [
    'Airbnb', 'Slack', 'Amazon', 'Meta', 'Netflix', 'Shopify', 'Spotify', 'Google', 'Zoom', 'Uber'
];

const BrandMarquee = () => {
    return (
        <section className="py-12 bg-background border-y border-border/50 overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 flex flex-col items-center gap-8">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-muted-foreground text-center">
                    Empowering teams at the world's most innovative companies
                </p>
            </div>

            <div className="max-w-[1400px] mx-auto overflow-hidden mt-8">
                <div className="flex whitespace-nowrap animate-marquee items-center w-max">
                    {[...brands, ...brands].map((brand, i) => (
                        <span
                            key={i}
                            className="mx-6 sm:mx-8 md:mx-10 lg:mx-12 text-xl sm:text-2xl md:text-2xl lg:text-3xl font-black text-foreground/20 hover:text-primary/40 transition-colors duration-300 cursor-default select-none uppercase tracking-tighter italic"
                            style={{ fontFamily: 'var(--font-serif)' }}
                        >
                            {brand}
                        </span>
                    ))}
                </div>
            </div>

            <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
      `}</style>
        </section>
    );
};

export default BrandMarquee;
