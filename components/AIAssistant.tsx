
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { MicIcon, WandIcon } from './icons';
import { parseTasksFromText } from '../services/geminiService';
import { Task } from '../types';

interface AIAssistantProps {
  onAddTasks: (tasks: Omit<Task, 'id'>[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ onAddTasks, setIsLoading, setError }) => {
  const [inputText, setInputText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleProcessText = useCallback(async () => {
    if (inputText.trim() === '') return;

    setIsLoading(true);
    setError(null);
    try {
      const newTasks = await parseTasksFromText(inputText);
      if (newTasks.length > 0) {
        onAddTasks(newTasks);
        setInputText('');
      } else {
        setError("AI couldn't identify any tasks. Try phrasing it differently, e.g., 'I need to finish the report, it's urgent and important'.");
      }
    } catch (e) {
      setError((e as Error).message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [inputText, onAddTasks, setIsLoading, setError]);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleProcessText();
    }
  };
  
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [inputText]);

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 mb-8 shadow-lg">
      <div className="relative">
        <MicIcon className="absolute left-4 top-4 w-6 h-6 text-gray-400" />
        <textarea
          ref={textareaRef}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="I need to call the bank, which is urgent but not important, and also start the marketing strategy, which is important but not urgent and due next Friday..."
          className="w-full bg-transparent border-0 rounded-lg pl-14 pr-32 py-3 text-lg text-gray-200 placeholder-gray-500 focus:ring-0 resize-none overflow-y-hidden"
          rows={1}
        />
        <button
          onClick={handleProcessText}
          disabled={!inputText.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
        >
          <WandIcon className="w-5 h-5" />
          <span>Process</span>
        </button>
      </div>
    </div>
  );
};
