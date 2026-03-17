import React from 'react';
import { CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAddTask } from '@/context/AddTaskContext';
import TodoListView from '@/components/app/TodoListView';

const EmptyToday = () => {
    const { setOpen } = useAddTask();
    return (
        <div className="flex flex-col items-center justify-center pt-24 pb-16 px-4 text-center">
            <div className="w-20 h-20 rounded-2xl bg-primary/5 flex items-center justify-center mb-6">
                <CalendarDays className="w-10 h-10 text-primary/40" />
            </div>
            <h2 className="text-lg font-black text-foreground mb-2">No tasks for today</h2>
            <p className="text-sm text-muted-foreground max-w-[260px] leading-relaxed mb-8">
                Enjoy your clear schedule or plan ahead by adding a new task.
            </p>
            <Button
                onClick={() => setOpen(true)}
                variant="outline"
                className="rounded-xl font-bold h-10 px-6 border-primary/20 hover:bg-primary/5"
            >
                Plan your day
            </Button>
        </div>
    );
};

const TodayPage = () => {
    const todayStr = new Date().toISOString().split('T')[0];

    return (
        <TodoListView 
            title="Today" 
            filter={t => !t.completed && t.dueDate?.startsWith(todayStr)} 
            emptyState={EmptyToday}
        />
    );
};

export default TodayPage;
