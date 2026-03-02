import { useState, useRef, useLayoutEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { toast } from 'sonner';
import gsap from 'gsap';
import { useAuth } from '@/context/AuthContext';
import { GoogleIcon } from '@/assets/GoogleIcon';
import Logo from '@/assets/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

/* ── Floating testimonial card ── */
const TestimonialCard = ({ quote, name, role, cardRef }) => (
    <div
        ref={cardRef}
        className="absolute bg-white/12 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-lg"
        style={{ maxWidth: '320px' }}
    >
        <div className="flex gap-0.5 mb-2">
            {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 text-amber-300 fill-amber-300" />
            ))}
        </div>
        <p className="text-white/85 text-xs font-medium leading-relaxed mb-3">"{quote}"</p>
        <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-white/25 flex items-center justify-center text-white text-[10px] font-bold">
                {name[0]}
            </div>
            <div>
                <p className="text-white/90 text-[11px] font-bold">{name}</p>
                <p className="text-white/45 text-[10px]">{role}</p>
            </div>
        </div>
    </div>
);

/* ── Page ── */
const RegisterPage = () => {
    const navigate = useNavigate();
    const { register, googleLogin } = useAuth();
    const [googleLoading, setGoogleLoading] = useState(false);

    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) =>
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleRegister = async (e) => {
        e?.preventDefault();
        if (!formData.name.trim()) return toast.error('Please enter your full name.');
        if (!formData.email.trim()) return toast.error('Please enter your email address.');
        if (!formData.password) return toast.error('Please enter a password.');
        if (formData.password.length < 8) return toast.error('Password must be at least 8 characters.');
        try {
            setLoading(true);
            const success = await register(formData);
            if (success) {
                toast.success('Welcome to Todoify! 🎉');
                navigate('/app/inbox');
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleRegister = async () => {
        try {
            setGoogleLoading(true);
            const success = await googleLogin();
            if (success) {
                toast.success('Welcome to Todoify! 🎉');
                navigate('/app/inbox');
            }
        } catch (err) {
            if (err?.code !== 'auth/popup-closed-by-user') {
                toast.error(err?.response?.data?.message || 'Google sign-up failed. Please try again.');
            }
        } finally {
            setGoogleLoading(false);
        }
    };

    /* password strength 0–4 */
    const strength = Math.min(4, Math.floor(formData.password.length / 2));
    const strengthColors = ['#EF4444', '#F97316', '#EAB308', '#22C55E'];

    /* ── Refs for GSAP ── */
    const formRef = useRef(null);
    const taglineRef = useRef(null);
    const orbRef1 = useRef(null);
    const orbRef2 = useRef(null);
    const cardRefs = useRef([]);

    const testimonials = [
        { quote: "Todoify completely changed how I manage my day. I get so much more done.", name: "Sarah K.", role: "Product Designer", pos: { top: '4%', left: '2%' } },
        { quote: "Finally a task app that doesn't feel overwhelming. Clean, fast, perfect.", name: "Marcus T.", role: "Engineering Lead", pos: { top: '46%', left: '12%' } },
    ];

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            /* ── Orb pulse ── */
            [orbRef1, orbRef2].forEach((ref, i) => {
                gsap.to(ref.current, {
                    opacity: 0.28, scale: 1.07,
                    duration: 4, ease: 'sine.inOut',
                    yoyo: true, repeat: -1, delay: i * 2,
                });
            });

            /* ── Floating testimonial cards ── */
            cardRefs.current.forEach((el, i) => {
                if (!el) return;
                gsap.to(el, {
                    y: -14, rotation: 1,
                    duration: 3.5 + i * 0.5,
                    ease: 'sine.inOut',
                    yoyo: true, repeat: -1,
                    delay: i * 0.7,
                });
            });

            /* ── Left tagline entrance ── */
            gsap.from(taglineRef.current, {
                opacity: 0, y: 30,
                duration: 0.8, ease: 'power3.out', delay: 0.2,
            });

            /* ── Right form staggered entrance ── */
            gsap.from(Array.from(formRef.current.children), {
                opacity: 0, y: 22,
                duration: 0.55, ease: 'power3.out',
                stagger: 0.09,
            });

        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="min-h-screen flex">

            {/* ── LEFT: Brand panel ── */}
            <div
                className="hidden lg:flex lg:w-[52%] sticky top-0 h-screen flex-col justify-between p-12 overflow-hidden"
                style={{ background: 'linear-gradient(145deg, var(--primary) 0%, color-mix(in oklch, var(--primary), black 25%) 40%, color-mix(in oklch, var(--primary), black 48%) 100%)' }}
            >
                {/* BG: dot grid */}
                <div className="absolute inset-0 opacity-[0.07]"
                    style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
                {/* BG: diagonal shimmer */}
                <div className="absolute inset-0 opacity-[0.04]"
                    style={{ background: 'repeating-linear-gradient(135deg, transparent, transparent 40px, rgba(255,255,255,0.5) 40px, rgba(255,255,255,0.5) 41px)' }} />
                {/* BG: atmospheric orbs */}
                <div ref={orbRef1} className="absolute top-[-15%] right-[-10%] w-[520px] h-[520px] rounded-full opacity-[0.15]"
                    style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)' }} />
                <div ref={orbRef2} className="absolute bottom-[-10%] left-[-10%] w-[420px] h-[420px] rounded-full opacity-[0.12]"
                    style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)' }} />

                {/* Floating testimonials */}
                <div className="relative z-10 flex-1 flex items-center">
                    <div className="relative w-full h-[340px]">
                        {testimonials.map((t, i) => (
                            <div key={i} className="absolute" style={t.pos}>
                                <TestimonialCard
                                    quote={t.quote}
                                    name={t.name}
                                    role={t.role}
                                    cardRef={(el) => (cardRefs.current[i] = el)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats + tagline */}
                <div ref={taglineRef} className="relative z-10">
                    <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-5">
                        Join thousands of organised teams
                    </p>
                    <div className="flex gap-10">
                        {[
                            { val: '10K+', label: 'Active users' },
                            { val: '2M+', label: 'Tasks completed' },
                            { val: '4.9★', label: 'Rating' },
                        ].map((s) => (
                            <div key={s.label} className="flex flex-col">
                                <span className="text-white text-2xl font-black">{s.val}</span>
                                <span className="text-white/50 text-xs font-semibold">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── RIGHT: Form panel ── */}
            <div className="flex-1 flex flex-col items-center justify-center bg-background px-6 py-12">
                <div ref={formRef} className="w-full max-w-[400px] flex flex-col gap-0">

                    {/* Logo */}
                    <div className="mb-6">
                        <Link to="/" className="inline-block hover:opacity-80 transition-opacity">
                            <Logo size="w-36" />
                        </Link>
                    </div>

                    {/* Heading */}
                    <div className="mb-7">
                        <h1 className="text-[1.9rem] font-black text-foreground tracking-tight leading-tight">
                            Create your account
                        </h1>
                        <p className="text-muted-foreground text-sm font-medium mt-1.5">
                            Free forever. No credit card required.
                        </p>
                    </div>

                    {/* Card */}
                    <Card className="border-border shadow-sm bg-card gap-0 py-0">
                        <CardContent className="pt-6 pb-6 space-y-5">

                            {/* Google */}
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleGoogleRegister}
                                disabled={googleLoading || loading}
                                className="w-full h-11 gap-3 bg-card text-foreground hover:border-primary/40 hover:bg-accent font-semibold"
                            >
                                {googleLoading ? (
                                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                    </svg>
                                ) : (
                                    <GoogleIcon />
                                )}
                                Sign up with Google
                            </Button>

                            {/* Divider */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-border" />
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="bg-card px-4 text-[11px] text-muted-foreground font-bold uppercase tracking-widest">
                                        or with email
                                    </span>
                                </div>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleRegister} className="space-y-4">

                                {/* Full name */}
                                <div className="space-y-1.5">
                                    <Label htmlFor="name" className="text-[11px] font-black text-secondary-foreground uppercase tracking-widest">
                                        Full name
                                    </Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="Alex Johnson"
                                            value={formData.name}
                                            onChange={handleChange}
                                            autoComplete="name"
                                            className="pl-9 h-11 bg-muted border-border focus-visible:border-primary focus-visible:ring-primary/20 text-foreground"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-1.5">
                                    <Label htmlFor="email" className="text-[11px] font-black text-secondary-foreground uppercase tracking-widest">
                                        Email address
                                    </Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            autoComplete="email"
                                            className="pl-9 h-11 bg-muted border-border focus-visible:border-primary focus-visible:ring-primary/20 text-foreground"
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="space-y-1.5">
                                    <Label htmlFor="password" className="text-[11px] font-black text-secondary-foreground uppercase tracking-widest">
                                        Password
                                    </Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            id="password"
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Min. 8 characters"
                                            value={formData.password}
                                            onChange={handleChange}
                                            autoComplete="new-password"
                                            className="pl-9 pr-10 h-11 bg-muted border-border focus-visible:border-primary focus-visible:ring-primary/20 text-foreground"
                                        />
                                        <button
                                            type="button"
                                            tabIndex={-1}
                                            onClick={() => setShowPassword((p) => !p)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>

                                    {/* Password strength bar */}
                                    {formData.password.length > 0 && (
                                        <div className="flex gap-1 mt-1.5">
                                            {[...Array(4)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="h-1 flex-1 rounded-full transition-all duration-300"
                                                    style={{ background: i < strength ? strengthColors[strength - 1] : 'var(--border)' }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Submit */}
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-md shadow-primary/20 transition-all group"
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                            </svg>
                                            Creating account…
                                        </span>
                                    ) : (
                                        <>
                                            Create free account
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                        </>
                                    )}
                                </Button>
                            </form>

                            {/* T&C */}
                            <div className="flex items-start gap-2 pt-1">
                                <ShieldCheck className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">
                                    By creating an account you agree to our{' '}
                                    <span className="text-foreground font-bold cursor-pointer hover:text-primary transition-colors">Terms of Service</span>
                                    {' '}and{' '}
                                    <span className="text-foreground font-bold cursor-pointer hover:text-primary transition-colors">Privacy Policy</span>.
                                </p>
                            </div>

                            {/* Footer link */}
                            <p className="text-center text-sm text-muted-foreground font-medium">
                                Already have an account?{' '}
                                <Link to="/app/login" className="text-primary font-bold hover:text-primary/80 transition-colors">
                                    Sign in
                                </Link>
                            </p>

                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
