import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { RoomDesigner } from './components/RoomDesigner';
import { ToolPanel } from './components/ToolPanel';
import { SavedDesigns } from './components/SavedDesigns';
import { LoadingPage } from './components/LoadingPage';

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

function App() {
  const [activeView, setActiveView] = useState<'2d' | '3d'>('2d');
  const [isLoading, setIsLoading] = useState(true);
  const [savedDesigns, setSavedDesigns] = useState<SavedDesign[]>([]);
  const [currentDesign, setCurrentDesign] = useState<SavedDesign | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSave = (design: SavedDesign) => {
    if (isEditing) {
      // Update existing design
      setSavedDesigns(prev => 
        prev.map(d => d.timestamp === design.timestamp ? design : d)
      );
      setIsEditing(false);
    } else {
      // Save new design
      setSavedDesigns(prev => [...prev, design]);
    }
    setCurrentDesign(design);
  };

  const handleDelete = (index: number) => {
    setSavedDesigns(prev => prev.filter((_, i) => i !== index));
    if (currentDesign && savedDesigns[index].timestamp === currentDesign.timestamp) {
      setCurrentDesign(null);
    }
  };

  const handleLoad = (design: SavedDesign) => {
    setCurrentDesign(design);
    setIsEditing(false);
  };

  const handleEdit = (design: SavedDesign) => {
    setCurrentDesign(design);
    setIsEditing(true);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <Layout>
      <div className="flex h-screen bg-gray-50">
        {/* Main Content - Room Designer */}
        <main className="flex-1 overflow-hidden">
          <div className="h-full flex">
            {/* Tools Panel */}
            <ToolPanel 
              onSave={handleSave} 
              currentDesign={currentDesign || {
                shape: { type: 'square', width: 10, length: 10 },
                colors: { floor: '#f1f5f9', walls: '#e2e8f0', grid: '#94a3b8' }
              }}
            />
            
            {/* Room Designer */}
            <div className="flex-1">
              <RoomDesigner 
                activeView={activeView} 
                initialDesign={currentDesign}
                isEditing={isEditing}
              />
            </div>
          </div>
        </main>
        
        {/* Saved Designs Panel */}
        <SavedDesigns 
          designs={savedDesigns}
          onDelete={handleDelete}
          onLoad={handleLoad}
          onEdit={handleEdit}
        />
      </div>
    </Layout>
  );
}

export default App;