import React from 'react';
import { View as View3d, Grid2X2, ZoomIn, ZoomOut, RotateCcw, RotateCw, Square, RectangleHorizontal, Layout, Ruler, Palette } from 'lucide-react';

interface SidebarProps {
  activeView: '2d' | '3d';
  scale: number;
  rotation: number;
  roomShape: {
    type: 'square' | 'rectangle' | 'l-shape';
    width: number;
    length: number;
  } | null;
  colors: {
    floor: string;
    walls: string;
    grid: string;
  };
  onViewChange: (view: '2d' | '3d') => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRotateLeft: () => void;
  onRotateRight: () => void;
  onCreateRoom: (type: 'square' | 'rectangle' | 'l-shape') => void;
  onUpdateDimensions: (dimension: 'width' | 'length', value: number) => void;
  onUpdateColor: (element: 'floor' | 'walls' | 'grid', value: string) => void;
}

const colorSchemes = {
  modern: {
    floor: '#f1f5f9',
    walls: '#e2e8f0',
    grid: '#94a3b8'
  },
  warm: {
    floor: '#fef3c7',
    walls: '#fde68a',
    grid: '#d97706'
  },
  cool: {
    floor: '#e0f2fe',
    walls: '#bae6fd',
    grid: '#0284c7'
  },
  neutral: {
    floor: '#f3f4f6',
    walls: '#d1d5db',
    grid: '#6b7280'
  }
};

export function Sidebar({
  activeView,
  scale,
  rotation,
  roomShape,
  colors,
  onViewChange,
  onZoomIn,
  onZoomOut,
  onRotateLeft,
  onRotateRight,
  onCreateRoom,
  onUpdateDimensions,
  onUpdateColor
}: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      {/* View Toggle */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex space-x-2">
          <button 
            onClick={() => onViewChange('2d')}
            className={`flex-1 px-4 py-2 rounded-md flex items-center justify-center space-x-2 ${
              activeView === '2d' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Grid2X2 className="h-4 w-4" />
            <span>2D View</span>
          </button>
          <button 
            onClick={() => onViewChange('3d')}
            className={`flex-1 px-4 py-2 rounded-md flex items-center justify-center space-x-2 ${
              activeView === '3d' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <View3d className="h-4 w-4" />
            <span>3D View</span>
          </button>
        </div>
      </div>

      {/* Room Shapes */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Room Shapes</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onCreateRoom('square')}
            className="p-2 text-gray-700 hover:bg-gray-100 rounded-md"
            title="Square Room"
          >
            <Square className="h-4 w-4" />
          </button>
          <button
            onClick={() => onCreateRoom('rectangle')}
            className="p-2 text-gray-700 hover:bg-gray-100 rounded-md"
            title="Rectangle Room"
          >
            <RectangleHorizontal className="h-4 w-4" />
          </button>
          <button
            onClick={() => onCreateRoom('l-shape')}
            className="p-2 text-gray-700 hover:bg-gray-100 rounded-md"
            title="L-Shaped Room"
          >
            <Layout className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Dimensions */}
      {roomShape && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2 mb-2">
            <Ruler className="h-4 w-4 text-gray-500" />
            <h3 className="text-sm font-medium text-gray-700">Dimensions</h3>
          </div>
          <div className="space-y-2">
            {roomShape.type !== 'square' && (
              <div className="space-y-1">
                <label className="text-xs text-gray-600">Width</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="5"
                    max="20"
                    value={roomShape.width}
                    onChange={(e) => onUpdateDimensions('width', parseFloat(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-xs text-gray-600 w-8">{roomShape.width}m</span>
                </div>
              </div>
            )}
            <div className="space-y-1">
              <label className="text-xs text-gray-600">
                {roomShape.type === 'square' ? 'Size' : 'Length'}
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="5"
                  max="20"
                  value={roomShape.length}
                  onChange={(e) => onUpdateDimensions('length', parseFloat(e.target.value))}
                  className="flex-1"
                />
                <span className="text-xs text-gray-600 w-8">{roomShape.length}m</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Colors */}
      {roomShape && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2 mb-2">
            <Palette className="h-4 w-4 text-gray-500" />
            <h3 className="text-sm font-medium text-gray-700">Colors</h3>
          </div>
          <div className="space-y-4">
            {/* Color Schemes */}
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(colorSchemes).map(([name, scheme]) => (
                <button
                  key={name}
                  onClick={() => {
                    onUpdateColor('floor', scheme.floor);
                    onUpdateColor('walls', scheme.walls);
                    onUpdateColor('grid', scheme.grid);
                  }}
                  className="px-2 py-1 rounded-md text-xs hover:bg-gray-100"
                  style={{
                    backgroundColor: scheme.walls,
                    color: '#000'
                  }}
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </button>
              ))}
            </div>
            
            {/* Custom Colors */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs text-gray-600">Floor</label>
                <input
                  type="color"
                  value={colors.floor}
                  onChange={(e) => onUpdateColor('floor', e.target.value)}
                  className="w-6 h-6 rounded cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-xs text-gray-600">Walls</label>
                <input
                  type="color"
                  value={colors.walls}
                  onChange={(e) => onUpdateColor('walls', e.target.value)}
                  className="w-6 h-6 rounded cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-xs text-gray-600">Grid</label>
                <input
                  type="color"
                  value={colors.grid}
                  onChange={(e) => onUpdateColor('grid', e.target.value)}
                  className="w-6 h-6 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Controls */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-2">View Controls</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button 
              onClick={onZoomOut}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <span className="text-sm text-gray-600">{Math.round(scale * 100)}%</span>
            <button 
              onClick={onZoomIn}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={onRotateLeft}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button 
              onClick={onRotateRight}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <RotateCw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 