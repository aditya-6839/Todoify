import { Link } from 'react-router-dom';
import { CheckCircle2, Circle, ArrowRight, Sparkles, Star, Inbox } from 'lucide-react';

const HeroTaskCard = ({ text, done, delay, style }) => (
    <div
        className="absolute flex items-center gap-3 bg-white rounded-2xl border border-[#E8E4DC] shadow-[0_8px_30px_rgba(0,0,0,0.09)] px-4 py-3"
        style={{ animation: `heroFloat 6s ease-in-out ${delay}s infinite alternate`, minWidth: '195px', ...style }}
    >
        {done
            ? <CheckCircle2 className="w-4 h-4 text-[#C96442] shrink-0" />
            : <Circle className="w-4 h-4 text-[#C9C2B8] shrink-0" />}
        <span className={`text-xs font-semibold ${done ? 'line-through text-[#B0A89E]' : 'text-[#3D3929]'}`}>{text}</span>
    </div>
);

const HeroSection = () => (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        {/* BG texture */}
        <div className="absolute inset-0 opacity-[0.032]"
            style={{ backgroundImage: 'radial-gradient(circle, #7A4528 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full opacity-[0.07] pointer-events-none"
            style={{ background: 'radial-gradient(circle, #C96442, transparent 65%)', transform: 'translate(20%, -20%)' }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.05] pointer-events-none"
            style={{ background: 'radial-gradient(circle, #E8795A, transparent 65%)', transform: 'translate(-20%, 20%)' }} />

        <div className="relative max-w-6xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">

                {/* Copy */}
                <div className="flex-1 max-w-xl text-center lg:text-left">
                    <div className="reveal d1 inline-flex items-center gap-2 bg-[#C96442]/10 border border-[#C96442]/20 text-[#C96442] text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-full mb-7">
                        <Sparkles className="w-3 h-3" /> AI-powered · Now in Beta
                    </div>
                    <h1 className="reveal d2 text-5xl md:text-6xl font-black text-[#2A2620] leading-[1.06] tracking-tight mb-6">
                        Get things done,{' '}
                        <span style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text', backgroundImage: 'linear-gradient(135deg, #C96442 0%, #E8795A 55%, #A84E32 100%)', backgroundClip: 'text' }}>
                            beautifully.
                        </span>
                    </h1>
                    <p className="reveal d3 text-[#7A7060] text-lg font-medium leading-relaxed mb-9 max-w-lg mx-auto lg:mx-0">
                        Todoify turns your scattered tasks into a clear, focused system — so you can stop managing and start doing.
                    </p>
                    <div className="reveal d4 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10">
                        <Link to="/app/register"
                            className="inline-flex items-center justify-center gap-2 h-[52px] px-8 rounded-2xl text-white text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group"
                            style={{ background: 'linear-gradient(135deg, #C96442 0%, #A84E32 100%)', boxShadow: '0 8px 28px rgba(201,100,66,0.32)' }}>
                            Start for free <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <a href="#how"
                            className="inline-flex items-center justify-center gap-2 h-[52px] px-8 rounded-2xl text-[#3D3929] text-sm font-bold bg-white border border-[#E2DDD6] hover:border-[#C96442]/25 hover:shadow-md transition-all duration-200">
                            See how it works
                        </a>
                    </div>
                    <div className="reveal d5 flex items-center gap-3 justify-center lg:justify-start">
                        <div className="flex -space-x-2">
                            {['#C96442', '#9A4328', '#E8795A', '#A84E32', '#7A3521'].map((c, i) => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#FAF9F5] flex items-center justify-center text-white text-[10px] font-black" style={{ background: c }}>
                                    {['A', 'B', 'C', 'D', 'E'][i]}
                                </div>
                            ))}
                        </div>
                        <div>
                            <div className="flex gap-0.5 mb-0.5">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />)}
                            </div>
                            <p className="text-[11px] text-[#9B9182] font-semibold">Loved by <strong className="text-[#3D3929]">10,000+</strong> teams worldwide</p>
                        </div>
                    </div>
                </div>

                {/* UI Mockup */}
                <div className="flex-1 relative w-full max-w-[460px] h-[420px] mx-auto">
                    <div className="absolute inset-x-0 top-6 bg-white rounded-3xl border border-[#E8E4DC] shadow-[0_24px_80px_rgba(0,0,0,0.10)] overflow-hidden">
                        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[#F0EDE6] bg-[#FDFCFA]">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                            </div>
                            <div className="flex-1 flex justify-center items-center gap-1.5 text-[#9B9182]">
                                <Inbox className="w-3.5 h-3.5" /><span className="text-[11px] font-bold">My Inbox</span>
                            </div>
                        </div>
                        <div className="p-4 space-y-1.5">
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#C9C2B8] px-3 mb-3">Today · 5 tasks</p>
                            {[
                                { text: 'Review Q4 product roadmap', done: true, tag: 'Work', col: '#C96442' },
                                { text: 'Design sprint retro slides', done: false, tag: 'Design', col: '#8B5CF6' },
                                { text: 'Send weekly team update', done: true, tag: 'Work', col: '#C96442' },
                                { text: 'Book team lunch venue', done: false, tag: 'Personal', col: '#0EA5E9' },
                                { text: 'Prepare investor brief', done: false, tag: 'Finance', col: '#10B981' },
                            ].map((t, i) => (
                                <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F9F7F3] transition-colors cursor-default">
                                    {t.done ? <CheckCircle2 className="w-4 h-4 text-[#C96442] shrink-0" /> : <Circle className="w-4 h-4 text-[#D4CEC6] shrink-0" />}
                                    <span className={`flex-1 text-xs font-semibold ${t.done ? 'line-through text-[#B0A89E]' : 'text-[#3D3929]'}`}>{t.text}</span>
                                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: t.col + '15', color: t.col }}>{t.tag}</span>
                                </div>
                            ))}
                            <div className="px-3 pt-3">
                                <div className="flex justify-between text-[10px] font-bold text-[#C9C2B8] mb-1"><span>Daily progress</span><span>2/5</span></div>
                                <div className="h-1.5 rounded-full bg-[#EDE9E1] overflow-hidden">
                                    <div className="h-full w-[40%] rounded-full" style={{ background: 'linear-gradient(90deg,#C96442,#E8795A)' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <HeroTaskCard text="Focus mode on 🎯" done={false} delay={0} style={{ bottom: '1%', right: '-3%' }} />
                    <HeroTaskCard text="Team sync done ✓" done={true} delay={1.6} style={{ top: '3%', right: '-5%', minWidth: '155px' }} />
                </div>
            </div>
        </div>
    </section>
);

export default HeroSection;
