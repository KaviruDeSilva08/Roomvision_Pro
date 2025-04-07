import React, { useState } from 'react';
import { Save, Square, RectangleHorizontal, Layout, Ruler, Palette, Check } from 'lucide-react';

interface ToolPanelProps {
  onSave: (design: any) => void;
  currentDesign: {
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
  };
}

export function ToolPanel({ onSave, currentDesign }: ToolPanelProps) {
  const [showDimensions, setShowDimensions] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    if (currentDesign) {
      setIsSaving(true);
      
      // Simulate save operation
      setTimeout(() => {
        const designToSave = {
          ...currentDesign,
          timestamp: new Date().toISOString(),
          name: `Design ${new Date().toLocaleTimeString()}`
        };
        onSave(designToSave);
        setIsSaving(false);
        setSaveSuccess(true);
        
        // Reset success message after 2 seconds
        setTimeout(() => setSaveSuccess(false), 2000);
      }, 500);
    }
  };

  return (
    <div className="w-12 bg-white border-r border-gray-200 flex flex-col items-center py-2">
      {/* Save Button with Status */}
      <div className="relative mb-2">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`p-1.5 rounded-md transition-colors ${
            isSaving 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : saveSuccess
                ? 'bg-green-100 text-green-600'
                : 'text-gray-700 hover:bg-gray-100'
          }`}
          title={isSaving ? "Saving..." : saveSuccess ? "Saved!" : "Save Design"}
        >
          {isSaving ? (
            <div className="animate-spin">
              <Save className="h-5 w-5" />
            </div>
          ) : saveSuccess ? (
            <Check className="h-5 w-5" />
          ) : (
            <Save className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Room Shape Buttons */}
      <div className="space-y-1">
        <button
          className="p-1.5 text-gray-700 hover:bg-gray-100 rounded-md"
          title="Square Room"
        >
          <Square className="h-5 w-5" />
        </button>
        <button
          className="p-1.5 text-gray-700 hover:bg-gray-100 rounded-md"
          title="Rectangle Room"
        >
          <RectangleHorizontal className="h-5 w-5" />
        </button>
        <button
          className="p-1.5 text-gray-700 hover:bg-gray-100 rounded-md"
          title="L-Shaped Room"
        >
          <Layout className="h-5 w-5" />
        </button>
      </div>

      {/* Dimension Controls */}
      <button
        onClick={() => setShowDimensions(!showDimensions)}
        className={`p-1.5 mt-2 rounded-md ${
          showDimensions ? 'bg-indigo-100 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'
        }`}
        title="Dimensions"
      >
        <Ruler className="h-5 w-5" />
      </button>

      {/* Color Controls */}
      <button
        onClick={() => setShowColors(!showColors)}
        className={`p-1.5 mt-2 rounded-md ${
          showColors ? 'bg-indigo-100 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'
        }`}
        title="Colors"
      >
        <Palette className="h-5 w-5" />
      </button>
    </div>
  );
}