import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

const CTASection = () => {
    return (
        <section className="py-24 relative overflow-hidden"
            style={{ background: 'linear-gradient(145deg, #C96442 0%, #A84E32 45%, #7A3521 100%)' }}>
            {/* BG layers */}
            <div className="absolute inset-0 opacity-[0.065]"
                style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
            <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full opacity-20 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #F0956E, transparent 70%)' }} />
            <div className="absolute bottom-[-80px] left-[-80px] w-[320px] h-[320px] rounded-full opacity-15 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #E8795A, transparent 70%)' }} />

            <div className="relative max-w-3xl mx-auto px-6 text-center">
                <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white/75 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full mb-7">
                    <Sparkles className="w-3 h-3" /> Free forever · No credit card needed
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-5">
                    Start getting things<br />done today.
                </h2>
                <p className="text-white/65 text-lg font-medium mb-10 max-w-lg mx-auto leading-relaxed">
                    Join 10,000+ people who've already made the switch to a calmer, more organised work life.
                </p>
                <Link to="/app/register"
                    className="inline-flex items-center gap-2 h-[52px] px-10 rounded-2xl bg-white text-[#C96442] text-sm font-black shadow-2xl hover:-translate-y-0.5 active:scale-95 transition-all duration-200 group">
                    Create your free account
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
            </div>
        </section>
    );
};

export default CTASection;
