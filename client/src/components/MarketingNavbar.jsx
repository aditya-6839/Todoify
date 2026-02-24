import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    ChevronDown, Menu, X,
    CheckCircle2, ClipboardList, Clock, TrendingUp, Users,
    HelpCircle, BookOpen, PlusCircle, Layout
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/assets/Logo';

const iconMap = {
    CheckCircle2: CheckCircle2,
    ClipboardList: ClipboardList,
    Clock: Clock,
    TrendingUp: TrendingUp,
    Users: Users,
    HelpCircle: HelpCircle,
    BookOpen: BookOpen,
    PlusCircle: PlusCircle,
    Layout: Layout
};

const MarketingNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mobileDropdown, setMobileDropdown] = useState('Made For'); // Default open as per image

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        {
            name: 'Made For',
            href: '#',
            hasDropdown: true,
            items: [
                { name: 'Task Management', href: '/features/task-management', icon: 'CheckCircle2' },
                { name: 'Project Management', href: '/features/project-management', icon: 'ClipboardList' },
                { name: 'Time Management', href: '/features/time-management', icon: 'Clock' },
                { name: 'Habit Forming', href: '/features/habit-forming', icon: 'TrendingUp' },
                { name: 'Teamwork', href: '/features/teamwork', icon: 'Users' },
            ]
        },
        {
            name: 'Resources',
            href: '#',
            hasDropdown: true,
            items: [
                { name: 'Help Center', href: '/resources/help', icon: 'HelpCircle' },
                { name: 'Productivity Methods', href: '/resources/methods', icon: 'BookOpen' },
                { name: 'Integrations', href: '/resources/integrations', icon: 'PlusCircle' },
                { name: 'Templates', href: '/resources/templates', icon: 'Layout' },
            ]
        },
        { name: 'Pricing', href: '/pricing', hasDropdown: false },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-2'
            }`}>
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                <div className="flex justify-between items-center h-12">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0">
                        <Logo />
                    </Link>

                    {/* Right Side: Links + Buttons */}
                    <div className="hidden md:flex items-center space-x-1">
                        {/* Nav Links */}
                        <div className="flex items-center space-x-1 mr-4">
                            {navLinks.map((link) => (
                                <div key={link.name} className="relative group/nav">
                                    <Link
                                        to={link.href}
                                        className="flex items-center gap-1 text-[15px] font-semibold text-foreground hover:bg-secondary px-3 py-2 rounded-lg transition-all duration-200"
                                    >
                                        {link.name}
                                        {link.hasDropdown && <ChevronDown className="w-4 h-4 transition-transform group-hover/nav:rotate-180" />}
                                    </Link>

                                    {link.hasDropdown && (
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-200 pointer-events-none group-hover/nav:pointer-events-auto">
                                            <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 p-2 min-w-[240px]">
                                                {link.items.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        to={item.href}
                                                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted-foreground/5 transition-colors group/item"
                                                    >
                                                        <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground group-hover/item:text-primary group-hover/item:bg-primary/10 transition-colors">
                                                            {item.icon && React.createElement(iconMap[item.icon], { size: 18 })}
                                                        </div>
                                                        <span className="text-sm font-semibold text-foreground group-hover/item:text-primary">
                                                            {item.name}
                                                        </span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-2">
                            <Link to="/app/login" className="text-[15px] font-semibold text-foreground hover:bg-secondary px-4 py-2 rounded-lg transition-all duration-200">
                                Log in
                            </Link>
                            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-5 py-2.5 text-[15px] font-bold transition-all shadow-sm active:scale-95">
                                <Link to="/app/register">Start for free</Link>
                            </Button>
                        </div>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-foreground p-2"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-border shadow-2xl animate-in slide-in-from-top duration-300 overflow-hidden">
                    <div className="p-4 flex flex-col space-y-2">
                        {navLinks.map((link) => (
                            <div key={link.name} className="flex flex-col">
                                {link.hasDropdown ? (
                                    <>
                                        <button
                                            onClick={() => setMobileDropdown(mobileDropdown === link.name ? '' : link.name)}
                                            className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors ${mobileDropdown === link.name ? 'bg-secondary' : 'bg-transparent text-foreground'
                                                }`}
                                        >
                                            <span className="text-[16px] font-bold">{link.name}</span>
                                            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${mobileDropdown === link.name ? 'rotate-180' : ''}`} />
                                        </button>

                                        {mobileDropdown === link.name && (
                                            <div className="flex flex-col px-6 py-2 space-y-3">
                                                {link.items.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        to={item.href}
                                                        className="text-[15px] font-medium text-muted-foreground hover:text-primary transition-colors"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        to={link.href}
                                        className="px-4 py-3 text-[16px] font-bold text-foreground hover:bg-secondary rounded-lg transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Mobile Footer Buttons */}
                    <div className="p-6 bg-background border-t border-border mt-2">
                        <div className="flex gap-4">
                            <Button asChild variant="secondary" className="flex-1 bg-secondary hover:bg-secondary/80 text-foreground border-none font-bold py-6 rounded-lg text-[15px]">
                                <Link to="/app/login" onClick={() => setIsOpen(false)}>Log in</Link>
                            </Button>
                            <Button asChild className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 rounded-lg text-[15px] shadow-sm">
                                <Link to="/app/register" onClick={() => setIsOpen(false)}>Start for free</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default MarketingNavbar;
