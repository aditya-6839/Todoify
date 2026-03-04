import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star, CheckCircle2, TrendingUp } from 'lucide-react';
import AppStoreIcon from '@/assets/icons/AppStoreIcon';
import GooglePlayIcon from '@/assets/icons/GooglePlayIcon';


const HeroSection = () => {
    return (
        <section
            className="relative flex items-center overflow-hidden"
            style={{ backgroundColor: 'var(--background)' }}
        >
            {/* ── Square grid background ── */}
            <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage: `linear-gradient(color-mix(in oklch, var(--foreground) 5%, transparent) 1px, transparent 1px),
                                      linear-gradient(90deg, color-mix(in oklch, var(--foreground) 5%, transparent) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />
            {/* Corner radial fade to blend grid with bg */}
            <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                    background: `radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, var(--background) 100%)`
                }}
            />

            {/* Large — top left, near headline */}
            <span
                aria-hidden="true"
                className="absolute top-[18%] left-[3%] pointer-events-none select-none z-10 hidden lg:block"
                style={{ fontSize: '2rem', color: 'var(--chart-2)', animation: 'sparkle-pulse 3.2s ease-in-out infinite' }}
            >✦</span>

            {/* Medium — left side, below headline */}
            <span
                aria-hidden="true"
                className="absolute top-[58%] left-[6%] pointer-events-none select-none z-10 hidden md:block"
                style={{ fontSize: '1.1rem', color: 'color-mix(in oklch, var(--primary) 60%, transparent)', animation: 'sparkle-pulse 4s ease-in-out 0.6s infinite' }}
            >✦</span>

            {/* Small — far left bottom */}
            <span
                aria-hidden="true"
                className="absolute bottom-[12%] left-[2%] pointer-events-none select-none z-10"
                style={{ fontSize: '0.75rem', color: 'color-mix(in oklch, var(--chart-2) 70%, transparent)', animation: 'sparkle-pulse 2.8s ease-in-out 1.2s infinite' }}
            >✦</span>

            {/* XL — top right area, behind mockup */}
            <span
                aria-hidden="true"
                className="absolute top-[8%] right-[4%] pointer-events-none select-none z-0 hidden sm:block"
                style={{ fontSize: '2.6rem', color: 'color-mix(in oklch, var(--primary) 25%, transparent)', animation: 'sparkle-pulse 5s ease-in-out 0.3s infinite' }}
            >✦</span>

            {/* Medium — top center */}
            <span
                aria-hidden="true"
                className="absolute top-[6%] left-[48%] pointer-events-none select-none z-0 hidden lg:block"
                style={{ fontSize: '1.3rem', color: 'color-mix(in oklch, var(--chart-2) 50%, transparent)', animation: 'sparkle-pulse 3.8s ease-in-out 1.9s infinite' }}
            >✦</span>

            {/* Small — right side mid */}
            <span
                aria-hidden="true"
                className="absolute top-[45%] right-[2%] pointer-events-none select-none z-10"
                style={{ fontSize: '0.9rem', color: 'color-mix(in oklch, var(--primary) 45%, transparent)', animation: 'sparkle-pulse 3s ease-in-out 2.4s infinite' }}
            >✦</span>

            {/* Medium — bottom center-right */}
            <span
                aria-hidden="true"
                className="absolute bottom-[8%] right-[18%] pointer-events-none select-none z-10"
                style={{ fontSize: '1.5rem', color: 'color-mix(in oklch, var(--chart-2) 80%, transparent)', animation: 'sparkle-pulse 4.2s ease-in-out 0.9s infinite' }}
            >✦</span>

            {/* XS — bottom left corner */}
            <span
                aria-hidden="true"
                className="absolute bottom-[4%] left-[14%] pointer-events-none select-none z-10"
                style={{ fontSize: '0.6rem', color: 'var(--primary)', animation: 'sparkle-pulse 2.5s ease-in-out 3s infinite' }}
            >✦</span>

            {/* ── Main grid ── */}
            <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-24 lg:py-32 w-full grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24 items-center">

                {/* ════ LEFT: Copy ════ */}
                <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-7 md:gap-9">

                    {/* Badge */}
                    <div
                        className="flex items-center gap-2 w-fit px-4 py-2 rounded-full border text-[0.8rem] md:text-[0.85rem] font-bold"
                        style={{
                            borderColor: 'var(--primary)',
                            color: 'var(--primary)',
                            backgroundColor: 'color-mix(in oklch, var(--primary) 8%, transparent)',
                            fontFamily: 'var(--font-sans)',
                        }}
                    >
                        {/* Pulse dot */}
                        <span className="relative flex h-2.5 w-2.5">
                            <span
                                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                                style={{ backgroundColor: 'var(--primary)' }}
                            />
                            <span
                                className="relative inline-flex rounded-full h-2.5 w-2.5"
                                style={{ backgroundColor: 'var(--primary)' }}
                            />
                        </span>
                        Trusted by 50+ million professionals
                    </div>

                    {/* Headline */}
                    <h1
                        className="font-black leading-[1.04] tracking-tight m-0"
                        style={{
                            fontSize: 'clamp(3rem, 7vw, 5.2rem)',
                            fontFamily: 'var(--font-serif)',
                            color: 'var(--foreground)',
                        }}
                    >
                        Organize life,<br />
                        <span className="text-primary">get things done.</span>
                    </h1>

                    {/* Subtext */}
                    <p
                        className="leading-relaxed max-w-[480px] m-0"
                        style={{
                            fontSize: 'clamp(1.05rem, 1.2vw, 1.25rem)',
                            fontFamily: 'var(--font-sans)',
                            color: 'var(--muted-foreground)',
                        }}
                    >
                        Todoify helps you capture tasks, manage projects, and collaborate
                        with your team — all in one beautifully simple workspace.
                    </p>

                    {/* Reviews pill */}
                    <div className="flex items-center gap-3 flex-wrap justify-center lg:justify-start w-fit px-5 py-2.5 border border-border rounded-full bg-secondary/50 backdrop-blur-sm">
                        <div className="flex items-center gap-1.5 border-r pr-3 border-border">
                            <AppStoreIcon className="w-4.5 h-4.5 text-muted-foreground" />
                            <GooglePlayIcon className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[0.85rem] font-extrabold text-foreground" style={{ fontFamily: 'var(--font-sans)' }}>
                                374K+
                            </span>
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-3.5 h-3.5"
                                        fill="currentColor"
                                        style={{ color: 'var(--chart-2)' }}
                                    />
                                ))}
                            </div>
                            <span className="text-[0.85rem] font-bold text-muted-foreground" style={{ fontFamily: 'var(--font-sans)' }}>
                                reviews
                            </span>
                        </div>
                    </div>

                    {/* CTA group */}
                    <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 mt-2">
                        {/* Wrapper provides the coloured shadow */}
                        <div
                            className="rounded-xl w-full sm:w-auto"
                            style={{ boxShadow: '0 12px 32px color-mix(in oklch, var(--primary) 30%, transparent)' }}
                        >
                            <Button
                                asChild
                                size="lg"
                                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-bold px-10 py-7 rounded-xl active:scale-[0.98] transition-all duration-200"
                                id="hero-start-for-free"
                            >
                                <Link to="/app/register">Start for free</Link>
                            </Button>
                        </div>

                        <Link
                            to="/app/login"
                            className="text-[1rem] font-bold text-muted-foreground underline-offset-8 hover:underline hover:text-foreground transition-all"
                        >
                            Already have an account?
                        </Link>
                    </div>
                </div>

                {/* ════ RIGHT: Hero.png mockup ════ */}
                <div className="relative flex items-center justify-center lg:justify-end w-full lg:pl-10">

                    {/* Floating card wrapper with enhanced shadow */}
                    <div
                        className="relative w-full max-w-[720px] rounded-[2rem] overflow-visible animate-[hero-float_6s_ease-in-out_infinite]"
                        style={{
                            filter: 'drop-shadow(0 40px 80px color-mix(in oklch, var(--foreground) 15%, transparent))',
                        }}
                    >
                        <img
                            src="/Hero.png"
                            alt="Todoify app — Today view showing tasks, projects and team collaboration"
                            className="w-full h-auto rounded-[1.5rem] border border-white/10"
                            loading="eager"
                        />
                    </div>


                    {/* ── Small floating stat card ── */}
                    <div
                        className="absolute -bottom-4 md:-bottom-8 left-4 md:-left-4 flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-2xl animate-[hero-float_6s_ease-in-out_1s_infinite] backdrop-blur-md"
                        style={{
                            backgroundColor: 'color-mix(in oklch, var(--card) 85%, transparent)',
                            borderColor: 'var(--border)',
                        }}
                    >
                        {/* Icon: green check circle */}
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: 'color-mix(in oklch, var(--primary) 12%, transparent)' }}
                        >
                            <CheckCircle2
                                className="w-5 h-5"
                                style={{ color: 'var(--primary)' }}
                            />
                        </div>
                        <div>
                            <p
                                className="text-[12px] font-extrabold m-0 leading-tight"
                                style={{ color: 'var(--foreground)', fontFamily: 'var(--font-sans)' }}
                            >
                                12 tasks done today
                            </p>
                            <div className="flex items-center gap-1.5 mt-1">
                                <TrendingUp
                                    className="w-3.5 h-3.5"
                                    style={{ color: 'var(--primary)' }}
                                />
                                <p
                                    className="text-[11px] m-0 font-bold"
                                    style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}
                                >
                                    Keep it up!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Keyframes ── */}
            <style>{`
                @keyframes hero-float {
                    0%, 100% { transform: translateY(0px); }
                    50%       { transform: translateY(-12px); }
                }
                @keyframes sparkle-pulse {
                    0%, 100% { transform: scale(1) rotate(0deg);   opacity: 0.55; }
                    33%       { transform: scale(1.3) rotate(12deg); opacity: 1; }
                    66%       { transform: scale(0.85) rotate(-8deg); opacity: 0.7; }
                }
            `}</style>
        </section>
    );
};

export default HeroSection;
