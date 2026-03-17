import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    Inbox, CalendarDays, CalendarRange, Tag,
    Users, TrendingUp, Settings,
    LogOut, Plus, PanelLeft, CheckCircle2,
    ChevronDown, ChevronRight, Folder, FolderPlus
} from 'lucide-react';
import {
    Sidebar, SidebarContent, SidebarFooter,
    SidebarGroup, SidebarGroupContent,
    SidebarHeader, SidebarMenu, SidebarMenuButton,
    SidebarMenuItem, SidebarSeparator, useSidebar,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { useAddTask } from '@/context/AddTaskContext';
import { useProjects } from '@/hooks/useProjects';
import { cn } from '@/lib/utils';

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
    const { todos, setOpen: openAddTask } = useAddTask();
    const { projects } = useProjects();
    const navigate = useNavigate();
    const [projectsOpen, setProjectsOpen] = useState(true);

    const inboxCount = (todos || []).filter(t => !t.completed).length;

    const mainNav = [
        { label: 'Inbox', icon: Inbox, href: '/app/inbox', badge: inboxCount > 0 ? inboxCount : null },
        { label: 'Today', icon: CalendarDays, href: '/app/today' },
        { label: 'Upcoming', icon: CalendarRange, href: '/app/upcoming' },
        { label: 'Filters', icon: Tag, href: '/app/filters' },
        { label: 'Completed', icon: CheckCircle2, href: '/app/completed' },
    ];

    const workspaceNav = [
        { label: 'Team', icon: Users, href: '/app/team' },
        { label: 'Analytics', icon: TrendingUp, href: '/app/analytics' },
    ];

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

            <SidebarHeader
                className="h-14 px-2 flex flex-row items-center gap-1 overflow-hidden border-b shrink-0"
                style={{ borderColor: 'var(--sidebar-border)' }}
            >
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

                <div className="flex-1" />

                {!isCollapsed && (
                    <button
                        aria-label="New task"
                        onClick={() => openAddTask(true)}
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

            <SidebarContent className="overflow-x-hidden">

                {/* ── Main nav ── */}
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainNav.map(item => <NavItem key={item.href} {...item} />)}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator className="mx-0!" />

                {/* ── Projects (inline, collapsible) ── */}
                {!isCollapsed && (
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {/* Projects header row */}
                                <SidebarMenuItem>
                                    <div className="flex items-center justify-between px-2 py-1.5 group/projects-header">
                                        <button
                                            className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 hover:text-muted-foreground transition-colors flex-1"
                                            onClick={() => setProjectsOpen(v => !v)}
                                        >
                                            {projectsOpen
                                                ? <ChevronDown className="w-3 h-3" />
                                                : <ChevronRight className="w-3 h-3" />
                                            }
                                            Projects
                                        </button>
                                        <button
                                            aria-label="New project"
                                            onClick={() => navigate('/app/projects')}
                                            className="opacity-0 group-hover/projects-header:opacity-100 transition-opacity w-5 h-5 flex items-center justify-center text-muted-foreground hover:text-foreground rounded"
                                        >
                                            <Plus className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </SidebarMenuItem>

                                {/* Project list */}
                                {projectsOpen && (
                                    <>
                                        {projects.length === 0 ? (
                                            <SidebarMenuItem>
                                                <button
                                                    onClick={() => navigate('/app/projects')}
                                                    className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors rounded-md"
                                                >
                                                    <FolderPlus className="w-3.5 h-3.5" />
                                                    Create a project
                                                </button>
                                            </SidebarMenuItem>
                                        ) : (
                                            projects.map(p => (
                                                <SidebarMenuItem key={p._id}>
                                                    <SidebarMenuButton asChild tooltip={p.name}>
                                                        <NavLink to={`/app/projects/${p._id}`}>
                                                            {({ isActive }) => (
                                                                <>
                                                                    <Folder
                                                                        className="w-4 h-4 shrink-0"
                                                                        style={{ color: isActive ? 'var(--primary)' : 'currentColor' }}
                                                                    />
                                                                    <span className="flex-1 text-sm font-medium truncate">
                                                                        {p.name}
                                                                    </span>
                                                                </>
                                                            )}
                                                        </NavLink>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            ))
                                        )}
                                    </>
                                )}

                                <SidebarSeparator className="mx-0! mt-2" />

                                {/* Workspace nav */}
                                {workspaceNav.map(item => <NavItem key={item.href} {...item} />)}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                )}

                {/* Collapsed: show folder icons for projects */}
                {isCollapsed && (
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {projects.map(p => (
                                    <SidebarMenuItem key={p._id}>
                                        <SidebarMenuButton asChild tooltip={p.name}>
                                            <NavLink to={`/app/projects/${p._id}`}>
                                                {({ isActive }) => (
                                                    <Folder
                                                        className="w-4 h-4 shrink-0"
                                                        style={{ color: isActive ? 'var(--primary)' : 'currentColor' }}
                                                    />
                                                )}
                                            </NavLink>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                                {workspaceNav.map(item => <NavItem key={item.href} {...item} />)}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                )}

            </SidebarContent>

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
                                <AvatarImage src={user?.avatar || ''} alt={user?.name || 'User'} />
                                <AvatarFallback
                                    className="text-[10px] font-black"
                                    style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
                                >
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col min-w-0 flex-1 overflow-hidden text-left">
                                <span className="text-[0.8rem] font-bold truncate leading-tight" style={{ fontFamily: 'var(--font-sans)' }}>
                                    {user?.name || 'User'}
                                </span>
                                <span className="text-[0.68rem] truncate leading-tight text-muted-foreground" style={{ fontFamily: 'var(--font-sans)' }}>
                                    {user?.email || ''}
                                </span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* Logout */}
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Log out" onClick={handleLogout} className="cursor-pointer">
                            <LogOut className="w-4 h-4 shrink-0 text-muted-foreground" />
                            <span className="text-sm font-medium truncate text-muted-foreground" style={{ fontFamily: 'var(--font-sans)' }}>
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
