import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { GoogleIcon } from '@/assets/GoogleIcon';
import Logo from '@/assets/Logo';

// ─── Testimonial card for the left panel ─────────────────────────────────────
const TestimonialCard = ({ quote, name, role, delay, top, left }) => (
    <div
        className="absolute bg-white/12 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-lg"
        style={{
            top,
            left,
            maxWidth: '260px',
            animation: `floatCard 7s ease-in-out ${delay}s infinite alternate`,
        }}
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

// ─── Stat badge ───────────────────────────────────────────────────────────────
const StatBadge = ({ value, label }) => (
    <div className="flex flex-col">
        <span className="text-white text-2xl font-black">{value}</span>
        <span className="text-white/50 text-xs font-semibold">{label}</span>
    </div>
);


// ─── Input field with icon ────────────────────────────────────────────────────
const AuthInput = ({ id, name, type, placeholder, value, onChange, autoComplete, icon: Icon, rightEl }) => (
    <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C96442]/40 group-focus-within:text-[#C96442] transition-colors duration-200">
            <Icon className="w-[18px] h-[18px]" />
        </div>
        <input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            autoComplete={autoComplete || id}
            className="w-full h-12 pl-11 pr-11 bg-[#F5F3EE] border border-[#E2DDD6] rounded-xl text-[#3D3929] placeholder-[#A89F93] text-sm font-medium
                       focus:outline-none focus:border-[#C96442] focus:bg-white focus:ring-2 focus:ring-[#C96442]/10
                       transition-all duration-200"
        />
        {rightEl && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                {rightEl}
            </div>
        )}
    </div>
);

// ─── Page ────────────────────────────────────────────────────────────────────
const RegisterPage = () => {
    const navigate = useNavigate();
    const { register } = useAuth();

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

    return (
        <>
            {/* Keyframe injection */}
            <style>{`
                @keyframes floatCard {
                    from { transform: translateY(0px) rotate(-1deg); }
                    to   { transform: translateY(-14px) rotate(1deg); }
                }
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .fade-up  { animation: fadeUp 0.55s cubic-bezier(.22,1,.36,1) both; }
                .fade-up-1 { animation-delay: 0.05s; }
                .fade-up-2 { animation-delay: 0.12s; }
                .fade-up-3 { animation-delay: 0.19s; }
                .fade-up-4 { animation-delay: 0.26s; }
                .fade-up-5 { animation-delay: 0.33s; }
                .fade-up-6 { animation-delay: 0.40s; }
                @keyframes spinSlow {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
                @keyframes pulseSoft {
                    0%, 100% { opacity: 0.15; transform: scale(1); }
                    50%      { opacity: 0.28; transform: scale(1.07); }
                }
                .spin-slow  { animation: spinSlow 20s linear infinite; }
                .pulse-soft { animation: pulseSoft 4s ease-in-out infinite; }
            `}</style>

            <div className="min-h-screen flex items-start">

                {/* ── LEFT: Brand panel ── */}
                <div
                    className="hidden lg:flex lg:w-[52%] sticky top-0 h-screen relative flex-col justify-between p-12 overflow-hidden"
                    style={{ background: 'linear-gradient(145deg, #B85A3A 0%, #9A4328 40%, #6B2D18 100%)' }}
                >
                    {/* ── BG: dot grid ── */}
                    <div className="absolute inset-0 opacity-[0.07]" style={{
                        backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                        backgroundSize: '28px 28px',
                    }} />
                    {/* ── BG: diagonal shimmer ── */}
                    <div className="absolute inset-0 opacity-[0.05]" style={{
                        background: 'repeating-linear-gradient(135deg, transparent, transparent 40px, rgba(255,255,255,0.5) 40px, rgba(255,255,255,0.5) 41px)',
                    }} />
                    {/* ── BG: atmospheric orbs ── */}
                    <div className="absolute top-[-15%] right-[-10%] w-[520px] h-[520px] rounded-full pulse-soft"
                        style={{ background: 'radial-gradient(circle, #E8795A 0%, transparent 70%)' }} />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[420px] h-[420px] rounded-full pulse-soft"
                        style={{ background: 'radial-gradient(circle, #C96442 0%, transparent 70%)', animationDelay: '2s' }} />
                    <div className="absolute top-[40%] left-[38%] w-[240px] h-[240px] rounded-full opacity-10"
                        style={{ background: 'radial-gradient(circle, #FFB899 0%, transparent 70%)' }} />
                    {/* ── BG: spinning rings ── */}
                    <div className="absolute top-[-80px] right-[-80px] w-[340px] h-[340px] rounded-full border border-white/10 spin-slow" />
                    <div className="absolute bottom-[-60px] left-[-60px] w-[260px] h-[260px] rounded-full border border-white/10 spin-slow" style={{ animationDirection: 'reverse' }} />
                    {/* Testimonial cards */}
                    <div className="relative z-10 flex-1 flex items-center">
                        <div className="relative w-full h-[340px]">
                            <TestimonialCard
                                quote="Todoify completely changed how I manage my day. I get so much more done."
                                name="Sarah K."
                                role="Product Designer"
                                delay={0}
                                top="4%"
                                left="2%"
                            />
                            <TestimonialCard
                                quote="Finally a task app that doesn't feel overwhelming. Clean, fast, perfect."
                                name="Marcus T."
                                role="Engineering Lead"
                                delay={1.5}
                                top="46%"
                                left="12%"
                            />
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="relative z-10">
                        <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-5">
                            Join thousands of organised teams
                        </p>
                        <div className="flex gap-10">
                            <StatBadge value="10K+" label="Active users" />
                            <StatBadge value="2M+" label="Tasks completed" />
                            <StatBadge value="4.9★" label="Rating" />
                        </div>
                    </div>
                </div>

                {/* ── RIGHT: Form panel ── */}
                <div className="flex-1 flex flex-col items-center justify-center bg-[#FAF9F5] px-6 py-12">
                    <div className="w-full max-w-[400px]">

                        {/* Logo — always visible on right cream panel */}
                        <div className="mb-4 fade-up fade-up-1">
                            <Link to="/" className="inline-block hover:opacity-80 transition-opacity">
                                <Logo size="w-36" />
                            </Link>
                        </div>

                        {/* Heading */}
                        <div className="mb-8 fade-up fade-up-1">
                            <h1 className="text-[2rem] font-black text-[#3D3929] tracking-tight leading-tight">Create your account</h1>
                            <p className="text-[#A89F93] text-sm font-medium mt-1.5">Free forever. No credit card required.</p>
                        </div>

                        {/* Google button */}
                        <div className="fade-up fade-up-2">
                            <button
                                type="button"
                                className="w-full flex items-center justify-center gap-3 h-12 bg-white border border-[#E2DDD6] rounded-xl
                                           text-[#3D3929] text-sm font-semibold shadow-sm
                                           hover:border-[#C96442]/40 hover:shadow-md active:scale-[0.98]
                                           transition-all duration-200"
                            >
                                <GoogleIcon />
                                Sign up with Google
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="relative my-6 fade-up fade-up-2">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[#E2DDD6]" />
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-[#FAF9F5] px-4 text-[11px] text-[#A89F93] font-bold uppercase tracking-widest">
                                    or with email
                                </span>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleRegister} className="space-y-4">

                            {/* Full name */}
                            <div className="fade-up fade-up-3">
                                <label htmlFor="name" className="block text-[11px] font-black text-[#7A7060] uppercase tracking-widest mb-2">
                                    Full name
                                </label>
                                <AuthInput
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Alex Johnson"
                                    value={formData.name}
                                    onChange={handleChange}
                                    autoComplete="name"
                                    icon={User}
                                />
                            </div>

                            {/* Email */}
                            <div className="fade-up fade-up-4">
                                <label htmlFor="email" className="block text-[11px] font-black text-[#7A7060] uppercase tracking-widest mb-2">
                                    Email address
                                </label>
                                <AuthInput
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    icon={Mail}
                                />
                            </div>

                            {/* Password */}
                            <div className="fade-up fade-up-5">
                                <label htmlFor="password" className="block text-[11px] font-black text-[#7A7060] uppercase tracking-widest mb-2">
                                    Password
                                </label>
                                <AuthInput
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Min. 8 characters"
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                    icon={Lock}
                                    rightEl={
                                        <button
                                            type="button"
                                            tabIndex={-1}
                                            onClick={() => setShowPassword((p) => !p)}
                                            className="text-[#A89F93] hover:text-[#C96442] transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    }
                                />
                                {/* Password strength hint */}
                                {formData.password.length > 0 && (
                                    <div className="mt-2 flex gap-1">
                                        {[...Array(4)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="h-1 flex-1 rounded-full transition-all duration-300"
                                                style={{
                                                    background: formData.password.length >= (i + 1) * 2
                                                        ? i < 1 ? '#EF4444' : i < 2 ? '#F97316' : i < 3 ? '#EAB308' : '#22C55E'
                                                        : '#E2DDD6',
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Submit */}
                            <div className="pt-2 fade-up fade-up-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-12 flex items-center justify-center gap-2 rounded-xl
                                               bg-[#C96442] text-white text-sm font-bold
                                               hover:bg-[#B55538] active:scale-[0.98]
                                               shadow-lg shadow-[#C96442]/25 hover:shadow-xl hover:shadow-[#C96442]/30
                                               disabled:opacity-60 disabled:cursor-not-allowed
                                               transition-all duration-200 group"
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
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                        {/* T&C */}
                        <div className="mt-5 flex items-start gap-2 fade-up fade-up-6">
                            <ShieldCheck className="w-4 h-4 text-[#C96442] mt-0.5 shrink-0" />
                            <p className="text-[11px] text-[#A89F93] font-medium leading-relaxed">
                                By creating an account you agree to our{' '}
                                <span className="text-[#3D3929] font-bold cursor-pointer hover:text-[#C96442] transition-colors">Terms of Service</span>
                                {' '}and{' '}
                                <span className="text-[#3D3929] font-bold cursor-pointer hover:text-[#C96442] transition-colors">Privacy Policy</span>.
                            </p>
                        </div>

                        {/* Footer */}
                        <p className="mt-7 text-center text-sm text-[#A89F93] font-medium fade-up fade-up-6">
                            Already have an account?{' '}
                            <Link to="/app/login" className="text-[#C96442] font-bold hover:text-[#A84E32] transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;
