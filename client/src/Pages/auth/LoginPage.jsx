import { useState, useRef, useLayoutEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, CheckCircle2, Circle, ArrowRight, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import gsap from 'gsap';
import { useAuth } from '@/context/AuthContext';
import { GoogleIcon } from '@/assets/icons/GoogleIcon';
import Logo from '@/assets/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';

/* ── Floating task card ── */
const TaskCard = ({ text, done, cardRef }) => (
    <div
        ref={cardRef}
        className="absolute flex items-center gap-3 bg-white/15 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 shadow-lg"
        style={{ minWidth: '220px' }}
    >
        {done
            ? <CheckCircle2 className="w-4 h-4 text-white/90 shrink-0" />
            : <Circle className="w-4 h-4 text-white/50 shrink-0" />}
        <span className={`text-sm font-medium ${done ? 'line-through text-white/50' : 'text-white/90'}`}>{text}</span>
    </div>
);

/* ── Page ── */
const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, googleLogin } = useAuth();
    const [googleLoading, setGoogleLoading] = useState(false);

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const from = location.state?.from?.pathname || '/app/inbox';

    const handleChange = (e) =>
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleLogin = async (e) => {
        e?.preventDefault();
        if (!formData.email.trim()) return toast.error('Please enter your email.');
        if (!formData.password) return toast.error('Please enter your password.');
        try {
            setLoading(true);
            const success = await login(formData);
            if (success) {
                toast.success('Welcome back! 👋');
                navigate(from, { replace: true });
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setGoogleLoading(true);
            const success = await googleLogin();
            if (success) {
                toast.success('Welcome back! 👋');
                navigate(from, { replace: true });
            }
        } catch (err) {
            if (err?.code !== 'auth/popup-closed-by-user') {
                toast.error(err?.response?.data?.message || 'Google sign-in failed. Please try again.');
            }
        } finally {
            setGoogleLoading(false);
        }
    };

    /* ── Refs for GSAP ── */
    const panelRef = useRef(null);   // left brand panel
    const formRef = useRef(null);   // right form container
    const orbRef1 = useRef(null);
    const orbRef2 = useRef(null);
    const taglineRef = useRef(null);

    const cardRefs = useRef([]);
    const cardData = [
        { text: 'Review Q4 project report', done: true, pos: { top: '5%', left: '5%' } },
        { text: 'Design sprint planning', done: false, pos: { top: '28%', left: '18%' } },
        { text: 'Send team weekly updates', done: true, pos: { top: '52%', left: '3%' } },
        { text: 'Prepare client presentation', done: false, pos: { top: '72%', left: '15%' } },
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

            /* ── Floating task cards ── */
            cardRefs.current.forEach((el, i) => {
                if (!el) return;
                gsap.to(el, {
                    y: -14, rotation: 1,
                    duration: 3 + i * 0.4,
                    ease: 'sine.inOut',
                    yoyo: true, repeat: -1,
                    delay: i * 0.5,
                });
            });

            /* ── Left panel tagline entrance ── */
            gsap.from(taglineRef.current, {
                opacity: 0, y: 30,
                duration: 0.8, ease: 'power3.out', delay: 0.2,
            });

            /* ── Right panel staggered entrance ── */
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
                ref={panelRef}
                className="hidden lg:flex lg:w-[52%] sticky top-0 h-screen flex-col justify-between p-12 overflow-hidden"
                style={{ background: 'linear-gradient(145deg, var(--primary) 0%, color-mix(in oklch, var(--primary), black 25%) 40%, color-mix(in oklch, var(--primary), black 45%) 100%)' }}
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

                {/* Floating task cards */}
                <div className="relative z-10 flex-1 flex items-center">
                    <div className="relative w-full h-[360px]">
                        {cardData.map((c, i) => (
                            <div key={i} className="absolute" style={c.pos}>
                                <TaskCard
                                    text={c.text}
                                    done={c.done}
                                    cardRef={(el) => (cardRefs.current[i] = el)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tagline */}
                <div ref={taglineRef} className="relative z-10">
                    <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5" /> Trusted by 10,000+ teams
                    </p>
                    <h2 className="text-white text-4xl font-black leading-tight tracking-tight">
                        Your tasks,<br />beautifully<br />organised.
                    </h2>
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
                            Welcome back
                        </h1>
                        <p className="text-muted-foreground text-sm font-medium mt-1.5">
                            Sign in to continue to your workspace
                        </p>
                    </div>

                    {/* Card */}
                    <Card className="border-border shadow-sm bg-card gap-0 py-0">
                        <CardContent className="pt-6 pb-6 space-y-5">

                            {/* Google */}
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleGoogleLogin}
                                disabled={googleLoading || loading}
                                className="w-full h-11 gap-3 bg-card text-foreground hover:border-primary/40 hover:bg-accent font-semibold"
                            >
                                {googleLoading ? (
                                    <Spinner className="w-4 h-4" />
                                ) : (
                                    <GoogleIcon />
                                )}
                                Continue with Google
                            </Button>

                            {/* Divider */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-border" />
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="bg-card px-4 text-[11px] text-muted-foreground font-bold uppercase tracking-widest">
                                        or
                                    </span>
                                </div>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleLogin} className="space-y-4">

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
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password" className="text-[11px] font-black text-secondary-foreground uppercase tracking-widest">
                                            Password
                                        </Label>
                                        <Link to="#" className="text-[11px] text-primary font-bold hover:text-primary/80 transition-colors">
                                            Forgot password?
                                        </Link>
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            id="password"
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={handleChange}
                                            autoComplete="current-password"
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
                                </div>

                                {/* Submit */}
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-md shadow-primary/20 transition-all group"
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <Spinner className="w-4 h-4" />
                                            Signing in…
                                        </span>
                                    ) : (
                                        <>
                                            Sign in
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                        </>
                                    )}
                                </Button>
                            </form>

                            {/* Footer link */}
                            <p className="text-center text-sm text-muted-foreground font-medium">
                                Don't have an account?{' '}
                                <Link to="/app/register" className="text-primary font-bold hover:text-primary/80 transition-colors">
                                    Create one free
                                </Link>
                            </p>

                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
