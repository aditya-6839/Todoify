import React from 'react';
import { Users, UserPlus, Shield, MessageSquare, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TeamPage = () => {
    return (
        <div className="max-w-5xl mx-auto w-full py-10 px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-black tracking-tight mb-2" style={{ fontFamily: 'var(--font-serif)' }}>Team Collaboration</h1>
                    <p className="text-muted-foreground font-medium text-lg">Manage members, roles and project access.</p>
                </div>
                <Button className="font-black px-8 h-12 rounded-xl bg-primary text-primary-foreground shadow-xl shadow-primary/20">
                    <UserPlus className="w-5 h-5 mr-3" /> Invite Member
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Stats */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { label: 'Total Members', value: '1', icon: Users, color: 'text-blue-500' },
                            { label: 'Active Tasks', value: '12', icon: Briefcase, color: 'text-green-500' },
                            { label: 'Discussions', value: '5', icon: MessageSquare, color: 'text-purple-500' },
                        ].map((stat, i) => (
                            <div key={i} className="bg-muted/30 border border-border/40 rounded-2xl p-6">
                                <stat.icon className={`w-5 h-5 mb-4 ${stat.color}`} />
                                <div className="text-2xl font-black">{stat.value}</div>
                                <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground opacity-60">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Member List */}
                    <div className="bg-background border border-border/40 rounded-3xl overflow-hidden">
                        <div className="px-8 py-6 border-b border-border/40 flex items-center justify-between bg-muted/5">
                            <h3 className="font-black text-sm uppercase tracking-widest text-muted-foreground">Team Members</h3>
                            <span className="bg-primary/10 text-primary text-[10px] font-black px-2 py-0.5 rounded-full uppercase">Owner</span>
                        </div>
                        <div className="divide-y divide-border/40">
                            {[1].map((_, i) => (
                                <div key={i} className="px-8 py-6 flex items-center justify-between group hover:bg-muted/20 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white font-black text-lg">A</div>
                                        <div>
                                            <div className="font-black text-base">Aditya</div>
                                            <div className="text-xs font-medium text-muted-foreground">aditya@example.com</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="hidden md:flex flex-col items-end">
                                            <div className="text-xs font-black uppercase tracking-tighter">Admin</div>
                                            <div className="text-[10px] font-medium text-muted-foreground opacity-60">Full Access</div>
                                        </div>
                                        <Button variant="ghost" size="icon" className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Shield className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <div className="bg-[#1e1b4b] text-white rounded-3xl p-8 relative overflow-hidden shadow-2xl">
                        <div className="relative z-10">
                            <h3 className="text-xl font-black mb-4 leading-tight">Upgrade to Pro for Teams</h3>
                            <p className="text-white/60 text-sm font-medium mb-8 leading-relaxed">Unlock project sharing, roles, and collaborative workflows for your entire team.</p>
                            <Button className="w-full bg-white text-[#1e1b4b] font-black h-12 rounded-xl hover:bg-white/90">Learn More</Button>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
                    </div>
                    
                    <div className="p-6 border-2 border-dashed border-border/40 rounded-3xl text-center">
                        <p className="text-xs font-bold text-muted-foreground leading-relaxed">
                            Need help managing your team? <br/>
                            <a href="#" className="text-primary hover:underline">Read our collaboration guide</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamPage;
