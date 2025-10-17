
import React from 'react';
import { QuadrantColumn } from './QuadrantColumn';
import { Quadrant, Task } from '../types';

interface TaskMatrixProps {
    tasksByQuadrant: Record<Quadrant, Task[]>;
    onDeleteTask: (taskId: string) => void;
    onBreakdownTask: (task: Task) => void;
}

export const TaskMatrix: React.FC<TaskMatrixProps> = ({ tasksByQuadrant, onDeleteTask, onBreakdownTask }) => {
    const quadrantOrder: Quadrant[] = [
        Quadrant.UrgentImportant,
        Quadrant.NotUrgentImportant,
        Quadrant.UrgentNotImportant,
        Quadrant.NotUrgentNotImportant,
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {quadrantOrder.map(quadrant => (
                <QuadrantColumn
                    key={quadrant}
                    quadrant={quadrant}
                    tasks={tasksByQuadrant[quadrant] || []}
                    onDeleteTask={onDeleteTask}
                    onBreakdownTask={onBreakdownTask}
                />
            ))}
        </div>
    );
};
