import React, { useState } from 'react';
import {
    Calendar, Folder, Circle, CheckCircle2,
    MessageSquare, Tag, MoreHorizontal,
    Trash2
} from 'lucide-react';
import { useAddTask } from '@/context/AddTaskContext';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
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
import { cn } from '@/lib/utils';
import TodoDetailDrawer from './TodoDetailDrawer';

/* ── Format due date ── */
const formatDue = (dateStr) => {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
    const target = new Date(d.getFullYear(), d.getMonth(), d.getDate());

    if (target.getTime() === today.getTime()) return 'Today';
    if (target.getTime() === tomorrow.getTime()) return 'Tomorrow';
    if (target < today) return 'Overdue';
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const isOverdue = (dateStr) => {
    if (!dateStr) return false;
    return new Date(dateStr) < new Date();
};

export const TodoItem = ({ todo }) => {
    const { toggleTodo, deleteTodo } = useAddTask();
    const [hovering, setHovering] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);

    const dueLabel = formatDue(todo.dueDate);
    const overdue = isOverdue(todo.dueDate) && !todo.completed;
    const projectName = todo.project?.name;

    const priorityColors = {
        high: '#ef4444',
        medium: '#f59e0b',
        low: '#10b981',
    };
    const circleColor = priorityColors[todo.priority] || 'var(--primary)';

    const handleDelete = async () => {
        await deleteTodo(todo._id);
        setDeleteAlertOpen(false);
    };

    return (
        <>
            <div
                className="group flex items-start gap-2 px-1 py-2.5 relative cursor-pointer hover:bg-muted/30 rounded-md transition-colors"
                style={{ borderBottom: '1px solid var(--border)' }}
                onClick={() => setDrawerOpen(true)}
            >
                {/* Checkbox */}
                <button
                    onClick={(e) => { e.stopPropagation(); toggleTodo(todo._id); }}
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                    className="mt-0.5 shrink-0 focus-visible:outline-none"
                    aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
                >
                    {todo.completed || hovering ? (
                        <CheckCircle2
                            className="w-5 h-5 transition-colors"
                            style={{ color: todo.completed ? 'var(--muted-foreground)' : circleColor }}
                        />
                    ) : (
                        <Circle className="w-5 h-5 transition-colors" style={{ color: circleColor }} />
                    )}
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0 flex flex-col gap-0.5 ml-1">
                    <span
                        className={cn(
                            "text-sm tracking-tight leading-snug",
                            todo.completed
                                ? "text-muted-foreground line-through font-normal"
                                : "text-foreground font-semibold"
                        )}
                    >
                        {todo.title}
                    </span>

                    {todo.description && (
                        <span className="text-xs text-muted-foreground line-clamp-1 leading-relaxed">
                            {todo.description}
                        </span>
                    )}

                    {/* Tags row */}
                    <div className="flex flex-wrap items-center gap-3 mt-1 text-[0.7rem] font-bold">
                        {dueLabel && (
                            <span className="flex items-center gap-1" style={{ color: overdue ? '#d1453b' : '#6366f1' }}>
                                <Calendar className="w-3 h-3" />
                                {dueLabel}
                            </span>
                        )}
                        {todo.comments && todo.comments.length > 0 && (
                            <span className="flex items-center gap-1 text-muted-foreground">
                                <MessageSquare className="w-3 h-3" />
                                {todo.comments.length}
                            </span>
                        )}
                        {todo.labels && todo.labels.map(lbl => (
                            <span key={lbl._id} className="flex items-center gap-1 text-muted-foreground">
                                <Tag className="w-3 h-3" />
                                #{lbl.name}
                            </span>
                        ))}
                        {projectName && (
                            <span className="flex items-center gap-1 text-muted-foreground ml-auto bg-muted/30 px-1.5 py-0.5 rounded">
                                <Folder className="w-3 h-3" />
                                {projectName}
                            </span>
                        )}
                    </div>
                </div>

                {/* Hover Actions — no border/bg, just the icon */}
                <div className="absolute right-2 top-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="icon" className="w-7 h-7 text-muted-foreground hover:text-foreground">
                                <MoreHorizontal className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40 shadow-xl border-border/50">
                            <DropdownMenuItem
                                className="text-red-500 hover:text-red-600 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950/30 dark:focus:text-red-400 font-medium"
                                onClick={(e) => { e.stopPropagation(); setDeleteAlertOpen(true); }}
                            >
                                <Trash2 className="w-4 h-4 mr-2 text-red-500" />
                                Delete todo
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Detail drawer */}
            <TodoDetailDrawer
                todo={todo}
                open={drawerOpen}
                onOpenChange={setDrawerOpen}
            />

            {/* Delete confirmation */}
            <AlertDialog open={deleteAlertOpen} onOpenChange={setDeleteAlertOpen}>
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
                            onClick={handleDelete}
                        >
                            Delete task
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};
