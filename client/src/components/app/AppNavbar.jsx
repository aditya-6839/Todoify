import React from 'react';
import { useLocation } from 'react-router-dom';
import {
    Search, Bell,
    Inbox, CalendarDays, CalendarRange, Tag,
    FolderKanban, Users, TrendingUp, Settings, UserCircle,
} from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

/* ── Page meta ───────────────────────────────────── */
const PAGE_META = [
    { match: '/app/inbox', icon: Inbox, title: 'Inbox' },
    { match: '/app/today', icon: CalendarDays, title: 'Today' },
    { match: '/app/upcoming', icon: CalendarRange, title: 'Upcoming' },
    { match: '/app/filters', icon: Tag, title: 'Filters & Labels' },
    { match: '/app/projects', icon: FolderKanban, title: 'My Projects' },
    { match: '/app/team', icon: Users, title: 'Team' },
    { match: '/app/analytics', icon: TrendingUp, title: 'Analytics' },
    { match: '/app/settings', icon: Settings, title: 'Settings' },
    { match: '/app/profile', icon: UserCircle, title: 'Profile' },
];

const AppNavbar = () => {
    const { pathname } = useLocation();

    const meta =
        PAGE_META.find(p => p.match === pathname) ||
        PAGE_META.find(p => pathname.startsWith(p.match)) ||
        { icon: Inbox, title: 'Todoify' };

    const PageIcon = meta.icon;

    return (
        <header
            id="app-navbar"
            className="flex items-center gap-2 px-3 md:px-5 h-14 sticky top-0 z-30"
            style={{
                backgroundColor: 'var(--background)',
                borderBottom: '1px solid var(--border)',
                fontFamily: 'var(--font-sans)',
            }}
        >
            {/* Mobile Sidebar Trigger (Hamburger)
                Only visible on mobile (below md breakpoint).
                Opens the shadcn Sheet drawer.
            */}
            <div className="flex items-center md:hidden shrink-0">
                <SidebarTrigger className="-ml-0.5" />
                <Separator orientation="vertical" className="h-5 mx-2" />
            </div>

            {/* Page icon + title */}
            <div className="flex items-center gap-2 min-w-0 shrink-0">
                <PageIcon
                    className="w-[18px] h-[18px] shrink-0"
                    style={{ color: 'var(--primary)' }}
                />
                <h1
                    className="text-[0.93rem] font-bold m-0 leading-none truncate"
                    style={{ color: 'var(--foreground)' }}
                >
                    {meta.title}
                </h1>
            </div>

            {/* Spacer */}
            <div className="flex-1 min-w-0" />

            {/* Right cluster */}
            <div className="flex items-center gap-1 shrink-0">

                {/* Search — md+ only */}
                <div className="relative hidden md:block">
                    <Search
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
                        style={{ color: 'var(--muted-foreground)' }}
                    />
                    <Input
                        id="app-navbar-search"
                        placeholder="Search tasks…"
                        className="h-8 w-44 xl:w-56 pl-8 pr-3 text-[0.8rem] rounded-full
                            bg-muted border-transparent
                            focus-visible:border-primary focus-visible:ring-0 focus-visible:bg-background
                            transition-all duration-200"
                    />
                </div>

                {/* Notifications */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-9 w-9 rounded-lg shrink-0"
                    aria-label="Notifications"
                    id="app-navbar-notifications"
                    style={{
                        backgroundColor: 'color-mix(in oklch, var(--primary) 8%, transparent)',
                    }}
                >
                    <Bell className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                    <span className="absolute top-1.5 right-1.5">
                        <span
                            className="absolute inline-flex h-2 w-2 rounded-full animate-ping opacity-75"
                            style={{ backgroundColor: 'var(--primary)' }}
                        />
                        <span
                            className="relative inline-flex h-2 w-2 rounded-full"
                            style={{ backgroundColor: 'var(--primary)' }}
                        />
                    </span>
                </Button>

            </div>
        </header>
    );
};

export default AppNavbar;
