import React from 'react';
import { LayoutGrid, User2, Settings } from 'lucide-react';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-3">
            <LayoutGrid className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-semibold text-gray-900">RoomVision Pro</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Settings className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <User2 className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {children}
    </div>
  );
}