import React from 'react';
import { MousePointer2, Zap, Trophy } from 'lucide-react';

const steps = [
    {
        title: 'Capture',
        description: 'Add tasks instantly from any device. Use NLP to set due dates and priorities automatically.',
        icon: MousePointer2,
        number: '01'
    },
    {
        title: 'Organize',
        description: 'Group tasks into projects, add tags, and sync with your favorite calendar apps.',
        icon: Zap,
        number: '02'
    },
    {
        title: 'Achieve',
        description: 'Focus on what matters most and watch your productivity soar with detailed analytics.',
        icon: Trophy,
        number: '03'
    }
];

const HowItWorks = () => {
    return (
        <section className="py-24 md:py-32 bg-secondary/30 relative" id="how-it-works">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 md:mb-20 gap-8">
                    <div className="flex flex-col gap-4 max-w-2xl">
                        <div className="px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-black uppercase tracking-widest w-fit">
                            Workflow
                        </div>
                        <h2
                            className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight"
                            style={{ fontFamily: 'var(--font-serif)' }}
                        >
                            Organize everything <br />
                            <span className="text-primary italic">in seconds.</span>
                        </h2>
                    </div>
                    <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-sm mb-4">
                        Todoify removes the friction from productivity, so you can spend more time doing and less time planning.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20">
                    {steps.map((step, i) => (
                        <div key={i} className="flex flex-col gap-8 relative group">
                            <div className="flex items-center justify-between">
                                <div className="w-16 h-16 rounded-3xl bg-background border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500 shadow-xl shadow-transparent group-hover:shadow-primary/20">
                                    <step.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                                </div>
                                <span className="text-6xl font-black text-foreground/5 font-serif select-none">
                                    {step.number}
                                </span>
                            </div>

                            <div className="flex flex-col gap-4">
                                <h3 className="text-3xl font-black tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
                                    {step.title}
                                </h3>
                                <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                                    {step.description}
                                </p>
                            </div>

                            {i < steps.length - 1 && (
                                <div className="hidden md:block absolute top-[32px] right-[-40px] w-20 h-[2px] bg-border border-dashed border-t-2" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
