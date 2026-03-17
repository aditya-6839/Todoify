import React, { useState } from 'react';
import { format } from 'date-fns';
import {
    CalendarIcon, Flag, FolderKanban, Hash, Minus,
    Flame, Zap, AlertTriangle,
} from 'lucide-react';
import {
    Dialog, DialogContent, DialogHeader,
    DialogTitle, DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover, PopoverContent, PopoverTrigger,
} from '@/components/ui/popover';
import {
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { useAddTask } from '@/context/AddTaskContext';
import { useProjects } from '@/hooks/useProjects';
import { useLabels } from '@/hooks/useLabels';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

/* ── Priority options ─────────────────────────────── */
const PRIORITIES = [
    { value: 'high', label: 'High', color: '#ef4444' },
    { value: 'medium', label: 'Medium', color: '#f59e0b' },
    { value: 'low', label: 'Low', color: '#10b981' },
];

/* ── Chip button — uniform size ───────────────────── */
const Chip = ({ children, active, className, ...props }) => (
    <button
        type="button"
        className={cn(
            'inline-flex items-center gap-1.5 h-8 px-3 rounded-md border text-xs font-medium',
            'transition-colors duration-150 cursor-pointer select-none',
            'hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            active
                ? 'border-primary/40 bg-primary/5 text-foreground'
                : 'border-border bg-transparent text-muted-foreground',
            className,
        )}
        {...props}
    >
        {children}
    </button>
);

/* ── Today's date (no time) ───────────────────────── */
const today = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
};

const INITIAL_FORM = {
    title: '',
    description: '',
    priority: 'low',
    dueDate: undefined,   // Date object | undefined
    project: '',
    labels: [],           // array of label _ids
};

/* ──────────────────────────────────────────────────── */
const AddTaskDialog = () => {
    const { open, setOpen, createTodo } = useAddTask();
    const { projects } = useProjects();
    const { labels } = useLabels();

    const [form, setForm] = useState(INITIAL_FORM);
    const [submitting, setSubmitting] = useState(false);
    const [calOpen, setCalOpen] = useState(false);
    const [labelsOpen, setLabelsOpen] = useState(false);

    const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

    /* required = title must be non-empty */
    const canSubmit = form.title.trim().length > 0;

    /* ── Submit ── */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!canSubmit || submitting) return;

        try {
            setSubmitting(true);
            const payload = {
                title: form.title.trim(),
                ...(form.description.trim() && { description: form.description.trim() }),
                priority: form.priority,
                ...(form.dueDate && { dueDate: format(form.dueDate, 'yyyy-MM-dd') }),
                ...(form.project && { project: form.project }),
                ...(form.labels.length && { labels: form.labels }),
            };
            await createTodo(payload);
            toast.success('Task added!');
            setForm(INITIAL_FORM);
            setOpen(false);
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Failed to add task');
        } finally {
            setSubmitting(false);
        }
    };

    const handleOpenChange = (val) => {
        if (!val) setForm(INITIAL_FORM);
        setOpen(val);
    };

    /* ── Selected priority colour ── */
    const priorityColor = PRIORITIES.find(p => p.value === form.priority)?.color || '#f59e0b';

    /* ── Label toggle ── */
    const toggleLabel = (id) => {
        setForm(prev => ({
            ...prev,
            labels: prev.labels.includes(id)
                ? prev.labels.filter(l => l !== id)
                : [...prev.labels, id],
        }));
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent
                className="sm:max-w-xl p-0 gap-0 overflow-visible"
                style={{ fontFamily: 'var(--font-sans)' }}
                showCloseButton={false}
            >
                <form onSubmit={handleSubmit}>
                    {/* ── Title + description ── */}
                    <div className="px-5 pt-5 pb-3">
                        <DialogHeader className="mb-0">
                            <DialogTitle className="sr-only">Add task</DialogTitle>
                            <DialogDescription className="sr-only">Create a new task</DialogDescription>
                        </DialogHeader>

                        <Input
                            id="add-task-title"
                            placeholder="Task name"
                            autoFocus
                            value={form.title}
                            onChange={e => set('title', e.target.value)}
                            className="border-0 shadow-none px-0 text-[0.95rem] font-semibold h-auto py-1
                                placeholder:text-muted-foreground/50
                                focus-visible:ring-0 focus-visible:border-0"
                        />
                        <Input
                            id="add-task-description"
                            placeholder="Description"
                            value={form.description}
                            onChange={e => set('description', e.target.value)}
                            className="border-0 shadow-none px-0 text-sm h-auto py-1 mt-0.5
                                placeholder:text-muted-foreground/35
                                focus-visible:ring-0 focus-visible:border-0"
                        />
                    </div>

                    {/* ── Chips row ── */}
                    <div className="flex flex-wrap items-center gap-2 px-5 pb-4">

                        {/* ── Due date — shadcn Calendar in Popover ── */}
                        <Popover open={calOpen} onOpenChange={setCalOpen}>
                            <PopoverTrigger asChild>
                                <Chip active={!!form.dueDate}>
                                    <CalendarIcon className="w-3.5 h-3.5" />
                                    {form.dueDate
                                        ? format(form.dueDate, 'MMM d')
                                        : 'Date'}
                                </Chip>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start" side="bottom">
                                <Calendar
                                    mode="single"
                                    selected={form.dueDate}
                                    onSelect={(d) => {
                                        set('dueDate', d);
                                        setCalOpen(false);
                                    }}
                                    disabled={{ before: today() }}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>

                        {/* ── Priority — coloured flag icon only ── */}
                        <Select value={form.priority} onValueChange={v => set('priority', v)}>
                            <SelectTrigger
                                className="h-8 px-3 rounded-md border text-xs font-medium gap-1.5 shadow-none w-auto"
                                style={{ borderColor: 'var(--border)', color: priorityColor }}
                            >
                                {/* flag icon explicitly rendered */}
                                <Flag
                                    className="w-3.5 h-3.5 shrink-0"
                                    style={{ color: priorityColor, fill: `${priorityColor}30` }}
                                />
                                {/* Radix needs SelectValue, but we hide its text visually so only the flag appears */}
                                <span className="sr-only">
                                    <SelectValue />
                                </span>
                            </SelectTrigger>
                            <SelectContent>
                                {PRIORITIES.map(p => (
                                    <SelectItem key={p.value} value={p.value}>
                                        <div className="flex items-center gap-2">
                                            <Flag
                                                className="w-3.5 h-3.5"
                                                style={{ color: p.color, fill: `${p.color}30` }}
                                            />
                                            <span>{p.label}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* ── Project ── */}
                        <Select
                            value={form.project || 'none'}
                            onValueChange={v => set('project', v === 'none' ? '' : v)}
                        >
                            <SelectTrigger
                                className="h-8 px-3 rounded-md border text-xs font-medium gap-1.5 shadow-none w-auto"
                                style={{
                                    borderColor: 'var(--border)',
                                    color: form.project ? 'var(--foreground)' : 'var(--muted-foreground)',
                                }}
                            >
                                <FolderKanban className="w-3.5 h-3.5 shrink-0" />
                                <SelectValue placeholder="Project" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">
                                    <div className="flex items-center gap-2">
                                        <Minus className="w-3.5 h-3.5 text-muted-foreground" />
                                        <span>No project</span>
                                    </div>
                                </SelectItem>
                                {(projects || []).map(p => (
                                    <SelectItem key={p._id} value={p._id}>
                                        {p.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* ── Labels — popover multi-select ── */}
                        <Popover open={labelsOpen} onOpenChange={setLabelsOpen}>
                            <PopoverTrigger asChild>
                                <Chip active={form.labels.length > 0}>
                                    <Hash className="w-3.5 h-3.5" />
                                    {form.labels.length > 0
                                        ? `${form.labels.length} label${form.labels.length > 1 ? 's' : ''}`
                                        : 'Labels'}
                                </Chip>
                            </PopoverTrigger>
                            <PopoverContent className="w-52 p-2" align="start" side="bottom">
                                {(!labels || labels.length === 0) ? (
                                    <p className="text-xs text-muted-foreground text-center py-2">
                                        No labels yet
                                    </p>
                                ) : (
                                    <div className="space-y-0.5">
                                        {labels.map(lbl => {
                                            const checked = form.labels.includes(lbl._id);
                                            return (
                                                <button
                                                    key={lbl._id}
                                                    type="button"
                                                    onClick={() => toggleLabel(lbl._id)}
                                                    className={cn(
                                                        'w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs transition-colors',
                                                        'hover:bg-accent text-left',
                                                        checked && 'bg-accent/60',
                                                    )}
                                                >
                                                    {/* Colored dot */}
                                                    <span
                                                        className="w-2 h-2 rounded-full shrink-0"
                                                        style={{ backgroundColor: lbl.color || 'var(--primary)' }}
                                                    />
                                                    <span className="font-medium text-foreground">
                                                        #{lbl.name}
                                                    </span>
                                                    {checked && (
                                                        <span className="ml-auto text-primary text-[10px] font-bold">✓</span>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </PopoverContent>
                        </Popover>

                        {/* ── Selected label pills — inline in the chips row ── */}
                        {form.labels.map(id => {
                            const lbl = labels?.find(l => l._id === id);
                            if (!lbl) return null;
                            return (
                                <span
                                    key={id}
                                    className="inline-flex items-center gap-1 h-8 px-3 rounded-md text-xs font-medium cursor-default"
                                    style={{
                                        backgroundColor: `${lbl.color || '#6366f1'}18`,
                                        color: lbl.color || '#6366f1',
                                        border: `1px solid ${lbl.color || '#6366f1'}40`,
                                    }}
                                >
                                    #{lbl.name}
                                </span>
                            );
                        })}
                    </div>

                    {/* ── Footer ── */}
                    <div
                        className="flex items-center justify-end gap-2 px-5 py-3"
                        style={{ borderTop: '1px solid var(--border)', backgroundColor: 'var(--muted)' }}
                    >
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="text-xs font-semibold h-8 px-4"
                            onClick={() => handleOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            size="sm"
                            className="text-xs font-semibold h-8 px-4"
                            disabled={!canSubmit || submitting}
                        >
                            {submitting ? 'Adding…' : 'Add task'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddTaskDialog;
