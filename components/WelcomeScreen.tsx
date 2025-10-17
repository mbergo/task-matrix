
import React from 'react';
import { MicIcon } from './icons';

export const WelcomeScreen: React.FC = () => {
    return (
        <div className="text-center py-20 px-4">
            <div className="inline-block p-6 bg-gray-800 border border-gray-700 rounded-full mb-6">
                <MicIcon className="w-12 h-12 text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-100 mb-2">Welcome to Momentum</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Your AI-powered task matrix is ready. Use the input bar above to add your first tasks using natural language.
                The AI will automatically sort them for you.
            </p>
        </div>
    );
};
