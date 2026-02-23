import React from 'react';
import { Star } from 'lucide-react';

const TestiCard = ({ quote, name, role, avatar }) => (
    <div className="flex-shrink-0 w-[300px] bg-white border border-[#EDE9E1] rounded-3xl p-6 shadow-sm snap-start">
        <div className="flex gap-0.5 mb-3">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}
        </div>
        <p className="text-[#3D3929] text-sm font-medium leading-relaxed mb-5">"{quote}"</p>
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0"
                style={{ background: 'linear-gradient(135deg, #C96442, #E8795A)' }}>{avatar}</div>
            <div>
                <p className="text-[#3D3929] text-xs font-black">{name}</p>
                <p className="text-[#9B9182] text-[11px] font-medium">{role}</p>
            </div>
        </div>
    </div>
);

const Testimonials = () => {
    const testimonials = [
        { quote: "I went from drowning in sticky notes to crystal-clear clarity. Todoify is genuinely life-changing.", name: "Sarah K.", role: "Product Designer · Figma", avatar: "S" },
        { quote: "Todoify is the only task app that doesn't feel like work to use. The UI is stunning and I ship so much faster.", name: "Marcus T.", role: "Engineering Lead · Linear", avatar: "M" },
        { quote: "We moved the entire team off Asana. Everyone actually uses Todoify, and productivity is up noticeably.", name: "Priya N.", role: "Head of Product · Notion", avatar: "P" },
        { quote: "Focus mode alone is worth every penny. I do more in 2 hours than I used to in a whole day.", name: "James W.", role: "Founder · Indie Hacker", avatar: "J" },
        { quote: "Beautiful design, snappy performance, zero bloat. Exactly what I wanted after years of Todoist.", name: "Ava R.", role: "UX Researcher · Google", avatar: "A" },
    ];

    return (
        <section className="py-24 overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 text-center mb-12">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#C96442] mb-3 block">Testimonials</span>
                <h2 className="text-4xl md:text-5xl font-black text-[#2A2620] tracking-tight">People love Todoify.</h2>
            </div>
            <div className="flex gap-5 pl-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory">
                {testimonials.map((t, i) => <TestiCard key={i} {...t} />)}
            </div>
        </section>
    );
};

export default Testimonials;
