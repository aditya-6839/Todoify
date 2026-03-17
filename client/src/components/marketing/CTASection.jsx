import React from 'react';
import { Link } from 'react-router-dom';
import { Star, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const CTASection = () => {
    const { user } = useAuth();

    return (
        <section
            className="relative flex items-center justify-center overflow-hidden py-28 md:py-40"
            style={{ backgroundColor: 'var(--background)' }}
        >
            {/* ── Dotted grid background ── */}
            <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage: `radial-gradient(circle, color-mix(in oklch, var(--foreground) 20%, transparent) 1.5px, transparent 1.5px)`,
                    backgroundSize: '28px 28px',
                }}
            />
            {/* Center vignette — keep text area clean */}
            <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                    background: `radial-gradient(ellipse 60% 60% at 50% 50%, var(--background) 20%, transparent 100%)`
                }}
            />

            {/* ── Content ── */}
            <div className="relative z-10 max-w-[680px] mx-auto px-6 flex flex-col items-center text-center gap-8">

                {/* Social proof stats */}
                <div className="flex items-center gap-4 md:gap-8 flex-wrap justify-center">
                    {[
                        { value: '10K+', label: 'Active users' },
                        { value: '2M+', label: 'Tasks completed' },
                        { value: '4.9★', label: 'Average rating' },
                    ].map((stat, i, arr) => (
                        <React.Fragment key={stat.label}>
                            <div className="flex flex-col items-center">
                                <span className="text-lg font-black" style={{ color: 'var(--foreground)', fontFamily: 'var(--font-serif)' }}>
                                    {stat.value}
                                </span>
                                <span className="text-xs font-semibold" style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}>
                                    {stat.label}
                                </span>
                            </div>
                            {i < arr.length - 1 && (
                                <div className="h-8 w-px bg-border hidden sm:block" />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Headline */}
                <h2
                    className="font-black leading-[1.06] tracking-tight m-0"
                    style={{
                        fontSize: 'clamp(2.4rem, 6vw, 4.2rem)',
                        fontFamily: 'var(--font-serif)',
                        color: 'var(--foreground)',
                    }}
                >
                    The world's most loved<br />
                    <span style={{ color: 'var(--primary)' }}>productivity app.</span>
                </h2>

                {/* Subtext */}
                <p
                    className="leading-relaxed max-w-[500px] m-0"
                    style={{
                        fontSize: 'clamp(1rem, 1.4vw, 1.1rem)',
                        fontFamily: 'var(--font-sans)',
                        color: 'var(--muted-foreground)',
                    }}
                >
                    Join millions of people who trust Todoify to stay organized, focused, and productive — every single day.
                </p>

                {/* CTA group */}
                <div className="flex flex-col items-center gap-4 w-full mt-2">
                    {user ? (
                        <Link
                            to="/app/inbox"
                            id="cta-go-to-app"
                            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-10 py-4 rounded-xl active:scale-[0.98] transition-all duration-200"
                            style={{
                                boxShadow: '0 8px 28px color-mix(in oklch, var(--primary) 30%, transparent)',
                                fontFamily: 'var(--font-sans)',
                            }}
                        >
                            <LayoutDashboard className="w-5 h-5" />
                            Go to App
                        </Link>
                    ) : (
                        <>
                            <Link
                                to="/app/register"
                                id="cta-start-for-free"
                                className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-10 py-4 rounded-xl active:scale-[0.98] transition-all duration-200"
                                style={{
                                    boxShadow: '0 8px 28px color-mix(in oklch, var(--primary) 30%, transparent)',
                                    fontFamily: 'var(--font-sans)',
                                }}
                            >
                                Start for free
                            </Link>

                            <Link
                                to="/app/login"
                                className="flex items-center gap-1.5 text-sm font-semibold transition-colors"
                                style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}
                            >
                                <span>Already have an account?</span>
                                <span style={{ color: 'var(--primary)' }}>Sign in →</span>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CTASection;
