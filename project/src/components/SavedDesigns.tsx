import React, { useState } from 'react';
import { Clock, Trash2, Edit2, Eye } from 'lucide-react';

interface SavedDesign {
  name: string;
  timestamp: string;
  shape: {
    type: string;
    width: number;
    length: number;
  };
  colors: {
    floor: string;
    walls: string;
    grid: string;
  };
}

interface SavedDesignsProps {
  designs: SavedDesign[];
  onDelete: (index: number) => void;
  onLoad: (design: SavedDesign) => void;
  onEdit: (design: SavedDesign) => void;
}

export function SavedDesigns({ designs, onDelete, onLoad, onEdit }: SavedDesignsProps) {
  const [selectedDesign, setSelectedDesign] = useState<number | null>(null);

  const handleDesignClick = (index: number) => {
    setSelectedDesign(index);
  };

  const handlePreview = (design: SavedDesign) => {
    onLoad(design);
  };

  const handleEdit = (design: SavedDesign) => {
    onEdit(design);
  };

  return (
    <div className="w-64 bg-white border-l border-gray-200 p-3">
      <h2 className="text-base font-semibold text-gray-900 mb-3">Saved Designs</h2>
      
      {designs.length === 0 ? (
        <p className="text-gray-500 text-center py-3">No saved designs yet</p>
      ) : (
        <div className="space-y-2">
          {designs.map((design, index) => (
            <div
              key={design.timestamp}
              className={`p-2 border rounded transition-all ${
                selectedDesign === index
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-300'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-sm font-medium text-gray-900 truncate max-w-[120px]">{design.name}</h3>
                <div className="flex space-x-1">
                  <button
                    onClick={() => handlePreview(design)}
                    className="text-gray-400 hover:text-indigo-500"
                    title="Preview Design"
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleEdit(design)}
                    className="text-gray-400 hover:text-indigo-500"
                    title="Edit Design"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => onDelete(index)}
                    className="text-gray-400 hover:text-red-500"
                    title="Delete Design"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center text-xs text-gray-500 mb-1">
                <Clock className="h-3 w-3 mr-1" />
                <span>{new Date(design.timestamp).toLocaleTimeString()}</span>
              </div>
              
              <div className="flex space-x-1 mb-1">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: design.colors.floor }}
                  title="Floor Color"
                />
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: design.colors.walls }}
                  title="Walls Color"
                />
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: design.colors.grid }}
                  title="Grid Color"
                />
              </div>
              
              <div className="text-xs text-gray-500">
                <div className="truncate">
                  <span className="font-medium">Type:</span> {design.shape.type}
                </div>
                <div className="truncate">
                  <span className="font-medium">Size:</span> {design.shape.width}m x {design.shape.length}m
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}