import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from '@/components/app/AppSidebar';
import AppNavbar from '@/components/app/AppNavbar';

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
                        <Route path="inbox" element={<Placeholder title="Inbox" />} />
                        <Route path="today" element={<Placeholder title="Today" />} />
                        <Route path="upcoming" element={<Placeholder title="Upcoming" />} />
                        <Route path="filters" element={<Placeholder title="Filters & Labels" />} />

                        {/* Workspace routes */}
                        <Route path="projects" element={<Placeholder title="My Projects" />} />
                        <Route path="projects/:id" element={<Placeholder title="Project" />} />
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
        </SidebarProvider>
    );
};

export default AppLayout;
