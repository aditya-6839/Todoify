import React from 'react';

import { Plus, CheckCircle2 } from 'lucide-react';
import { useAddTask } from '@/context/AddTaskContext';
import { cn } from '@/lib/utils';
import { TodoItem } from './TodoItem'; // We should extract TodoItem from InboxPage

const TodoListView = ({ title, filter, showAdd = true, emptyState: EmptyState, hideTitle = false }) => {

    const { todos, todosLoading, setOpen } = useAddTask();

    const filteredTodos = (todos || []).filter(filter || (() => true));
    const hasTodos = filteredTodos.length > 0;

    return (
        <div className="max-w-4xl mx-auto w-full" style={{ fontFamily: 'var(--font-sans)' }}>
            {!hideTitle && (
                <h1 className="text-xl font-black tracking-tight" style={{ color: 'var(--foreground)', fontFamily: 'var(--font-serif)' }}>
                    {title}
                </h1>
            )}

            {showAdd && (
                <button
                    onClick={() => setOpen(true)}
                    className="group flex items-center gap-2 w-full px-1 py-3 text-sm transition-colors"
                    style={{ color: 'var(--primary)' }}
                >
                    <Plus className="w-4 h-4 rounded-full" />
                    <span className="font-semibold">Add task</span>
                </button>
            )}

            {todosLoading ? (
                <div className="space-y-4 mt-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-12 w-full animate-pulse bg-muted rounded-lg" />
                    ))}
                </div>
            ) : !hasTodos && EmptyState ? (
                <EmptyState />
            ) : (
                <div className="mt-2">
                    {filteredTodos.map(todo => (
                        <TodoItem
                            key={todo._id}
                            todo={todo}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TodoListView;
