import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAddTask } from '@/context/AddTaskContext';
import TodoListView from '@/components/app/TodoListView';

const EmptyCompleted = () => (
    <div className="flex flex-col items-center justify-center pt-24 pb-16 px-4 text-center">
        <div className="w-20 h-20 rounded-2xl bg-muted/30 flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-muted-foreground/30" />
        </div>
        <h2 className="text-lg font-black text-foreground mb-2">No completed tasks yet</h2>
        <p className="text-sm text-muted-foreground max-w-[260px] leading-relaxed">
            Finish some tasks and they will appear here. Keep up the momentum!
        </p>
    </div>
);

const CompletedPage = () => {
    return (
        <TodoListView 
            title="Completed" 
            filter={t => t.completed} 
            showAdd={false}
            emptyState={EmptyCompleted}
        />
    );
};

export default CompletedPage;
