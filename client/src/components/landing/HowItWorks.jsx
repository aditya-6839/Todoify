import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Circle, Inbox, ListTodo, FolderKanban, Bell, Zap, ArrowRight } from 'lucide-react';
import Logo from '@/components/layout/Logo';

const Step = ({ num, title, desc }) => (
    <div className="flex gap-5">
        <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-black shadow-lg shadow-[#C96442]/25"
            style={{ background: 'linear-gradient(135deg, #C96442, #A84E32)' }}>{num}</div>
        <div>
            <h4 className="text-base font-black text-[#3D3929] mb-1">{title}</h4>
            <p className="text-[#9B9182] text-sm leading-relaxed font-medium">{desc}</p>
        </div>
    </div>
);

const HowItWorks = () => {
    return (
        <section id="how" className="py-24 bg-white border-y border-[#EDE9E1]">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: App UI panel */}
                    <div className="relative">
                        <div className="bg-[#FAF9F5] border border-[#E8E4DC] rounded-3xl overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.07)] p-6">
                            <div className="flex gap-5">
                                {/* Sidebar */}
                                <div className="w-32 shrink-0 flex flex-col">
                                    <Logo size="w-20" className="mb-5" />
                                    {[
                                        { icon: Inbox, label: 'Inbox', active: true },
                                        { icon: ListTodo, label: 'Today', active: false },
                                        { icon: FolderKanban, label: 'Projects', active: false },
                                        { icon: Bell, label: 'Reminders', active: false },
                                    ].map(({ icon: Icon, label, active }) => (
                                        <div key={label}
                                            className={`flex items-center gap-2 px-2.5 py-2 rounded-xl mb-0.5 text-xs font-bold cursor-default ${active ? 'bg-[#C96442]/10 text-[#C96442]' : 'text-[#9B9182] hover:bg-[#F0EDE6]'}`}>
                                            <Icon className="w-3.5 h-3.5" />{label}
                                        </div>
                                    ))}
                                </div>
                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#C9C2B8] mb-3">Today · 5 tasks</p>
                                    {[
                                        { text: 'Morning team standup', done: true },
                                        { text: 'Finalise design tokens', done: true },
                                        { text: 'Review PRs from team', done: false },
                                        { text: 'Update project timeline', done: false },
                                        { text: 'Client call at 4pm', done: false },
                                    ].map((t, i) => (
                                        <div key={i} className="flex items-center gap-2.5 py-2 border-b border-[#EDE9E1] last:border-0">
                                            {t.done
                                                ? <CheckCircle2 className="w-3.5 h-3.5 text-[#C96442] shrink-0" />
                                                : <Circle className="w-3.5 h-3.5 text-[#D4CEC6] shrink-0" />}
                                            <span className={`text-xs font-semibold truncate ${t.done ? 'line-through text-[#B0A89E]' : 'text-[#3D3929]'}`}>{t.text}</span>
                                        </div>
                                    ))}
                                    <div className="mt-4">
                                        <div className="flex justify-between text-[10px] font-bold text-[#9B9182] mb-1.5">
                                            <span>Daily progress</span><span>2/5</span>
                                        </div>
                                        <div className="h-1.5 bg-[#EDE9E1] rounded-full overflow-hidden">
                                            <div className="h-full w-[40%] rounded-full" style={{ background: 'linear-gradient(90deg,#C96442,#E8795A)' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Floating badge */}
                        <div className="absolute -bottom-5 -right-4 bg-white border border-[#EDE9E1] rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#C96442]/10 flex items-center justify-center">
                                <Zap className="w-4 h-4 text-[#C96442]" />
                            </div>
                            <div>
                                <p className="text-xs font-black text-[#3D3929]">Focus mode on</p>
                                <p className="text-[10px] text-[#9B9182] font-medium">3 tasks left today</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Steps */}
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#C96442] mb-4 block">How it works</span>
                        <h2 className="text-4xl font-black text-[#2A2620] tracking-tight leading-tight mb-10">
                            From chaos to clarity<br />in three steps.
                        </h2>
                        <div className="space-y-8">
                            <Step num="1" title="Capture everything"
                                desc="Add tasks from anywhere — inbox, voice, email, or our browser extension. Nothing falls through the cracks." />
                            <Step num="2" title="Organise your way"
                                desc="Sort by project, priority, due date, or custom tags. Your workspace, your rules, your system." />
                            <Step num="3" title="Focus and finish"
                                desc="Use daily focus mode, time-blocking, and smart reminders to cut through the noise and actually ship." />
                        </div>
                        <Link to="/app/register"
                            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#C96442] hover:gap-3 transition-all duration-200 group">
                            Try it yourself <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
