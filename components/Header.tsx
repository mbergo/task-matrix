
import React from 'react';
import { LogoIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/70 backdrop-blur-md sticky top-0 z-10 border-b border-gray-700">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LogoIcon className="w-8 h-8 text-blue-400" />
          <h1 className="text-2xl font-bold tracking-tight text-gray-100">
            Momentum
          </h1>
        </div>
        <p className="text-sm text-gray-400 hidden md:block">AI-Powered Task Matrix</p>
      </div>
    </header>
  );
};
