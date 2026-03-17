import React from 'react';
import { CalendarRange } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAddTask } from '@/context/AddTaskContext';
import TodoListView from '@/components/app/TodoListView';

const EmptyUpcoming = () => {
    return (
        <div className="flex flex-col items-center justify-center pt-24 pb-16 px-4 text-center">
            <div className="w-20 h-20 rounded-2xl bg-muted/20 flex items-center justify-center mb-6">
                <CalendarRange className="w-10 h-10 text-muted-foreground/30" />
            </div>
            <h2 className="text-lg font-black text-foreground mb-2">Schedule is quiet</h2>
            <p className="text-sm text-muted-foreground max-w-[260px] leading-relaxed">
                Take this time to relax or get a head start on tomorrow's goals.
            </p>
        </div>
    );
};

const UpcomingPage = () => {
    const todayStr = new Date().toISOString().split('T')[0];

    return (
        <TodoListView 
            title="Upcoming" 
            filter={t => !t.completed && t.dueDate && t.dueDate > todayStr} 
            emptyState={EmptyUpcoming}
        />
    );
};

export default UpcomingPage;
