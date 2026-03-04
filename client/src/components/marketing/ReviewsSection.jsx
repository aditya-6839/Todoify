import React from 'react';

const reviews = [
    {
        quote: "Todoify has completely transformed how our team manages complex projects. It's intuitive and beautiful.",
        name: "Sarah Jenkins",
        role: "Project Manager",
        avatar: "SJ",
        color: "oklch(0.6799 0.1754 21.7423)" // Primary
    },
    {
        quote: "The best task app I've ever used. The interface is clean, and the NLP date parsing is a game changer.",
        name: "Marcus Chen",
        role: "Software Engineer",
        avatar: "MC",
        color: "oklch(0.6321 0.1875 27.2280)" // Chart-2
    },
    {
        quote: "I've tried every productivity app out there, but Todoify is the only one that actually stuck.",
        name: "Elena Rodriguez",
        role: "Creative Director",
        avatar: "ER",
        color: "oklch(0.8348 0.2502 142.9227)" // Destructive/Accent
    },
    {
        quote: "Simple, focused, and incredibly powerful. It helps me stay organized without the clutter.",
        name: "David Smith",
        role: "Freelance Designer",
        avatar: "DS",
        color: "oklch(0.6799 0.1754 21.7423)"
    }
];

const ReviewsSection = () => {
    return (
        <section
            className="relative overflow-hidden py-16 md:py-24"
            aria-label="User testimonials"
            style={{ backgroundColor: 'var(--background)' }}
        >
            {/* ── Wavy ribbon SVG background ── */}
            <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
                <svg
                    viewBox="0 0 1440 220"
                    preserveAspectRatio="none"
                    className="w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0,80 C200,160 400,20 720,90 C1040,160 1240,30 1440,100 L1440,220 L0,220 Z"
                        style={{ fill: 'color-mix(in oklch, var(--accent) 35%, transparent)' }}
                    />
                    <path
                        d="M0,100 C240,40 480,170 800,80 C1100,0 1300,140 1440,70 L1440,220 L0,220 Z"
                        style={{ fill: 'color-mix(in oklch, var(--accent) 15%, transparent)' }}
                    />
                </svg>
            </div>

            {/* ── ✦ Sparkles ── */}
            <span aria-hidden="true" className="absolute top-[10%] left-[3%] pointer-events-none select-none z-10 hidden md:block"
                style={{ fontSize: '1.5rem', color: 'var(--chart-2)', animation: 'reviews-sparkle 3.4s ease-in-out infinite' }}>✦</span>
            <span aria-hidden="true" className="absolute bottom-[12%] right-[4%] pointer-events-none select-none z-10"
                style={{ fontSize: '0.65rem', color: 'color-mix(in oklch, var(--primary) 40%, transparent)', animation: 'reviews-sparkle 2.6s ease-in-out 2s infinite' }}>✦</span>

            <div className="relative z-20 max-w-[1400px] mx-auto px-6">
                <div className="text-center mb-12 md:mb-16">
                    <h2
                        className="text-3xl md:text-4xl font-black tracking-tight mb-4"
                        style={{ fontFamily: 'var(--font-serif)', color: 'var(--foreground)' }}
                    >
                        Loved by <span style={{ color: 'var(--primary)' }}>thousands</span> of users
                    </h2>
                </div>

                {/* ── Auto-scrolling container (mobile) / Grid (desktop) ── */}
                <div className="relative group overflow-hidden">
                    <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 animate-marquee-mobile md:animate-none w-max md:w-full">
                        {/* Double the array for seamless mobile loop */}
                        {[...reviews, ...reviews].map((r, i) => (
                            <div
                                key={`${r.name}-${i}`}
                                className={`flex flex-col p-8 transition-all duration-300 hover:-translate-y-1 w-[300px] md:w-auto h-full ${i >= reviews.length ? 'md:hidden' : ''}`}
                            >
                                <blockquote
                                    className="italic leading-relaxed mb-8 flex-grow"
                                    style={{
                                        fontFamily: 'var(--font-serif)',
                                        fontSize: '1.05rem',
                                        color: 'var(--foreground)',
                                    }}
                                >
                                    "{r.quote}"
                                </blockquote>

                                <div className="flex items-center gap-4 border-t border-border/50 pt-6 mt-auto">
                                    <div
                                        className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-black shadow-inner"
                                        style={{ backgroundColor: 'color-mix(in oklch, ' + r.color + ' 15%, transparent)', color: r.color }}
                                    >
                                        {r.avatar}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>{r.name}</span>
                                        <span className="text-xs font-medium" style={{ color: 'var(--muted-foreground)' }}>{r.role}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Styles ── */}
            <style>{`
                @keyframes marquee-mobile {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-300px * 4 - 1.5rem * 4)); }
                }
                @media (max-width: 767px) {
                    .animate-marquee-mobile {
                        animation: marquee-mobile 25s linear infinite;
                    }
                    .animate-marquee-mobile:hover {
                        animation-play-state: paused;
                    }
                }
                @keyframes reviews-sparkle {
                    0%, 100% { transform: scale(1) rotate(0deg);    opacity: 0.6; }
                    35%       { transform: scale(1.35) rotate(14deg); opacity: 1;   }
                    70%       { transform: scale(0.8) rotate(-9deg); opacity: 0.75; }
                }
            `}</style>
        </section>
    );
};

export default ReviewsSection;
