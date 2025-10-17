
import React from 'react';
import { Task } from '../types';
import { CloseIcon, BulbIcon } from './icons';

interface BreakdownModalProps {
  task: Task;
  subtasks: string[];
  onClose: () => void;
}

export const BreakdownModal: React.FC<BreakdownModalProps> = ({ task, subtasks, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-40 p-4" onClick={onClose}>
      <div 
        className="bg-gray-800 border border-blue-700 rounded-xl w-full max-w-2xl shadow-2xl shadow-blue-900/20 transform transition-all"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-blue-300">AI Task Breakdown</h2>
            <p className="text-gray-400 mt-1">Suggested steps for: <span className="font-semibold text-gray-200">{task.title}</span></p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-700 transition-colors">
            <CloseIcon className="w-6 h-6 text-gray-400" />
          </button>
        </div>
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {subtasks.length > 0 ? (
            <ul className="space-y-3">
              {subtasks.map((subtask, index) => (
                <li key={index} className="flex items-start gap-3 bg-gray-900/50 p-3 rounded-lg">
                  <BulbIcon className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">{subtask}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-center py-8">The AI couldn't generate subtasks for this item.</p>
          )}
        </div>
        <div className="p-4 bg-gray-800/50 border-t border-gray-700 text-right rounded-b-xl">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
