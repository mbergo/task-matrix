
import React from 'react';
import { TaskCard } from './TaskCard';
import { Quadrant, Task } from '../types';
import { QUADRANT_DETAILS } from '../constants';

interface QuadrantColumnProps {
    quadrant: Quadrant;
    tasks: Task[];
    onDeleteTask: (taskId: string) => void;
    onBreakdownTask: (task: Task) => void;
}

export const QuadrantColumn: React.FC<QuadrantColumnProps> = ({ quadrant, tasks, onDeleteTask, onBreakdownTask }) => {
    const details = QUADRANT_DETAILS[quadrant];

    return (
        <div className={`rounded-xl p-4 ${details.color} border ${details.borderColor} h-full min-h-[250px]`}>
            <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 text-sm font-bold rounded-full ${details.textColor} ${details.color.replace('/20', '/50')}`}>{details.description}</span>
                <h2 className={`text-lg font-semibold ${details.textColor}`}>{details.title}</h2>
            </div>
            <div className="space-y-3">
                {tasks.length > 0 ? (
                    tasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onDelete={() => onDeleteTask(task.id)}
                            onBreakdown={() => onBreakdownTask(task)}
                            borderColor={details.borderColor}
                        />
                    ))
                ) : (
                    <div className="text-center py-10 text-gray-500">
                        <p>No tasks here.</p>
                        <p className="text-sm">Good job!</p>
                    </div>
                )}
            </div>
        </div>
    );
};
