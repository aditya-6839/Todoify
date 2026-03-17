import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import {
    Inbox, Calendar as CalendarIcon, Flag, Tag, Folder,
    Circle, CheckCircle2, X, ChevronRight, MessageCircle,
    Trash2, Plus, Check, MoreHorizontal, Send, Save, RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Drawer, DrawerContent, DrawerClose,
} from '@/components/ui/drawer';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
    Popover, PopoverContent, PopoverTrigger,
} from '@/components/ui/popover';
import {
    Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
} from '@/components/ui/command';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { useAddTask } from '@/context/AddTaskContext';
import { useProjects } from '@/hooks/useProjects';
import { useLabels } from '@/hooks/useLabels';
import toast from 'react-hot-toast';

const PRIORITIES = [
    { value: 'high', label: 'Priority 1', color: '#ef4444' },
    { value: 'medium', label: 'Priority 2', color: '#f59e0b' },
    { value: 'low', label: 'Priority 3', color: '#10b981' },
];

const priorityColors = {
    high: '#ef4444',
    medium: '#f59e0b',
    low: '#10b981',
};

/* ── Build a clean snapshot of a todo for comparison ── */
const buildSnapshot = (todo) => ({
    title: todo?.title || '',
    description: todo?.description || '',
    dueDate: todo?.dueDate || null,
    priority: todo?.priority || 'medium',
    project: todo?.project?._id || todo?.project || null,
    labels: (todo?.labels || []).map(l => l._id || l).sort(),
});

const snapshotsEqual = (a, b) =>
    JSON.stringify(a) === JSON.stringify(b);

const TodoDetailDrawer = ({ todo: initialTodo, open, onOpenChange }) => {
    const { todos, toggleTodo, updateTodo, addComment, deleteComment, deleteTodo } = useAddTask();
    const { projects } = useProjects();
    const { labels: allLabels } = useLabels();

    // Always use live todo from context
    const todo = todos?.find(t => t._id === initialTodo?._id) || initialTodo;

    // ── local draft state (no API calls until Save) ──
    const [draft, setDraft] = useState(buildSnapshot(todo));
    const [savedSnapshot, setSavedSnapshot] = useState(buildSnapshot(todo));
    const isDirty = !snapshotsEqual(draft, savedSnapshot);

    // comment state
    const [commentText, setCommentText] = useState('');
    const [submittingComment, setSubmittingComment] = useState(false);

    // UI state
    const [projectOpen, setProjectOpen] = useState(false);
    const [commentsExpanded, setCommentsExpanded] = useState(true);

    // AlertDialog state
    const [saveAlertOpen, setSaveAlertOpen] = useState(false);
    const [deleteTodoAlertOpen, setDeleteTodoAlertOpen] = useState(false);
    const [deleteCommentTarget, setDeleteCommentTarget] = useState(null);
    const [saving, setSaving] = useState(false);

    // Reset draft when drawer opens for a different todo
    useEffect(() => {
        if (todo) {
            const snap = buildSnapshot(todo);
            setDraft(snap);
            setSavedSnapshot(snap);
        }
    }, [todo?._id, open]);

    if (!todo) return null;

    const circleColor = priorityColors[draft.priority] || 'var(--primary)';
    const currentPriority = PRIORITIES.find(p => p.value === draft.priority);

    const updateDraft = (field, value) => {
        setDraft(prev => ({ ...prev, [field]: value }));
    };

    const toggleLabelDraft = (labelId) => {
        setDraft(prev => {
            const current = prev.labels || [];
            const next = current.includes(labelId)
                ? current.filter(id => id !== labelId)
                : [...current, labelId].sort();
            return { ...prev, labels: next };
        });
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateTodo(todo._id, {
                title: draft.title,
                description: draft.description,
                dueDate: draft.dueDate,
                priority: draft.priority,
                project: draft.project,
                labels: draft.labels,
            });
            setSavedSnapshot({ ...draft });
            toast.success('Changes saved');
        } catch {
            toast.error('Failed to save changes');
        } finally {
            setSaving(false);
            setSaveAlertOpen(false);
        }
    };

    const handleDiscard = () => {
        setDraft({ ...savedSnapshot });
    };

    const handleComment = async () => {
        if (!commentText.trim() || submittingComment) return;
        try {
            setSubmittingComment(true);
            await addComment(todo._id, commentText.trim());
            setCommentText('');
        } catch {
            toast.error('Failed to add comment');
        } finally {
            setSubmittingComment(false);
        }
    };

    const handleDeleteTodo = async () => {
        try {
            await deleteTodo(todo._id);
            onOpenChange(false);
            toast.success('Task deleted');
        } catch {
            toast.error('Failed to delete task');
        }
    };

    const handleDeleteComment = async () => {
        if (!deleteCommentTarget) return;
        try {
            await deleteComment(todo._id, deleteCommentTarget._id);
            toast.success('Comment deleted');
        } catch {
            toast.error('Failed to delete comment');
        } finally {
            setDeleteCommentTarget(null);
        }
    };

    // Resolve label objects for display
    const draftLabelObjects = (todo.labels || []).filter(l =>
        draft.labels.includes(l._id || l)
    );
    const draftProjectObj = draft.project
        ? (projects || []).find(p => p._id === draft.project) || todo.project
        : null;

    return (
        <>
            <Drawer open={open} onOpenChange={onOpenChange} direction="right">
                <DrawerContent
                    className="!w-[480px] !max-w-[95vw] !rounded-l-2xl !rounded-r-none flex flex-col h-full overflow-hidden border-l shadow-2xl"
                    style={{ background: 'var(--background)' }}
                >
                    {/* ── Top Bar ── */}
                    <div
                        className="flex items-center justify-between px-5 py-3 border-b shrink-0"
                        style={{ borderColor: 'var(--border)' }}
                    >
                        <div className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>
                            {draftProjectObj ? <Folder className="w-4 h-4" /> : <Inbox className="w-4 h-4" />}
                            <span>{draftProjectObj?.name || 'Inbox'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-foreground">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-44">
                                    <DropdownMenuItem
                                        className="text-red-500 hover:text-red-600 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950/30 dark:focus:text-red-400 font-medium"
                                        onClick={() => setDeleteTodoAlertOpen(true)}
                                    >
                                        <Trash2 className="w-4 h-4 mr-2 text-red-500" />
                                        Delete task
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DrawerClose asChild>
                                <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-foreground">
                                    <X className="w-4 h-4" />
                                </Button>
                            </DrawerClose>
                        </div>
                    </div>

                    {/* ── Scrollable body ── */}
                    <div className="flex flex-1 overflow-hidden">
                        <div className="flex-1 overflow-y-auto py-6 px-6 space-y-6 pb-28">

                            {/* Title + checkbox */}
                            <div className="flex items-start gap-3">
                                <button
                                    onClick={() => toggleTodo(todo._id)}
                                    className="mt-1 shrink-0 focus:outline-none transition-transform hover:scale-110"
                                >
                                    {todo.completed ? (
                                        <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
                                    ) : (
                                        <Circle className="w-5 h-5" style={{ color: circleColor }} />
                                    )}
                                </button>
                                <div className="flex-1 min-w-0">
                                    <textarea
                                        className={cn(
                                            "w-full bg-transparent border-0 focus:ring-0 p-0 text-lg font-bold leading-snug placeholder:text-muted-foreground/40 resize-none outline-none",
                                            todo.completed && "line-through text-muted-foreground"
                                        )}
                                        rows={1}
                                        value={draft.title}
                                        onChange={e => {
                                            updateDraft('title', e.target.value);
                                            e.target.style.height = 'auto';
                                            e.target.style.height = e.target.scrollHeight + 'px';
                                        }}
                                        placeholder="Task name"
                                    />
                                    <textarea
                                        className="w-full bg-transparent border-0 focus:ring-0 p-0 text-sm resize-none outline-none mt-1 leading-relaxed placeholder:text-muted-foreground/40"
                                        style={{ color: 'var(--muted-foreground)' }}
                                        rows={2}
                                        value={draft.description}
                                        onChange={e => {
                                            updateDraft('description', e.target.value);
                                            e.target.style.height = 'auto';
                                            e.target.style.height = e.target.scrollHeight + 'px';
                                        }}
                                        placeholder="Add a description..."
                                    />
                                </div>
                            </div>

                            {/* ── Meta fields ── */}
                            <div
                                className="space-y-1 rounded-xl border p-3"
                                style={{ borderColor: 'var(--border)', background: 'var(--muted)/30' }}
                            >
                                {/* Due Date */}
                                <MetaRow label="Due date" icon={<CalendarIcon className="w-3.5 h-3.5 text-indigo-500" />}>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button className="text-sm hover:bg-muted px-2 py-0.5 rounded transition-colors text-left flex-1">
                                                {draft.dueDate
                                                    ? format(new Date(draft.dueDate), 'EEE, d MMM yyyy')
                                                    : <span className="text-muted-foreground">No date</span>}
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0 border-0 shadow-xl" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={draft.dueDate ? new Date(draft.dueDate) : undefined}
                                                onSelect={val => updateDraft('dueDate', val)}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </MetaRow>

                                {/* Priority */}
                                <MetaRow label="Priority" icon={<Flag className="w-3.5 h-3.5" style={{ color: currentPriority?.color || 'var(--muted-foreground)' }} />}>
                                    <Select value={draft.priority} onValueChange={v => updateDraft('priority', v)}>
                                        <SelectTrigger className="h-7 px-2 border-0 shadow-none bg-transparent hover:bg-muted focus:ring-0 text-sm font-medium flex-1 justify-start gap-2">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {PRIORITIES.map(p => (
                                                <SelectItem key={p.value} value={p.value}>
                                                    <div className="flex items-center gap-2">
                                                        <Flag className="w-3.5 h-3.5" style={{ color: p.color }} />
                                                        <span>{p.label}</span>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </MetaRow>

                                {/* Project */}
                                <MetaRow
                                    label="Project"
                                    icon={draftProjectObj
                                        ? <Folder className="w-3.5 h-3.5 text-muted-foreground" />
                                        : <Inbox className="w-3.5 h-3.5 text-muted-foreground" />}
                                >
                                    <Popover open={projectOpen} onOpenChange={setProjectOpen}>
                                        <PopoverTrigger asChild>
                                            <button className="text-sm hover:bg-muted px-2 py-0.5 rounded transition-colors text-left flex-1">
                                                {draftProjectObj?.name || <span className="text-muted-foreground">Inbox</span>}
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0" align="start">
                                            <Command>
                                                <CommandInput placeholder="Search project..." className="h-9" />
                                                <CommandList>
                                                    <CommandEmpty>No project found.</CommandEmpty>
                                                    <CommandGroup>
                                                        <CommandItem
                                                            onSelect={() => { updateDraft('project', null); setProjectOpen(false); }}
                                                            className="flex items-center gap-2"
                                                        >
                                                            <Inbox className="w-4 h-4" /> Inbox
                                                        </CommandItem>
                                                        {(projects || []).map(p => (
                                                            <CommandItem
                                                                key={p._id}
                                                                onSelect={() => { updateDraft('project', p._id); setProjectOpen(false); }}
                                                                className="flex items-center gap-2"
                                                            >
                                                                <Folder className="w-4 h-4" /> {p.name}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </MetaRow>

                                {/* Labels */}
                                <MetaRow
                                    label="Labels"
                                    icon={<Tag className="w-3.5 h-3.5 text-muted-foreground" />}
                                    action={
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <button className="text-muted-foreground hover:text-foreground transition-colors">
                                                    <Plus className="w-3.5 h-3.5" />
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-56 p-2" align="end">
                                                <div className="space-y-0.5">
                                                    {allLabels?.map(lbl => (
                                                        <button
                                                            key={lbl._id}
                                                            className="w-full text-left px-2 py-1.5 hover:bg-muted rounded text-sm flex items-center justify-between"
                                                            onClick={() => toggleLabelDraft(lbl._id)}
                                                        >
                                                            <span>#{lbl.name}</span>
                                                            {draft.labels.includes(lbl._id) && (
                                                                <Check className="w-3.5 h-3.5 text-primary" />
                                                            )}
                                                        </button>
                                                    ))}
                                                    {(!allLabels || allLabels.length === 0) && (
                                                        <p className="text-xs text-muted-foreground px-2 py-1">No labels yet</p>
                                                    )}
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    }
                                >
                                    <div className="flex flex-wrap gap-1.5 flex-1">
                                        {draftLabelObjects.length > 0 ? draftLabelObjects.map(lbl => (
                                            <span
                                                key={lbl._id}
                                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary cursor-pointer hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30 transition-colors"
                                                onClick={() => toggleLabelDraft(lbl._id)}
                                            >
                                                {lbl.name}
                                                <X className="w-2.5 h-2.5" />
                                            </span>
                                        )) : (
                                            <span className="text-sm text-muted-foreground px-2 py-0.5">None</span>
                                        )}
                                    </div>
                                </MetaRow>
                            </div>

                            {/* ── Comments ── */}
                            <div>
                                <button
                                    className="flex items-center gap-1.5 text-sm font-semibold mb-4 w-full text-left"
                                    style={{ color: 'var(--foreground)' }}
                                    onClick={() => setCommentsExpanded(v => !v)}
                                >
                                    <ChevronRight className={cn('w-4 h-4 transition-transform text-muted-foreground', commentsExpanded && 'rotate-90')} />
                                    <MessageCircle className="w-4 h-4 text-muted-foreground" />
                                    Comments
                                    <span className="ml-1 text-xs font-normal text-muted-foreground">
                                        {(todo.comments || []).length}
                                    </span>
                                </button>

                                {commentsExpanded && (
                                    <div className="space-y-5">
                                        {(todo.comments || []).map(comment => (
                                            <div key={comment._id} className="flex gap-3 group/comment">
                                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-xs shrink-0">
                                                    {comment.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-baseline gap-2 mb-0.5">
                                                        <span className="text-sm font-semibold">{comment.user?.name || 'User'}</span>
                                                        <span className="text-xs text-muted-foreground">
                                                            {format(new Date(comment.createdAt), 'MMM d, h:mm a')}
                                                        </span>
                                                        <button
                                                            className="ml-auto opacity-0 group-hover/comment:opacity-100 transition-opacity text-muted-foreground hover:text-red-500 shrink-0"
                                                            onClick={() => setDeleteCommentTarget(comment)}
                                                            title="Delete comment"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                    <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                                                        {comment.text}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Comment input */}
                                        <div className="flex gap-2.5 mt-4">
                                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shrink-0 mt-0.5">
                                                A
                                            </div>
                                            <div
                                                className="flex-1 flex items-center gap-2 border rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-primary/30 transition-shadow"
                                                style={{ borderColor: 'var(--border)' }}
                                            >
                                                <input
                                                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/50"
                                                    placeholder="Add a comment..."
                                                    value={commentText}
                                                    onChange={e => setCommentText(e.target.value)}
                                                    onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleComment()}
                                                />
                                                <button
                                                    onClick={handleComment}
                                                    disabled={!commentText.trim() || submittingComment}
                                                    className={cn(
                                                        "shrink-0 transition-colors",
                                                        commentText.trim() ? "text-primary hover:text-primary/80" : "text-muted-foreground/30"
                                                    )}
                                                >
                                                    <Send className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ── Sticky Save / Discard bar — only visible when dirty ── */}
                    <div
                        className={cn(
                            "absolute bottom-0 inset-x-0 px-6 py-4 border-t flex items-center justify-between gap-3 transition-all duration-300",
                            isDirty
                                ? "translate-y-0 opacity-100 pointer-events-auto"
                                : "translate-y-full opacity-0 pointer-events-none"
                        )}
                        style={{ background: 'var(--background)', borderColor: 'var(--border)' }}
                    >
                        <p className="text-xs text-muted-foreground font-medium">You have unsaved changes</p>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 gap-1.5 text-muted-foreground hover:text-foreground"
                                onClick={handleDiscard}
                            >
                                <RotateCcw className="w-3.5 h-3.5" />
                                Discard
                            </Button>
                            <Button
                                size="sm"
                                className="h-8 gap-1.5 bg-primary hover:bg-primary/90 text-white"
                                onClick={() => setSaveAlertOpen(true)}
                                disabled={saving}
                            >
                                <Save className="w-3.5 h-3.5" />
                                Save changes
                            </Button>
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>

            {/* ── Save Changes Confirmation ── */}
            <AlertDialog open={saveAlertOpen} onOpenChange={setSaveAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Save changes?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Your edits to <strong>"{todo.title}"</strong> will be saved to the server.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleSave} disabled={saving}>
                            {saving ? 'Saving…' : 'Save changes'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* ── Delete Todo Confirmation ── */}
            <AlertDialog open={deleteTodoAlertOpen} onOpenChange={setDeleteTodoAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete this task?</AlertDialogTitle>
                        <AlertDialogDescription>
                            <strong>"{todo.title}"</strong> will be permanently deleted. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700 text-white focus:ring-red-600"
                            onClick={handleDeleteTodo}
                        >
                            Delete task
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* ── Delete Comment Confirmation ── */}
            <AlertDialog
                open={!!deleteCommentTarget}
                onOpenChange={o => { if (!o) setDeleteCommentTarget(null); }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete this comment?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This comment will be permanently removed. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDeleteCommentTarget(null)}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700 text-white focus:ring-red-600"
                            onClick={handleDeleteComment}
                        >
                            Delete comment
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

/* ── Meta row helper ── */
const MetaRow = ({ label, icon, children, action }) => (
    <div className="flex items-center gap-3 py-1.5 px-1">
        <div className="w-24 shrink-0 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            {icon}
            {label}
        </div>
        <div className="flex-1 flex items-center min-w-0">
            {children}
        </div>
        {action && <div className="shrink-0">{action}</div>}
    </div>
);

export default TodoDetailDrawer;
