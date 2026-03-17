import React from 'react';
import { TrendingUp, CheckCircle2, Clock, Calendar, Zap, ArrowUpRight, BarChart3 } from 'lucide-react';

const AnalyticsPage = () => {
    return (
        <div className="max-w-6xl mx-auto w-full py-10 px-4">
            <div className="mb-12">
                <h1 className="text-4xl font-black tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>Productivity Insights</h1>
                <p className="text-muted-foreground font-medium text-lg mt-2">Track your progress and optimize your workflow.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                    { label: 'Completed', value: '124', change: '+12%', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10' },
                    { label: 'Completion Rate', value: '88%', change: '+5%', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
                    { label: 'On Time', value: '94%', change: '+2%', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                    { label: 'Streak', value: '14 Days', change: 'Personal Best', icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/10' },
                ].map((stat, i) => (
                    <div key={i} className="bg-background border border-border/30 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 group">
                        <div className="flex items-center justify-between mb-6">
                            <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center transition-transform group-hover:scale-110`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <div className="text-[11px] font-black px-2 py-1 rounded-lg bg-muted text-muted-foreground flex items-center gap-1">
                                {stat.change} <ArrowUpRight className="w-3 h-3" />
                            </div>
                        </div>
                        <div className="text-3xl font-black tracking-tighter mb-1">{stat.value}</div>
                        <div className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/50">{stat.label}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Visual Chart Placeholder */}
                <div className="lg:col-span-2 bg-muted/20 border border-border/30 rounded-[40px] p-10 flex flex-col min-h-[400px]">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h3 className="text-xl font-black text-foreground">Task Completion</h3>
                            <p className="text-sm text-muted-foreground font-medium">Daily throughput over the last 14 days</p>
                        </div>
                        <select className="bg-background border border-border/40 rounded-xl px-4 py-2 text-xs font-bold outline-none">
                            <option>Last 14 Days</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>
                    
                    <div className="flex-1 flex items-end gap-3 pb-4">
                        {[40, 60, 45, 90, 65, 80, 50, 75, 40, 85, 100, 70, 55, 90].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                                <div 
                                    className="w-full bg-primary/20 group-hover:bg-primary transition-all duration-500 rounded-t-xl relative"
                                    style={{ height: `${h}%` }}
                                >
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        {Math.round(h * 0.15)}
                                    </div>
                                </div>
                                <div className="text-[9px] font-black text-muted-foreground/40 rotate-45">{i + 1} Mar</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Focus Areas */}
                <div className="bg-background border border-border/30 rounded-[40px] p-8">
                    <h3 className="text-xl font-black mb-6">Top Focus Areas</h3>
                    <div className="space-y-6">
                        {[
                            { label: 'Work', percentage: 45, color: 'bg-blue-500' },
                            { label: 'Personal', percentage: 25, color: 'bg-green-500' },
                            { label: 'Study', percentage: 20, color: 'bg-purple-500' },
                            { label: 'Fitness', percentage: 10, color: 'bg-orange-500' },
                        ].map((area, i) => (
                            <div key={i}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-black uppercase tracking-wider">{area.label}</span>
                                    <span className="text-[11px] font-bold text-muted-foreground">{area.percentage}%</span>
                                </div>
                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                    <div className={`h-full ${area.color} rounded-full transition-all duration-1000`} style={{ width: `${area.percentage}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-12 pt-8 border-t border-border/20 text-center">
                        <BarChart3 className="w-8 h-8 text-muted-foreground/20 mx-auto mb-4" />
                        <p className="text-[11px] font-bold text-muted-foreground/60 leading-relaxed">
                            Based on your activity labels. Keep tagging tasks to get more accurate data.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
