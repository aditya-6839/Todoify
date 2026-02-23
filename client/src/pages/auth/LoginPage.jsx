import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, CheckCircle2, Circle, ArrowRight, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { GoogleIcon } from '@/assets/GoogleIcon';
import Logo from '@/components/layout/Logo';


// ─── Floating task card for the left panel ────────────────────────────────────
const TaskCard = ({ text, done, delay, top, left }) => (
    <div
        className="absolute flex items-center gap-3 bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 shadow-lg"
        style={{
            top,
            left,
            animation: `floatCard 6s ease-in-out ${delay}s infinite alternate`,
            minWidth: '220px',
        }}
    >
        {done
            ? <CheckCircle2 className="w-5 h-5 text-white/90 shrink-0" />
            : <Circle className="w-5 h-5 text-white/50 shrink-0" />
        }
        <span className={`text-sm font-medium ${done ? 'line-through text-white/50' : 'text-white/90'}`}>
            {text}
        </span>
    </div>
);

// ─── Input field with icon ────────────────────────────────────────────────────
const AuthInput = ({ id, name, type, placeholder, value, onChange, icon: Icon, rightEl }) => (
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
            autoComplete={id}
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
const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

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
                @keyframes spinSlow {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
                @keyframes pulseSoft {
                    0%, 100% { opacity: 0.15; transform: scale(1); }
                    50%      { opacity: 0.28; transform: scale(1.07); }
                }
                .fade-up  { animation: fadeUp 0.55s cubic-bezier(.22,1,.36,1) both; }
                .fade-up-1 { animation-delay: 0.05s; }
                .fade-up-2 { animation-delay: 0.12s; }
                .fade-up-3 { animation-delay: 0.19s; }
                .fade-up-4 { animation-delay: 0.26s; }
                .fade-up-5 { animation-delay: 0.33s; }
                .spin-slow  { animation: spinSlow 20s linear infinite; }
                .pulse-soft { animation: pulseSoft 4s ease-in-out infinite; }
            `}</style>

            <div className="min-h-screen flex items-start">

                {/* ── LEFT: Brand panel ── */}
                <div
                    className="hidden lg:flex lg:w-[52%] sticky top-0 h-screen relative flex-col justify-between p-12 overflow-hidden"
                    style={{ background: 'linear-gradient(145deg, #C96442 0%, #A84E32 40%, #7A3521 100%)' }}
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
                        style={{ background: 'radial-gradient(circle, #F0956E 0%, transparent 70%)' }} />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[420px] h-[420px] rounded-full pulse-soft"
                        style={{ background: 'radial-gradient(circle, #E8795A 0%, transparent 70%)', animationDelay: '2s' }} />
                    <div className="absolute top-[38%] left-[42%] w-[260px] h-[260px] rounded-full opacity-10"
                        style={{ background: 'radial-gradient(circle, #FFB899 0%, transparent 70%)' }} />
                    {/* ── BG: spinning rings ── */}
                    <div className="absolute top-[-80px] right-[-80px] w-[340px] h-[340px] rounded-full border border-white/10 spin-slow" />
                    <div className="absolute bottom-[-60px] left-[-60px] w-[260px] h-[260px] rounded-full border border-white/10 spin-slow" style={{ animationDirection: 'reverse' }} />
                    {/* Floating task cards */}
                    <div className="relative z-10 flex-1 flex items-center">
                        <div className="relative w-full h-[360px]">
                            <TaskCard text="Review Q4 project report" done={true} delay={0} top="5%" left="5%" />
                            <TaskCard text="Design sprint planning" done={false} delay={1.2} top="28%" left="18%" />
                            <TaskCard text="Send team weekly updates" done={true} delay={0.6} top="52%" left="3%" />
                            <TaskCard text="Prepare client presentation" done={false} delay={1.8} top="72%" left="15%" />
                        </div>
                    </div>

                    {/* Tagline */}
                    <div className="relative z-10">
                        <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3 flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5" /> Trusted by 10,000+ teams
                        </p>
                        <h2 className="text-white text-4xl font-black leading-tight tracking-tight">
                            Your tasks,<br />beautifully<br />organised.
                        </h2>
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
                            <h1 className="text-[2rem] font-black text-[#3D3929] tracking-tight leading-tight">Welcome back</h1>
                            <p className="text-[#A89F93] text-sm font-medium mt-1.5">Sign in to continue to your workspace</p>
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
                                Continue with Google
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="relative my-6 fade-up fade-up-2">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[#E2DDD6]" />
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-[#FAF9F5] px-4 text-[11px] text-[#A89F93] font-bold uppercase tracking-widest">
                                    or
                                </span>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleLogin} className="space-y-4">
                            {/* Email */}
                            <div className="fade-up fade-up-3">
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
                                    icon={Mail}
                                />
                            </div>

                            {/* Password */}
                            <div className="fade-up fade-up-4">
                                <div className="flex items-center justify-between mb-2">
                                    <label htmlFor="password" className="block text-[11px] font-black text-[#7A7060] uppercase tracking-widest">
                                        Password
                                    </label>
                                    <Link to="#" className="text-[11px] font-bold text-[#C96442] hover:text-[#A84E32] transition-colors">
                                        Forgot password?
                                    </Link>
                                </div>
                                <AuthInput
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
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
                            </div>

                            {/* Submit */}
                            <div className="pt-2 fade-up fade-up-5">
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
                                            Signing in…
                                        </span>
                                    ) : (
                                        <>
                                            Sign in
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                        {/* Footer */}
                        <p className="mt-8 text-center text-sm text-[#A89F93] font-medium fade-up fade-up-5">
                            Don't have an account?{' '}
                            <Link to="/app/register" className="text-[#C96442] font-bold hover:text-[#A84E32] transition-colors">
                                Create one free
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
