import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingPage() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="relative w-32 h-32 mx-auto">
            {/* Outer circle */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg" />
            
            {/* Inner circle */}
            <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center">
              <span className="text-2xl font-bold text-indigo-600">RV</span>
            </div>
          </div>
        </div>

        {/* Loading text */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">RoomVision Pro</h1>
        <p className="text-gray-500 mb-8">Loading your design environment...</p>

        {/* Loading animation */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
} 