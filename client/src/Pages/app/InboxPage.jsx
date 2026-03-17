import React from 'react';
import { Inbox } from 'lucide-react';
import { useAddTask } from '@/context/AddTaskContext';
import { Button } from '@/components/ui/button';
import TodoListView from '@/components/app/TodoListView';

/* ── Empty state ─────────────────────────────────── */
const EmptyInbox = () => {
    const { setOpen } = useAddTask();

    return (
        <div className="flex flex-col items-center justify-center pt-24 pb-16 px-4 text-center">
            <div className="relative mb-6">
                <div
                    className="w-24 h-24 rounded-3xl flex items-center justify-center transform rotate-6 scale-110 shadow-2xl shadow-yellow-500/20"
                    style={{
                        background: 'linear-gradient(135deg, rgba(232, 163, 23, 0.15), rgba(232, 163, 23, 0.05))',
                    }}
                >
                    <Inbox className="w-12 h-12" style={{ color: '#e8a317' }} />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-yellow-400 animate-ping opacity-75" />
            </div>

            <h2 className="text-xl font-black mb-2 tracking-tight text-foreground">
                All clear in Inbox
            </h2>
            <p className="text-sm text-muted-foreground max-w-[280px] mb-8 leading-relaxed font-medium">
                Your thoughts are captured, your mind is at ease. Add something new when you're ready.
            </p>

            <Button
                onClick={() => setOpen(true)}
                className="gap-2 rounded-xl font-black text-[13px] h-11 px-6 bg-[#d1453b] hover:bg-[#b83126] text-white shadow-lg shadow-red-500/10"
            >
                Add task
            </Button>
        </div>
    );
};

const InboxPage = () => {
    return (
        <TodoListView 
            title="Inbox" 
            filter={t => !t.completed} 
            emptyState={EmptyInbox}
        />
    );
};

export default InboxPage;
