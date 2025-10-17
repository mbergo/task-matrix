
import React, { useState, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { TaskMatrix } from './components/TaskMatrix';
import { AIAssistant } from './components/AIAssistant';
import { Task, Quadrant } from './types';
import { breakdownTask } from './services/geminiService';
import { BreakdownModal } from './components/BreakdownModal';
import { WelcomeScreen } from './components/WelcomeScreen';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Finish Q3 report', quadrant: Quadrant.UrgentImportant },
    { id: '2', title: 'Plan next year\'s strategy', quadrant: Quadrant.NotUrgentImportant },
    { id: '3', title: 'Reply to non-urgent emails', quadrant: Quadrant.UrgentNotImportant },
    { id: '4', title: 'Organize digital files', quadrant: Quadrant.NotUrgentNotImportant },
    { id: '5', title: 'Prepare for client meeting tomorrow', quadrant: Quadrant.UrgentImportant },
  ]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [breakdownResult, setBreakdownResult] = useState<{ task: Task; subtasks: string[] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAddTasks = useCallback((newTasks: Omit<Task, 'id'>[]) => {
    const tasksWithIds: Task[] = newTasks.map(task => ({
      ...task,
      id: `${Date.now()}-${Math.random()}`
    }));
    setTasks(prevTasks => [...prevTasks, ...tasksWithIds]);
  }, []);

  const handleDeleteTask = useCallback((taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  }, []);

  const handleBreakdownTask = useCallback(async (task: Task) => {
    setIsAiLoading(true);
    setError(null);
    try {
      const subtasks = await breakdownTask(task.title);
      setBreakdownResult({ task, subtasks });
    } catch (e) {
      console.error(e);
      setError('Failed to get suggestions from AI. Please try again.');
    } finally {
      setIsAiLoading(false);
    }
  }, []);

  const tasksByQuadrant = useMemo(() => {
    return tasks.reduce((acc, task) => {
      if (!acc[task.quadrant]) {
        acc[task.quadrant] = [];
      }
      acc[task.quadrant].push(task);
      return acc;
    }, {} as Record<Quadrant, Task[]>);
  }, [tasks]);

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <Header />
      <main className="p-4 md:p-8">
        <AIAssistant onAddTasks={handleAddTasks} setIsLoading={setIsAiLoading} setError={setError} />
        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative my-4 text-center">
            <strong>Error:</strong> {error}
          </div>
        )}
        {tasks.length > 0 ? (
          <TaskMatrix 
            tasksByQuadrant={tasksByQuadrant} 
            onDeleteTask={handleDeleteTask} 
            onBreakdownTask={handleBreakdownTask}
          />
        ) : (
          <WelcomeScreen />
        )}
        
        {isAiLoading && (
           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-lg text-blue-200">AI is thinking...</p>
            </div>
           </div>
        )}

        {breakdownResult && (
          <BreakdownModal 
            task={breakdownResult.task}
            subtasks={breakdownResult.subtasks}
            onClose={() => setBreakdownResult(null)}
          />
        )}
      </main>
    </div>
  );
};

export default App;
