import React from 'react';
import MarketingNavbar from '@/components/layout/MarketingNavbar';
import { Link } from 'react-router-dom';
import { CheckCircle2, List, Calendar, Inbox, Clock, Star, Layout, MoreHorizontal, Plus } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white selection:bg-[#E44232]/10 selection:text-[#E44232]">
            <MarketingNavbar />

            <main className="relative pt-32 pb-32 px-4 overflow-hidden">
                {/* Background Decorative Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
                    <div className="absolute top-[-5%] left-[-10%] w-[40%] h-[40%] bg-[#E44232]/5 blur-[120px] rounded-full animate-pulse"></div>
                    <div className="absolute top-[20%] right-[-10%] w-[35%] h-[35%] bg-orange-500/5 blur-[100px] rounded-full"></div>
                </div>

                <div className="max-w-6xl mx-auto">
                    {/* Hero Text */}
                    <div className="text-center mb-24">
                        <h1 className="text-6xl md:text-[5.5rem] font-black text-[#202020] mb-8 leading-[1.05] tracking-tight">
                            Organize your work <br />
                            <span className="text-[#E44232] italic relative inline-block">
                                and life, finally.
                                <svg className="absolute -bottom-4 left-0 w-full h-4 text-[#E44232]/20" preserveAspectRatio="none" viewBox="0 0 100 10">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="6" fill="none" />
                                </svg>
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                            Become focused, organized, and calm with <span className="text-gray-900 font-bold">Todoify</span>. The world’s #1 task manager and to-do list app.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                            <Link to="/app/register" className="group relative bg-[#E44232] hover:bg-[#C3392C] text-white px-10 py-5 rounded-[1.25rem] text-xl font-bold transition-all shadow-2xl shadow-[#E44232]/30 hover:shadow-[#E44232]/50 active:scale-95 flex items-center gap-2">
                                Start for free
                                <span className="text-2xl transition-transform group-hover:translate-x-1">→</span>
                            </Link>
                            <button className="bg-white border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 text-gray-900 px-10 py-5 rounded-[1.25rem] text-xl font-bold transition-all active:scale-95">
                                How it works
                            </button>
                        </div>
                    </div>

                    {/* Premium Dashboard Preview (CSS Mockup) */}
                    <div className="relative group max-w-5xl mx-auto">
                        <div className="absolute -inset-10 bg-gradient-to-tr from-[#E44232]/10 via-transparent to-orange-500/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10"></div>

                        <div className="rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-gray-100 bg-white flex h-[600px] transition-transform duration-700 group-hover:scale-[1.02]">
                            {/* Mock Sidebar */}
                            <div className="w-64 bg-gray-50/50 border-r border-gray-100 p-6 flex flex-col gap-8">
                                <div className="flex items-center gap-3 px-2">
                                    <div className="w-8 h-8 rounded-lg bg-gray-200 animate-pulse"></div>
                                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                                </div>

                                <div className="space-y-1">
                                    {[
                                        { icon: Inbox, text: 'Inbox', color: 'text-blue-500' },
                                        { icon: Calendar, text: 'Today', color: 'text-green-500' },
                                        { icon: Clock, text: 'Upcoming', color: 'text-purple-500' },
                                        { icon: Star, text: 'Filters & Labels', color: 'text-orange-500' }
                                    ].map((item, i) => (
                                        <div key={i} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl ${i === 1 ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>
                                            <item.icon size={18} className={item.color} />
                                            <span className="text-sm font-bold">{item.text}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4">
                                    <div className="flex items-center justify-between px-3 mb-2">
                                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Projects</span>
                                        <Plus size={14} className="text-gray-400" />
                                    </div>
                                    <div className="space-y-1 text-gray-500">
                                        {['Design System', 'Product Launch', 'Hiring'].map((p, i) => (
                                            <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold">
                                                <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                                                {p}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Mock Content */}
                            <div className="flex-1 p-10 overflow-hidden">
                                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
                                    <h2 className="text-3xl font-black text-gray-900 flex items-center gap-3">
                                        Today
                                        <span className="text-sm font-medium text-gray-400">Wed Feb 18</span>
                                    </h2>
                                    <div className="flex items-center gap-4 text-gray-400">
                                        <MoreHorizontal size={20} />
                                    </div>
                                </div>

                                <div className="space-y-4 max-w-2xl">
                                    {[
                                        { title: 'Finalize brand guidelines for Todoify', tag: 'Design', time: '09:00 AM' },
                                        { title: 'Team meeting: Q1 Goals & Feedback', tag: 'Team', time: '11:30 AM' },
                                        { title: 'Review frontend implementation details', tag: 'Dev', time: '02:00 PM' },
                                        { title: 'Pick up groceries & flowers', tag: 'Personal', time: '05:00 PM' }
                                    ].map((task, i) => (
                                        <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-transparent hover:border-gray-100 hover:shadow-sm transition-all group/task">
                                            <div className="mt-0.5 w-6 h-6 rounded-full border-2 border-gray-200 flex items-center justify-center transition-colors group-hover/task:border-[#E44232]">
                                                <div className="w-3 h-3 rounded-full bg-[#E44232] opacity-0 group-hover/task:opacity-100 transition-opacity"></div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-bold text-gray-800 mb-1">{task.title}</div>
                                                <div className="flex items-center gap-3 text-xs">
                                                    <span className="text-[#E44232] font-black">{task.time}</span>
                                                    <div className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-500 font-bold uppercase tracking-tight">{task.tag}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="flex items-center gap-3 px-4 py-3 text-gray-400 font-bold text-sm border-2 border-dashed border-gray-100 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors mt-6">
                                        <Plus size={18} />
                                        Add Task
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Micro-UI elements */}
                        <div className="absolute top-20 -right-12 bg-white rounded-2xl shadow-2xl p-4 border border-gray-100 animate-[bounce_4s_infinite] hidden lg:block">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                                    <CheckCircle2 size={24} />
                                </div>
                                <div>
                                    <div className="text-sm font-black text-gray-900 leading-tight">Task Completed!</div>
                                    <div className="text-xs text-gray-500 font-medium">+15 Productivity points</div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -bottom-10 -left-10 bg-[#202020] text-white rounded-[2rem] shadow-2xl p-8 max-w-[280px] hidden lg:block transition-transform group-hover:-translate-y-2">
                            <div className="text-3xl font-black mb-1">92%</div>
                            <div className="text-sm font-bold text-gray-400 mb-4 opacity-80 uppercase tracking-widest">Weekly Goal</div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-[#E44232] w-[92%]"></div>
                            </div>
                            <p className="text-xs mt-4 text-gray-400 leading-relaxed">You're on track to beat your personal productivity record!</p>
                        </div>
                    </div>
                </div>

                {/* Trust Footer */}
                <div className="mt-40 text-center">
                    <p className="text-sm font-black text-gray-400 uppercase tracking-[0.3em] mb-10">Trusted by world-class teams</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale contrast-125">
                        {['Adobe', 'Disney', 'Meta', 'Netflix', 'Shopify'].map((brand) => (
                            <span key={brand} className="text-3xl font-black tracking-tighter text-gray-900">{brand}</span>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LandingPage;
