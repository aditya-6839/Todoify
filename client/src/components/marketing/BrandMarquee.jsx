import React from 'react';

const brands = [
    'Airbnb', 'Slack', 'Amazon', 'Meta', 'Netflix', 'Shopify', 'Spotify', 'Google', 'Zoom', 'Uber'
];

const BrandMarquee = () => {
    return (
        <section className="py-12 bg-background overflow-hidden border-y border-border/50">
            <div className="flex flex-col items-center gap-8">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    Empowering teams at the world's most innovative companies
                </p>

                <div className="relative w-full flex overflow-hidden">
                    <div className="flex whitespace-nowrap animate-marquee items-center">
                        {[...brands, ...brands].map((brand, i) => (
                            <span
                                key={i}
                                className="mx-12 text-2xl md:text-3xl font-black text-foreground/20 hover:text-primary/40 transition-colors duration-300 cursor-default select-none uppercase tracking-tighter italic"
                                style={{ fontFamily: 'var(--font-serif)' }}
                            >
                                {brand}
                            </span>
                        ))}
                    </div>
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
