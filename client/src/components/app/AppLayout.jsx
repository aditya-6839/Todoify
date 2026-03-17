import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from '@/components/app/AppSidebar';
import AppNavbar from '@/components/app/AppNavbar';
import InboxPage from '@/Pages/app/InboxPage';
import TodayPage from '@/Pages/app/TodayPage';
import UpcomingPage from '@/Pages/app/UpcomingPage';
import CompletedPage from '@/Pages/app/CompletedPage';
import ProjectPage from '@/Pages/app/ProjectPage';
import ProjectsPage from '@/Pages/app/ProjectsPage';
import FiltersPage from '@/Pages/app/FiltersPage';
import TeamPage from '@/Pages/app/TeamPage';
import AnalyticsPage from '@/Pages/app/AnalyticsPage';

import { AddTaskProvider } from '@/context/AddTaskContext';
import AddTaskDialog from '@/components/app/AddTaskDialog';

/* ── Stub pages (replace with real pages as you build them) ── */
const Placeholder = ({ title }) => (
    <div className="flex flex-col items-center justify-center flex-1 gap-3 min-h-[60vh]">
        <div
            className="text-4xl font-black tracking-tight"
            style={{ color: 'var(--foreground)', fontFamily: 'var(--font-serif)' }}
        >
            {title}
        </div>
        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
            This page is coming soon.
        </p>
    </div>
);

/* ── AppLayout ──────────────────────────────────── */
const AppLayout = () => {
    return (
        <AddTaskProvider>
            <SidebarProvider defaultOpen={true}>
                {/* Left sidebar */}
                <AppSidebar />

                {/* Main content area */}
                <SidebarInset>
                    {/* Top navbar — sticky */}
                    <AppNavbar />

                    {/* Page content */}
                    <div className="flex flex-1 flex-col p-6">
                        <Routes>
                            {/* Default redirect */}
                            <Route index element={<Navigate to="inbox" replace />} />

                            {/* Core routes */}
                            <Route path="inbox" element={<InboxPage />} />

                            <Route path="today" element={<TodayPage />} />
                            <Route path="upcoming" element={<UpcomingPage />} />
                            <Route path="completed" element={<CompletedPage />} />
                            <Route path="filters" element={<FiltersPage />} />

                            {/* Workspace routes */}
                            <Route path="projects" element={<ProjectsPage />} />
                            <Route path="projects/:id" element={<ProjectPage />} />
                            <Route path="team" element={<Placeholder title="Team" />} />
                            <Route path="analytics" element={<Placeholder title="Analytics" />} />

                            {/* Account */}
                            <Route path="settings" element={<Placeholder title="Settings" />} />
                            <Route path="profile" element={<Placeholder title="Profile" />} />

                            {/* Fallback */}
                            <Route path="*" element={<Navigate to="inbox" replace />} />
                        </Routes>
                    </div>
                </SidebarInset>

                {/* Add Task Dialog — available everywhere */}
                <AddTaskDialog />
            </SidebarProvider>
        </AddTaskProvider>
    );
};

export default AppLayout;
