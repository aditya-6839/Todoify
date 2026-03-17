import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLabels } from '@/hooks/useLabels';
import { Tag, Flag, ChevronRight, Hash, Puzzle, Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import TodoListView from '@/components/app/TodoListView';
import toast from 'react-hot-toast';

const LABEL_COLORS = [
    '#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899', '#71717a'
];

const LabelForm = ({ onCreate }) => {
    const [name, setName] = useState('');
    const [color, setColor] = useState(LABEL_COLORS[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        try {
            await onCreate({ name, color });
            setName('');
            toast.success('Label created');
        } catch (err) {
            toast.error('Failed to create label');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground/50">New Label</h4>
            <input
                autoFocus
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Label name..."
                className="w-full bg-muted/50 border border-border/40 rounded-xl px-3 h-10 text-sm font-bold focus:border-primary/40 outline-none"
            />
            <div className="flex flex-wrap gap-2">
                {LABEL_COLORS.map(c => (
                    <button
                        key={c}
                        type="button"
                        onClick={() => setColor(c)}
                        className={`w-6 h-6 rounded-full border-2 transition-all ${color === c ? 'border-foreground scale-110 shadow-sm' : 'border-transparent opacity-60 hover:opacity-100'}`}
                        style={{ backgroundColor: c }}
                    />
                ))}
            </div>
            <Button type="submit" className="w-full h-10 rounded-xl font-black text-xs uppercase tracking-widest">Create Label</Button>
        </form>
    );
};

const FiltersPage = () => {
    const { labels, loading, createLabel } = useLabels();
    const [selectedType, setSelectedType] = useState('priority'); // 'priority' or 'label'
    const [selectedValue, setSelectedValue] = useState('high'); // e.g., 'high' or labelId

    if (loading) return <div>Loading filters...</div>;

    const priorities = [
        { value: 'high', label: 'High Priority', color: '#ef4444' },
        { value: 'medium', label: 'Medium Priority', color: '#f59e0b' },
        { value: 'low', label: 'Low Priority', color: '#10b981' },
    ];

    const filterFn = (todo) => {
        if (selectedType === 'priority') {
            return todo.priority === selectedValue;
        } else {
            return todo.labels?.some(l => l._id === selectedValue || l === selectedValue);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-10">
            {/* Sidebar for Filters */}
            <div className="w-full lg:w-72 shrink-0 space-y-10">
                <section>
                    <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 mb-6">Smart Filters</h3>
                    <div className="space-y-1">
                        {priorities.map(p => (
                            <button
                                key={p.value}
                                onClick={() => {
                                    setSelectedType('priority');
                                    setSelectedValue(p.value);
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${
                                    selectedType === 'priority' && selectedValue === p.value
                                        ? 'bg-primary/10 text-primary shadow-sm'
                                        : 'hover:bg-muted/50 text-muted-foreground'
                                }`}
                            >
                                <Flag className="w-4 h-4" style={{ color: p.color, fill: selectedType === 'priority' && selectedValue === p.value ? `${p.color}20` : 'transparent' }} />
                                {p.label}
                                {selectedType === 'priority' && selectedValue === p.value && <ChevronRight className="w-4 h-4 ml-auto opacity-50" />}
                            </button>
                        ))}
                    </div>
                </section>

                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">Labels</h3>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-primary/5 text-muted-foreground hover:text-primary">
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-64 p-4 rounded-2xl border-border/30 shadow-2xl" align="start">
                                <LabelForm onCreate={(data) => createLabel(data)} />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="space-y-1">
                        {labels?.map(lbl => (
                            <button
                                key={lbl._id}
                                onClick={() => {
                                    setSelectedType('label');
                                    setSelectedValue(lbl._id);
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${
                                    selectedType === 'label' && selectedValue === lbl._id
                                        ? 'bg-primary/10 text-primary shadow-sm'
                                        : 'hover:bg-muted/50 text-muted-foreground'
                                }`}
                            >
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: lbl.color }} />
                                #{lbl.name}
                                {selectedType === 'label' && selectedValue === lbl._id && <ChevronRight className="w-4 h-4 ml-auto opacity-50" />}
                            </button>
                        ))}
                        {labels.length === 0 && (
                            <p className="text-[11px] text-muted-foreground/40 font-bold px-4 italic">No labels created</p>
                        )}
                    </div>
                </section>
            </div>

            {/* Content Area */}
            <div className="flex-1 min-w-0">
                <TodoListView
                    title={
                        selectedType === 'priority' 
                            ? priorities.find(p => p.value === selectedValue)?.label 
                            : `#${labels?.find(l => l._id === selectedValue)?.name || 'Label'}`
                    }
                    filter={filterFn}
                    showAdd={false}
                />
            </div>
        </div>
    );
};

export default FiltersPage;
