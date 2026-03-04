import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    Inbox, CalendarDays, CalendarRange, Tag,
    FolderKanban, Users, TrendingUp, Settings,
    LogOut, Plus, PanelLeft,
} from 'lucide-react';
import {
    Sidebar, SidebarContent, SidebarFooter,
    SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
    SidebarHeader, SidebarMenu, SidebarMenuButton,
    SidebarMenuItem, SidebarSeparator, useSidebar,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';

/* ─── Nav definitions ──────────────────────────────── */
const mainNav = [
    { label: 'Inbox', icon: Inbox, href: '/app/inbox', badge: 4 },
    { label: 'Today', icon: CalendarDays, href: '/app/today' },
    { label: 'Upcoming', icon: CalendarRange, href: '/app/upcoming' },
    { label: 'Filters', icon: Tag, href: '/app/filters' },
];

const workspaceNav = [
    { label: 'My Projects', icon: FolderKanban, href: '/app/projects' },
    { label: 'Team', icon: Users, href: '/app/team' },
    { label: 'Analytics', icon: TrendingUp, href: '/app/analytics' },
];

/* ─── NavItem ──────────────────────────────────────── */
const NavItem = ({ label, icon: Icon, href, badge }) => (
    <SidebarMenuItem>
        <SidebarMenuButton asChild tooltip={label}>
            <NavLink to={href}>
                {({ isActive }) => (
                    <>
                        <Icon
                            className="w-4 h-4 shrink-0"
                            style={{ color: isActive ? 'var(--primary)' : 'currentColor' }}
                        />
                        <span className="flex-1 text-sm font-medium truncate" style={{ fontFamily: 'var(--font-sans)' }}>
                            {label}
                        </span>
                        {badge != null && (
                            <span
                                className="ml-auto shrink-0 rounded px-1.5 py-0.5 text-[10px] font-black leading-none tabular-nums"
                                style={{
                                    backgroundColor: isActive
                                        ? 'var(--primary)'
                                        : 'color-mix(in oklch, var(--primary) 14%, transparent)',
                                    color: isActive ? 'var(--primary-foreground)' : 'var(--primary)',
                                }}
                            >
                                {badge}
                            </span>
                        )}
                    </>
                )}
            </NavLink>
        </SidebarMenuButton>
    </SidebarMenuItem>
);

/* ─── AppSidebar ───────────────────────────────────── */
const AppSidebar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // isMobile → sidebar becomes a Sheet drawer (handled by shadcn internally)
    // On mobile: always fully expanded inside the Sheet, no icon-collapse
    // On desktop: collapsible to icon-only strip
    const { state, toggleSidebar, isMobile } = useSidebar();
    const isCollapsed = !isMobile && state === 'collapsed';

    const initials = user?.name
        ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : user?.email?.[0]?.toUpperCase() || '?';

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <Sidebar collapsible="icon">

            {/* ══ HEADER ══
                h-14 matches navbar exactly on all breakpoints.
                Desktop: [PanelLeft toggle] ····· [+ New Task]
                Mobile (Sheet): just [+ New Task] pushed right — Sheet handles close
            */}
            <SidebarHeader
                className="h-14 px-2 flex flex-row items-center gap-1 overflow-hidden border-b shrink-0"
                style={{ borderColor: 'var(--sidebar-border)' }}
            >
                {/* PanelLeft – only on desktop (mobile uses navbar hamburger) */}
                {!isMobile && (
                    <button
                        onClick={toggleSidebar}
                        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                        className="flex items-center justify-center w-8 h-8 rounded-md shrink-0
                            transition-colors duration-150
                            hover:bg-sidebar-accent
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
                        style={{ color: 'var(--sidebar-foreground)' }}
                    >
                        <PanelLeft className="w-4 h-4" />
                    </button>
                )}

                {/* Spacer */}
                <div className="flex-1" />

                {/* New Task */}
                {!isCollapsed && (
                    <button
                        aria-label="New task"
                        onClick={() => { /* open modal */ }}
                        className="flex items-center justify-center w-8 h-8 rounded-md shrink-0
                            transition-colors duration-150
                            hover:bg-sidebar-accent
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
                        style={{ color: 'var(--sidebar-foreground)' }}
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                )}
            </SidebarHeader>

            {/* ══ CONTENT ══ */}
            <SidebarContent className="overflow-x-hidden">

                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainNav.map(item => <NavItem key={item.href} {...item} />)}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator className="mx-0!" />

                <SidebarGroup>
                    <SidebarGroupLabel
                        className="text-[10px] font-black uppercase tracking-widest"
                        style={{ fontFamily: 'var(--font-sans)' }}
                    >
                        Workspace
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {workspaceNav.map(item => <NavItem key={item.href} {...item} />)}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

            </SidebarContent>

            {/* ══ FOOTER ══ */}
            <SidebarSeparator className="mx-0!" />
            <SidebarFooter className="overflow-x-hidden pb-2">
                <SidebarMenu>

                    {/* Settings */}
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Settings">
                            <NavLink to="/app/settings">
                                {({ isActive }) => (
                                    <>
                                        <Settings
                                            className="w-4 h-4 shrink-0"
                                            style={{ color: isActive ? 'var(--primary)' : 'currentColor' }}
                                        />
                                        <span className="text-sm font-medium truncate" style={{ fontFamily: 'var(--font-sans)' }}>
                                            Settings
                                        </span>
                                    </>
                                )}
                            </NavLink>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* User card */}
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            tooltip={user?.name || 'Profile'}
                            onClick={() => navigate('/app/profile')}
                            className="cursor-pointer h-12 rounded-xl"
                        >
                            <Avatar className="w-7 h-7 shrink-0">
                                <AvatarImage
                                    src={user?.avatar || ''}
                                    alt={user?.name || 'User'}
                                />
                                <AvatarFallback
                                    className="text-[10px] font-black"
                                    style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
                                >
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
                                <span className="text-[0.8rem] font-bold truncate leading-tight" style={{ fontFamily: 'var(--font-sans)' }}>
                                    {user?.name || 'User'}
                                </span>
                                <span className="text-[0.68rem] truncate leading-tight"
                                    style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}>
                                    {user?.email || ''}
                                </span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* Logout */}
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            tooltip="Log out"
                            onClick={handleLogout}
                            className="cursor-pointer"
                        >
                            <LogOut className="w-4 h-4 shrink-0" style={{ color: 'var(--muted-foreground)' }} />
                            <span className="text-sm font-medium truncate"
                                style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}>
                                Log out
                            </span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
};

export default AppSidebar;
