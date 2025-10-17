
import React from 'react';
import { Task } from '../types';
import { TrashIcon, BulbIcon } from './icons';

interface TaskCardProps {
  task: Task;
  borderColor: string;
  onDelete: () => void;
  onBreakdown: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, borderColor, onDelete, onBreakdown }) => {
  return (
    <div className="group bg-gray-800/60 p-3 rounded-lg flex items-center justify-between transition-all duration-200 hover:bg-gray-700/80 shadow-sm border border-transparent hover:border-gray-600">
      <p className="text-gray-200">{task.title}</p>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={onBreakdown}
          title="Breakdown with AI"
          className="p-2 rounded-md hover:bg-blue-900/50 text-blue-400 hover:text-blue-300 transition-colors"
        >
          <BulbIcon className="w-5 h-5" />
        </button>
        <button
          onClick={onDelete}
          title="Delete Task"
          className="p-2 rounded-md hover:bg-red-900/50 text-red-400 hover:text-red-300 transition-colors"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
