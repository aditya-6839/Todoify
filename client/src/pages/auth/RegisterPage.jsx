import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Github, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/layout/Logo';

const RegisterPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    return (
        <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-[#faf9f5]">
            {/* Dynamic Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px]" />
            <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] rounded-full bg-primary/5 blur-[80px]" />

            <div className="relative z-10 w-full max-w-md animate-in slide-in-from-bottom-4 duration-700">
                <div className="flex justify-center mb-8">
                    <Link to="/" className="hover:scale-105 transition-transform duration-300">
                        <Logo className="h-10 w-auto" />
                    </Link>
                </div>

                <Card className="border-border/50 bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl overflow-hidden border">
                    <CardHeader className="space-y-2 text-center pt-10 pb-6">
                        <CardTitle className="text-4xl font-black tracking-tight text-foreground">
                            Join Todoify
                        </CardTitle>
                        <CardDescription className="text-muted-foreground font-medium text-base">
                            Start organizing your life with ease
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-5 px-8">
                        {/* Primary Google Auth Option */}
                        <Button
                            variant="outline"
                            className="w-full h-12 bg-white hover:bg-gray-50 text-foreground border-border/60 rounded-2xl shadow-sm transition-all duration-200 flex items-center justify-center gap-3 font-semibold text-base group"
                        >
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Sign up with Google
                        </Button>

                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-border/40" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-[#fafafa]/80 backdrop-blur-sm px-4 text-muted-foreground/60 font-bold tracking-widest text-[10px]">
                                    or create account
                                </span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label
                                    htmlFor="name"
                                    className="text-[10px] font-black text-muted-foreground/80 ml-1 uppercase tracking-[0.2em]"
                                >
                                    Full Name
                                </Label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
                                    <Input
                                        id="name"
                                        placeholder="Alex Johnson"
                                        className="pl-11 h-12 bg-secondary/30 border-border/40 focus:bg-white focus:border-primary/30 rounded-2xl transition-all duration-300 ring-0 focus-visible:ring-1 focus-visible:ring-primary/20"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="email"
                                    className="text-[10px] font-black text-muted-foreground/80 ml-1 uppercase tracking-[0.2em]"
                                >
                                    Email Address
                                </Label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="alex@example.com"
                                        className="pl-11 h-12 bg-secondary/30 border-border/40 focus:bg-white focus:border-primary/30 rounded-2xl transition-all duration-300 ring-0 focus-visible:ring-1 focus-visible:ring-primary/20"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="password"
                                    className="text-[10px] font-black text-muted-foreground/80 ml-1 uppercase tracking-[0.2em]"
                                >
                                    Password
                                </Label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-11 h-12 bg-secondary/30 border-border/40 focus:bg-white focus:border-primary/30 rounded-2xl transition-all duration-300 ring-0 focus-visible:ring-1 focus-visible:ring-primary/20"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 px-2 pt-1 opacity-60 hover:opacity-100 transition-opacity">
                            <ShieldCheck className="w-4 h-4 text-primary mt-0.5" />
                            <p className="text-[10px] text-muted-foreground font-medium leading-relaxed">
                                By joining, you agree to our <span className="text-foreground font-bold underline decoration-primary/30 cursor-pointer">Terms</span> and <span className="text-foreground font-bold underline decoration-primary/30 cursor-pointer">Privacy Policy</span>.
                            </p>
                        </div>

                        <Button className="w-full h-12 bg-primary hover:bg-primary/95 text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group text-base">
                            Create Account
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </CardContent>

                    <CardFooter className="pb-10 pt-6 px-8">
                        <div className="w-full flex flex-col items-center gap-4">
                            <p className="text-sm text-muted-foreground font-medium">
                                Already have an account? {' '}
                                <Link to="/app/login" className="text-primary font-bold hover:underline underline-offset-4 decoration-2">
                                    Log in
                                </Link>
                            </p>

                            <div className="flex gap-4">
                                <Button variant="ghost" size="sm" className="h-9 px-3 text-muted-foreground/60 hover:text-foreground hover:bg-secondary/50 rounded-xl transition-colors">
                                    <Github className="w-4 h-4 mr-2" />
                                    GitHub
                                </Button>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default RegisterPage;

