import React, { useState } from 'react';
import { useProjects } from '@/hooks/useProjects';
import {
    FolderOpen, Plus, Folder, MoreHorizontal,
    Trash2, ExternalLink, FolderPlus, Layers
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

/* Pastel accent colours cycled per project card */
const ACCENTS = [
    { bg: 'bg-violet-500/10', icon: 'text-violet-500', ring: 'group-hover:ring-violet-500/30' },
    { bg: 'bg-indigo-500/10', icon: 'text-indigo-500', ring: 'group-hover:ring-indigo-500/30' },
    { bg: 'bg-sky-500/10',    icon: 'text-sky-500',    ring: 'group-hover:ring-sky-500/30'    },
    { bg: 'bg-emerald-500/10',icon: 'text-emerald-500',ring: 'group-hover:ring-emerald-500/30'},
    { bg: 'bg-amber-500/10',  icon: 'text-amber-500',  ring: 'group-hover:ring-amber-500/30'  },
    { bg: 'bg-rose-500/10',   icon: 'text-rose-500',   ring: 'group-hover:ring-rose-500/30'   },
];

const ProjectsPage = () => {
    const { projects, loading, deleteProject, createProject } = useProjects();
    const navigate = useNavigate();
    const [isCreating, setIsCreating] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');
    const [deleteTarget, setDeleteTarget] = useState(null); // project object

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!newProjectName.trim()) return;
        try {
            const created = await createProject({ name: newProjectName.trim() });
            setNewProjectName('');
            setIsCreating(false);
            toast.success('Project created');
        } catch {
            toast.error('Failed to create project');
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        try {
            await deleteProject(deleteTarget._id);
            toast.success('Project deleted');
        } catch {
            toast.error('Failed to delete project');
        } finally {
            setDeleteTarget(null);
        }
    };

    if (loading) {
        return (
            <div className="max-w-5xl mx-auto w-full px-6 py-10">
                <div className="h-8 w-48 animate-pulse bg-muted rounded-lg mb-10" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-44 w-full animate-pulse bg-muted rounded-2xl" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="max-w-5xl mx-auto w-full px-4 lg:px-8 py-6" style={{ fontFamily: 'var(--font-sans)' }}>

                {/* ── Header ── */}
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 mb-1">Workspace</p>
                        <h1 className="text-3xl font-black tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
                            My Projects
                        </h1>
                    </div>
                    <Button
                        onClick={() => setIsCreating(true)}
                        className="gap-2 rounded-xl font-bold shadow-lg shadow-primary/15 px-5"
                    >
                        <Plus className="w-4 h-4" />
                        New Project
                    </Button>
                </div>

                {/* ── Create form ── */}
                {isCreating && (
                    <div className="mb-8 rounded-2xl border border-border/50 bg-muted/20 p-5 animate-in fade-in slide-in-from-top-3 duration-200">
                        <p className="text-sm font-semibold mb-3 text-foreground">New project</p>
                        <form onSubmit={handleCreate} className="flex gap-3">
                            <input
                                autoFocus
                                value={newProjectName}
                                onChange={e => setNewProjectName(e.target.value)}
                                placeholder="Project name..."
                                className="flex-1 bg-background border border-border/50 rounded-xl px-4 h-10 text-sm font-semibold focus:border-primary/40 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            />
                            <Button type="button" variant="ghost" className="h-10 rounded-xl" onClick={() => { setIsCreating(false); setNewProjectName(''); }}>
                                Cancel
                            </Button>
                            <Button type="submit" className="h-10 px-6 rounded-xl font-bold" disabled={!newProjectName.trim()}>
                                Create
                            </Button>
                        </form>
                    </div>
                )}

                {/* ── Projects grid ── */}
                {projects.length === 0 && !isCreating ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center rounded-3xl border-2 border-dashed border-border/40">
                        <div className="w-16 h-16 rounded-2xl bg-muted/60 flex items-center justify-center mb-5">
                            <FolderPlus className="w-8 h-8 text-muted-foreground/30" />
                        </div>
                        <h3 className="text-xl font-black opacity-40 mb-1">No projects yet</h3>
                        <p className="text-sm text-muted-foreground/40 mb-6">Start by creating your first project workspace.</p>
                        <Button onClick={() => setIsCreating(true)} variant="outline" className="gap-2 rounded-xl font-bold">
                            <Plus className="w-4 h-4" /> Create project
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {(projects || []).map((project, idx) => {
                            const accent = ACCENTS[idx % ACCENTS.length];
                            return (
                                <div
                                    key={project._id}
                                    className={cn(
                                        "group relative bg-background border border-border/30 rounded-2xl p-5 cursor-pointer",
                                        "hover:shadow-xl transition-all duration-200 ring-2 ring-transparent",
                                        accent.ring
                                    )}
                                    onClick={() => navigate(`/app/projects/${project._id}`)}
                                >
                                    {/* ⋯ menu */}
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}>
                                                <Button variant="ghost" size="icon" className="w-7 h-7 rounded-lg text-muted-foreground hover:text-foreground">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-44 rounded-xl shadow-2xl">
                                                <DropdownMenuItem
                                                    onClick={e => { e.stopPropagation(); navigate(`/app/projects/${project._id}`); }}
                                                    className="rounded-lg font-medium"
                                                >
                                                    <ExternalLink className="w-4 h-4 mr-2" />
                                                    Open project
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-red-500 hover:text-red-600 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950/30 dark:focus:text-red-400 rounded-lg font-medium"
                                                    onClick={e => { e.stopPropagation(); setDeleteTarget(project); }}
                                                >
                                                    <Trash2 className="w-4 h-4 mr-2 text-red-500" />
                                                    Delete project
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    {/* Icon */}
                                    <div className={cn(
                                        "w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-105",
                                        accent.bg
                                    )}>
                                        <Folder className={cn("w-5 h-5", accent.icon)} />
                                    </div>

                                    {/* Name */}
                                    <h3 className="text-base font-black tracking-tight mb-0.5 truncate pr-6">
                                        {project.name}
                                    </h3>
                                    <p className="text-xs text-muted-foreground/50 font-semibold uppercase tracking-widest">
                                        Project
                                    </p>

                                    {/* Footer row */}
                                    <div className="mt-5 flex items-center justify-between">
                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                                            <Layers className="w-3.5 h-3.5" />
                                            <span>Workspace</span>
                                        </div>
                                        <div className="flex -space-x-1.5">
                                            {[0, 1].map(i => (
                                                <div
                                                    key={i}
                                                    className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 border-2 border-background flex items-center justify-center text-[9px] font-black text-white"
                                                >
                                                    {String.fromCharCode(65 + i)}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* ── Delete Project Confirmation ── */}
            <AlertDialog open={!!deleteTarget} onOpenChange={o => { if (!o) setDeleteTarget(null); }}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete this project?</AlertDialogTitle>
                        <AlertDialogDescription>
                            <strong>"{deleteTarget?.name}"</strong> and all its settings will be permanently deleted.
                            Tasks in this project will move to your Inbox. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDeleteTarget(null)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700 text-white focus:ring-red-600"
                            onClick={handleDelete}
                        >
                            Delete project
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default ProjectsPage;
