import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProject } from '@/hooks/useProjects';
import { useAuth } from '@/context/AuthContext';
import { useAddTask } from '@/context/AddTaskContext';
import { format } from 'date-fns';
import {
    Folder, FolderOpen, Users, ClipboardList, Settings,
    Link, RefreshCw, Trash2, Shield, UserMinus, Copy,
    CheckCircle2, Circle, MoreHorizontal, Crown, UserCheck,
    AlertTriangle, Plus, ExternalLink, Clock, Ban
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import TodoListView from '@/components/app/TodoListView';

/* ──────────────────────────────────
   Small helpers
────────────────────────────────── */
const ROLE_META = {
    owner:  { label: 'Owner',  icon: Crown,     color: 'text-amber-500',   bg: 'bg-amber-500/10'   },
    admin:  { label: 'Admin',  icon: Shield,    color: 'text-indigo-500',  bg: 'bg-indigo-500/10'  },
    member: { label: 'Member', icon: UserCheck, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
};

const Avatar = ({ user, size = 'md' }) => {
    const initials = user?.name?.trim().split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?';
    const sz = size === 'sm' ? 'w-7 h-7 text-[10px]' : 'w-9 h-9 text-xs';
    return (
        <div className={cn('rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold shrink-0', sz)}>
            {user?.avatar
                ? <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                : initials}
        </div>
    );
};

const Tab = ({ label, icon: Icon, active, onClick, badge }) => (
    <button
        onClick={onClick}
        className={cn(
            'flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all',
            active
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
        )}
    >
        <Icon className="w-4 h-4" />
        {label}
        {badge != null && (
            <span className={cn('rounded px-1.5 py-0.5 text-[10px] font-black leading-none', active ? 'bg-primary text-white' : 'bg-muted text-muted-foreground')}>
                {badge}
            </span>
        )}
    </button>
);

/* ──────────────────────────────────
   Invite Link Panel (admin only)
────────────────────────────────── */
const InviteLinkPanel = ({ projectId, generateInviteLink, regenerateInviteLink, revokeInviteLink }) => {
    const [link, setLink] = useState('');
    const [expiresAt, setExpiresAt] = useState(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleGenerate = async (regenerate = false) => {
        setLoading(true);
        try {
            const fn = regenerate ? regenerateInviteLink : generateInviteLink;
            const data = await fn(168);
            setLink(data.inviteUrl || `${window.location.origin}/projects/join/${data.inviteToken}`);
            setExpiresAt(data.expiresAt);
            toast.success(regenerate ? 'Link regenerated!' : 'Invite link generated!');
        } catch (e) {
            toast.error('Failed to generate link');
        } finally {
            setLoading(false);
        }
    };

    const handleRevoke = async () => {
        setLoading(true);
        try {
            await revokeInviteLink();
            setLink('');
            setExpiresAt(null);
            toast.success('Link revoked');
        } catch {
            toast.error('Failed to revoke');
        } finally {
            setLoading(false);
        }
    };

    const copyLink = () => {
        navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="rounded-2xl border border-border/40 bg-muted/10 p-5">
            <div className="flex items-center gap-2 mb-4">
                <Link className="w-4 h-4 text-primary" />
                <h3 className="font-bold text-sm">Invite Link</h3>
                {expiresAt && (
                    <span className="ml-auto text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Expires {format(new Date(expiresAt), 'MMM d, yyyy')}
                    </span>
                )}
            </div>

            {link ? (
                <div className="space-y-3">
                    {/* Link display */}
                    <div className={cn(
                        'flex items-center gap-2 bg-background border rounded-xl px-3 py-2 transition-colors duration-300',
                        copied ? 'border-emerald-500/40 bg-emerald-50/50 dark:bg-emerald-950/20' : 'border-border/40'
                    )}>
                        <span className="flex-1 text-xs text-muted-foreground font-mono truncate">{link}</span>
                        <Button
                            size="sm"
                            variant="ghost"
                            className={cn(
                                'h-7 px-2 shrink-0 transition-colors duration-200 gap-1.5 text-xs font-semibold',
                                copied
                                    ? 'text-emerald-600 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
                                    : 'text-muted-foreground hover:text-foreground'
                            )}
                            onClick={copyLink}
                        >
                            {copied
                                ? <><Check className="w-3.5 h-3.5" /> Copied!</>
                                : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                        </Button>
                    </div>
                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="gap-1.5 rounded-lg font-medium" onClick={() => handleGenerate(true)} disabled={loading}>
                            <RefreshCw className={cn('w-3.5 h-3.5', loading && 'animate-spin')} />
                            Regenerate
                        </Button>
                        <Button size="sm" variant="ghost" className="gap-1.5 rounded-lg font-medium text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30" onClick={handleRevoke} disabled={loading}>
                            <Ban className="w-3.5 h-3.5" />
                            Revoke
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="flex items-center gap-3">
                    <p className="text-sm text-muted-foreground flex-1">No active invite link. Generate one to invite members.</p>
                    <Button size="sm" className="gap-1.5 rounded-xl font-bold shrink-0" onClick={() => handleGenerate(false)} disabled={loading}>
                        <Plus className="w-3.5 h-3.5" />
                        Generate link
                    </Button>
                </div>
            )}
        </div>
    );
};

/* ──────────────────────────────────
   Members Panel
────────────────────────────────── */
const MembersPanel = ({ project, currentUser, isAdmin, removeMember, updateMemberRole }) => {
    const [removingId, setRemovingId] = useState(null); // userId to confirm remove

    const handleRemove = async () => {
        try {
            await removeMember(removingId);
            toast.success('Member removed');
        } catch (e) {
            toast.error(e?.response?.data?.message || 'Failed to remove member');
        } finally {
            setRemovingId(null);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            await updateMemberRole(userId, newRole);
            toast.success('Role updated');
        } catch (e) {
            toast.error(e?.response?.data?.message || 'Failed to update role');
        }
    };

    return (
        <>
            <div className="space-y-2">
                {project.members.map(m => {
                    const uid = m.user?._id || m.user;
                    const isMe = uid === currentUser?._id;
                    const meta = ROLE_META[m.role] || ROLE_META.member;
                    const RoleIcon = meta.icon;

                    return (
                        <div
                            key={uid}
                            className="flex items-center gap-3 p-3 rounded-xl bg-muted/20 border border-border/30 hover:border-border/50 transition-colors group"
                        >
                            <Avatar user={m.user} />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold truncate">{m.user?.name || 'Unknown'}</span>
                                    {isMe && <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-bold">You</span>}
                                </div>
                                <span className="text-xs text-muted-foreground truncate">{m.user?.email}</span>
                            </div>

                            {/* Role badge */}
                            <div className={cn('flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold', meta.bg, meta.color)}>
                                <RoleIcon className="w-3 h-3" />
                                {meta.label}
                            </div>

                            {/* Admin actions */}
                            {isAdmin && m.role !== 'owner' && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="w-7 h-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-44 rounded-xl shadow-2xl">
                                        {m.role === 'member' && (
                                            <DropdownMenuItem className="rounded-lg font-medium" onClick={() => handleRoleChange(uid, 'admin')}>
                                                <Shield className="w-4 h-4 mr-2 text-indigo-500" /> Promote to Admin
                                            </DropdownMenuItem>
                                        )}
                                        {m.role === 'admin' && (
                                            <DropdownMenuItem className="rounded-lg font-medium" onClick={() => handleRoleChange(uid, 'member')}>
                                                <UserCheck className="w-4 h-4 mr-2 text-emerald-500" /> Demote to Member
                                            </DropdownMenuItem>
                                        )}
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            className="text-red-500 hover:text-red-600 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950/30 rounded-lg font-medium"
                                            onClick={() => setRemovingId(uid)}
                                        >
                                            <UserMinus className="w-4 h-4 mr-2 text-red-500" /> Remove member
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </div>
                    );
                })}
            </div>

            <AlertDialog open={!!removingId} onOpenChange={o => { if (!o) setRemovingId(null); }}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Remove this member?</AlertDialogTitle>
                        <AlertDialogDescription>
                            They will lose access to this project immediately. Their tasks will remain in the project.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white" onClick={handleRemove}>
                            Remove member
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

/* ──────────────────────────────────
   Main ProjectPage
────────────────────────────────── */
const ProjectPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user: currentUser } = useAuth();
    const { todos } = useAddTask();

    const {
        project, loading, error,
        removeMember, updateMemberRole,
        generateInviteLink, regenerateInviteLink, revokeInviteLink,
    } = useProject(id);

    const [tab, setTab] = useState('tasks'); // 'tasks' | 'members' | 'settings'

    /* ── Loading skeleton ── */
    if (loading) {
        return (
            <div className="max-w-3xl mx-auto w-full px-4 py-8 space-y-6">
                <div className="h-8 w-52 animate-pulse bg-muted rounded-xl" />
                <div className="flex gap-2">
                    {[1, 2, 3].map(i => <div key={i} className="h-10 w-24 animate-pulse bg-muted rounded-xl" />)}
                </div>
                <div className="space-y-3">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-14 animate-pulse bg-muted rounded-xl" />)}
                </div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="flex flex-col items-center justify-center flex-1 h-[60vh] gap-4">
                <AlertTriangle className="w-12 h-12 text-muted-foreground/30" />
                <h2 className="text-2xl font-black">Project not found</h2>
                <p className="text-muted-foreground">This project doesn't exist or you don't have access.</p>
                <Button variant="outline" onClick={() => navigate('/app/projects')}>Go back</Button>
            </div>
        );
    }

    /* ── Role detection ── */
    const myMember = project.members.find(m => {
        const uid = m.user?._id || m.user;
        return uid === currentUser?._id;
    });
    const myRole = myMember?.role || 'member';
    const isAdmin = myRole === 'owner' || myRole === 'admin';
    const isOwner = myRole === 'owner';

    /* project todos filtered from context */
    const projectTodos = (todos || []).filter(t => t.project?._id === id || t.project === id);

    return (
        <div className="max-w-3xl mx-auto w-full" style={{ fontFamily: 'var(--font-sans)' }}>

            {/* ── Header ── */}
            <div className="px-4 pt-6 pb-4">
                <div className="flex items-start gap-3 mb-1">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Folder className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h1 className="text-2xl font-black tracking-tight truncate" style={{ fontFamily: 'var(--font-serif)' }}>
                            {project.name}
                        </h1>
                        {project.description && (
                            <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{project.description}</p>
                        )}
                    </div>

                    {/* My role badge — always visible */}
                    <div className={cn('flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold shrink-0', ROLE_META[myRole]?.bg, ROLE_META[myRole]?.color)}>
                        {React.createElement(ROLE_META[myRole]?.icon || UserCheck, { className: 'w-3 h-3' })}
                        {ROLE_META[myRole]?.label}
                    </div>
                </div>

                {/* Stats pills */}
                <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                        <ClipboardList className="w-3.5 h-3.5" />
                        {projectTodos.length} task{projectTodos.length !== 1 ? 's' : ''}
                    </span>
                    <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {project.members.length} member{project.members.length !== 1 ? 's' : ''}
                    </span>
                    <span className={cn(
                        'px-2 py-0.5 rounded font-bold',
                        project.status === 'active'    ? 'bg-emerald-500/10 text-emerald-500' :
                        project.status === 'on-hold'   ? 'bg-amber-500/10 text-amber-500' :
                        project.status === 'completed' ? 'bg-primary/10 text-primary' :
                                                          'bg-muted text-muted-foreground'
                    )}>
                        {project.status}
                    </span>
                </div>
            </div>

            {/* ── Tabs ── */}
            <div className="flex items-center gap-1 px-4 mb-4 border-b border-border/30 pb-2">
                <Tab label="Tasks" icon={ClipboardList} active={tab === 'tasks'} onClick={() => setTab('tasks')} badge={projectTodos.length || null} />
                <Tab label="Members" icon={Users} active={tab === 'members'} onClick={() => setTab('members')} badge={project.members.length} />
                {isAdmin && <Tab label="Settings" icon={Settings} active={tab === 'settings'} onClick={() => setTab('settings')} />}
            </div>

            {/* ── Tab content ── */}
            <div className="px-4 pb-8">

                {/* ─ Tasks ─ */}
                {tab === 'tasks' && (
                    <div>
                        {projectTodos.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="w-16 h-16 rounded-2xl bg-muted/40 flex items-center justify-center mb-4">
                                    <FolderOpen className="w-8 h-8 text-muted-foreground/30" />
                                </div>
                                <h3 className="text-xl font-black opacity-40 mb-1">No tasks yet</h3>
                                <p className="text-sm text-muted-foreground/40">Add your first task to this project.</p>
                            </div>
                        ) : (
                            <TodoListView
                                hideTitle
                                filter={t => t.project?._id === id || t.project === id}
                            />
                        )}
                    </div>
                )}

                {/* ─ Members ─ */}
                {tab === 'members' && (
                    <div className="space-y-6">
                        {/* Invite panel — admin only */}
                        {isAdmin && (
                            <InviteLinkPanel
                                projectId={id}
                                generateInviteLink={generateInviteLink}
                                regenerateInviteLink={regenerateInviteLink}
                                revokeInviteLink={revokeInviteLink}
                            />
                        )}

                        {/* Members list */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Members ({project.members.length})</h3>
                            </div>
                            <MembersPanel
                                project={project}
                                currentUser={currentUser}
                                isAdmin={isAdmin}
                                removeMember={removeMember}
                                updateMemberRole={updateMemberRole}
                            />
                        </div>
                    </div>
                )}

                {/* ─ Settings (owner/admin only) ─ */}
                {tab === 'settings' && isAdmin && (
                    <div className="space-y-5 max-w-lg">
                        {/* Project status */}
                        <div className="rounded-2xl border border-border/40 p-5 space-y-4">
                            <h3 className="font-bold text-sm flex items-center gap-2">
                                <Settings className="w-4 h-4 text-muted-foreground" />
                                Project Info
                            </h3>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <p className="text-xs font-semibold text-muted-foreground mb-1">Status</p>
                                    <span className={cn(
                                        'px-2 py-1 rounded-lg text-xs font-bold',
                                        project.status === 'active'    ? 'bg-emerald-500/10 text-emerald-500' :
                                        project.status === 'on-hold'   ? 'bg-amber-500/10 text-amber-500' :
                                        project.status === 'completed' ? 'bg-primary/10 text-primary' :
                                                                          'bg-muted text-muted-foreground'
                                    )}>
                                        {project.status}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-muted-foreground mb-1">Priority</p>
                                    <span className={cn(
                                        'px-2 py-1 rounded-lg text-xs font-bold',
                                        project.priority === 'high'   ? 'bg-red-500/10 text-red-500' :
                                        project.priority === 'medium' ? 'bg-amber-500/10 text-amber-500' :
                                                                         'bg-emerald-500/10 text-emerald-500'
                                    )}>
                                        {project.priority}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-muted-foreground mb-1">Category</p>
                                    <span className="text-foreground capitalize">{project.category || '—'}</span>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-muted-foreground mb-1">Deadline</p>
                                    <span className="text-foreground">
                                        {project.deadline ? format(new Date(project.deadline), 'MMM d, yyyy') : '—'}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-muted-foreground mb-1">Created</p>
                                    <span className="text-foreground">{format(new Date(project.createdAt), 'MMM d, yyyy')}</span>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-muted-foreground mb-1">Members can add tasks</p>
                                    <span className={project.permissions?.membersCanCreateTodos ? 'text-emerald-500 font-bold' : 'text-muted-foreground'}>
                                        {project.permissions?.membersCanCreateTodos ? 'Yes' : 'No'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Danger zone — owner only */}
                        {isOwner && (
                            <div className="rounded-2xl border border-red-200 dark:border-red-900/40 p-5 space-y-3">
                                <h3 className="font-bold text-sm text-red-500 flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4" />
                                    Danger Zone
                                </h3>
                                <p className="text-xs text-muted-foreground">
                                    Deleting this project will permanently remove all tasks and member access.
                                </p>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-2 border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600 dark:border-red-900 dark:hover:bg-red-950/30 rounded-xl font-bold"
                                    onClick={() => navigate('/app/projects')}
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    Delete project
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectPage;
