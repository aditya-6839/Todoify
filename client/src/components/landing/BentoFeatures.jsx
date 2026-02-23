import React from 'react';
import {
    CheckCircle2, ClipboardList, Clock,
    TrendingUp, Users, Zap, Calendar,
    Layout, Circle, Activity, ChevronRight,
    Search, Plus, Filter
} from 'lucide-react';
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

const Skeleton = ({ className, children }) => (
    <div className={`flex flex-1 w-full h-full min-h-[6rem] rounded-none ${className}`}>
        {children}
    </div>
);

const BentoFeatures = () => {
    return (
        <section id="features" className="py-32 bg-[#FAF9F5] relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-[#C96442]/10 border border-[#C96442]/20 mb-6">
                        <Zap className="w-3.5 h-3.5 text-[#C96442]" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#C96442]">Todoify Core</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12 items-end">
                        <div>
                            <h2 className="text-5xl md:text-7xl font-black text-[#2A2620] tracking-tighter leading-[0.9] uppercase italic">
                                Engineered for<br />Production.
                            </h2>
                        </div>
                        <div>
                            <p className="text-[#7A7060] text-lg font-bold leading-relaxed uppercase border-l-4 border-[#C96442] pl-6">
                                Five specialized modules designed to turn <br />
                                chaos into a systematic workflow. Zero fluff. <br />
                                Just raw productivity.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-6 border border-[#EDE9E1] bg-[#EDE9E1] gap-[1px]">
                    {/* 1. Task Management - THE CORE (Large) */}
                    <div className="md:col-span-4 bg-white group hover:z-20 transition-all duration-500">
                        <div className="p-10 h-full flex flex-col justify-between">
                            <div className="flex justify-between items-start mb-12">
                                <div className="space-y-4">
                                    <div className="w-14 h-14 bg-[#FAF9F5] border border-[#EDE9E1] flex items-center justify-center">
                                        <CheckCircle2 className="w-7 h-7 text-[#C96442]" />
                                    </div>
                                    <h3 className="text-3xl font-black text-[#2A2620] uppercase tracking-tighter leading-none">Task Management</h3>
                                    <p className="text-[#7A7060] text-sm font-bold uppercase max-w-sm">The atomic unit of productivity. CRUD operations optimized for speed.</p>
                                </div>
                                <div className="text-[10px] font-black text-[#C96442] border border-[#C96442]/30 px-2 py-1 uppercase">v4.0.2 Stable</div>
                            </div>

                            <div className="flex-1 bg-[#FAF9F5] border border-[#EDE9E1] p-1 overflow-hidden">
                                <div className="bg-white border border-[#EDE9E1] p-4 flex flex-col gap-2">
                                    {[
                                        { title: "Refactor backend routes", status: "In Progress", color: "#C96442" },
                                        { title: "Optimize MongoDB indexes", status: "Done", color: "#10B981" },
                                        { title: "Update project documentation", status: "Pending", color: "#9B9182" }
                                    ].map((task, i) => (
                                        <div key={i} className="flex items-center gap-4 p-3 border border-[#EDE9E1] bg-[#FAF9F5]/30 group-hover:translate-x-1 transition-transform duration-300">
                                            <div className="w-4 h-4 border-2 border-[#D4CEC6] flex items-center justify-center">
                                                {task.status === "Done" && <div className="w-2 h-2 bg-[#10B981]" />}
                                            </div>
                                            <span className="text-xs font-black text-[#3D3929] uppercase flex-1">{task.title}</span>
                                            <div className="text-[8px] font-black px-2 py-0.5 border" style={{ color: task.color, borderColor: `${task.color}40` }}>{task.status}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Project Management (Medium) */}
                    <div className="md:col-span-2 bg-white group hover:z-20 transition-all duration-500">
                        <div className="p-10 h-full flex flex-col justify-between">
                            <div className="space-y-4 mb-8">
                                <div className="w-14 h-14 bg-[#FAF9F5] border border-[#EDE9E1] flex items-center justify-center">
                                    <ClipboardList className="w-7 h-7 text-[#C96442]" />
                                </div>
                                <h3 className="text-xl font-black text-[#2A2620] uppercase tracking-tighter">Project Management</h3>
                                <p className="text-[#7A7060] text-[11px] font-bold uppercase italic">Multi-tenant project isolation for complex work-streams.</p>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {['Client A', 'Internal', 'Research', 'V2 Build'].map((p, i) => (
                                    <div key={i} className="aspect-square bg-[#FAF9F5] border border-[#EDE9E1] p-3 flex flex-col justify-between group-hover:bg-[#C96442]/5 transition-colors">
                                        <div className="w-2 h-2 bg-[#C96442]" />
                                        <span className="text-[10px] font-black text-[#3D3929] uppercase">{p}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 3. Time Management */}
                    <div className="md:col-span-2 bg-white group hover:z-20 transition-all duration-500">
                        <div className="p-10 h-full flex flex-col justify-between">
                            <div className="space-y-4 mb-8">
                                <div className="w-14 h-14 bg-[#FAF9F5] border border-[#EDE9E1] flex items-center justify-center">
                                    <Clock className="w-7 h-7 text-[#C96442]" />
                                </div>
                                <h3 className="text-xl font-black text-[#2A2620] uppercase tracking-tighter">Time Tracking</h3>
                                <p className="text-[#7A7060] text-[11px] font-bold uppercase italic">Real-time telemetry on every task execution.</p>
                            </div>
                            <div className="bg-[#1A1816] p-6 border border-black group-hover:border-[#C96442] transition-colors">
                                <div className="text-4xl font-black text-[#C96442] tracking-widest tabular-nums">08:42:12</div>
                                <div className="mt-4 flex gap-1">
                                    {[1, 1, 1, 1, 0, 0, 0, 0].map((b, i) => (
                                        <div key={i} className={`h-1 flex-1 ${b ? 'bg-[#C96442]' : 'bg-white/10'}`} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. Habit Forming */}
                    <div className="md:col-span-2 bg-white group hover:z-20 transition-all duration-500">
                        <div className="p-10 h-full flex flex-col justify-between">
                            <div className="space-y-4 mb-8">
                                <div className="w-14 h-14 bg-[#FAF9F5] border border-[#EDE9E1] flex items-center justify-center">
                                    <Activity className="w-7 h-7 text-[#C96442]" />
                                </div>
                                <h3 className="text-xl font-black text-[#2A2620] uppercase tracking-tighter">Habit Forming</h3>
                                <p className="text-[#7A7060] text-[11px] font-bold uppercase italic">Algorithmic consistency tracking for long-term growth.</p>
                            </div>
                            <div className="flex items-end gap-[2px] h-24">
                                {[20, 45, 30, 80, 50, 95, 60, 40, 70, 55].map((h, i) => (
                                    <div key={i} className="flex-1 bg-[#D4CEC6] group-hover:bg-[#C96442] transition-all duration-500" style={{ height: `${h}%` }} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 5. Teamwork */}
                    <div className="md:col-span-2 bg-white group hover:z-20 transition-all duration-500">
                        <div className="p-10 h-full flex flex-col justify-between">
                            <div className="space-y-4 mb-8">
                                <div className="w-14 h-14 bg-[#FAF9F5] border border-[#EDE9E1] flex items-center justify-center">
                                    <Users className="w-7 h-7 text-[#C96442]" />
                                </div>
                                <h3 className="text-xl font-black text-[#2A2620] uppercase tracking-tighter">Team Collaboration</h3>
                                <p className="text-[#7A7060] text-[11px] font-bold uppercase italic">Permission-based workspace sharing and live sync.</p>
                            </div>
                            <div className="relative h-24 overflow-hidden">
                                <div className="absolute top-0 right-0 w-16 h-16 border-2 border-[#C96442] z-10 bg-white flex items-center justify-center text-[10px] font-black">ADMIN</div>
                                <div className="absolute bottom-2 left-0 w-16 h-16 border-2 border-[#2A2620] flex items-center justify-center text-[10px] font-black">DEV</div>
                                <div className="absolute top-4 left-10 w-16 h-16 border border-[#EDE9E1] group-hover:border-[#C96442]/30 transition-colors" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BentoFeatures;



