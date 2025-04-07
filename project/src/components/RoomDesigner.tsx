import React, { useState, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid, Environment, Stats, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { Sidebar } from './Sidebar';

interface RoomDesignerProps {
  activeView: '2d' | '3d';
}

interface RoomShape {
  type: 'square' | 'rectangle' | 'l-shape';
  width: number;
  length: number;
  position: [number, number, number];
}

interface RoomColors {
  floor: string;
  walls: string;
  grid: string;
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

// Optimized Room component with instanced geometry
function Room({ shape, colors }: { shape: RoomShape; colors: RoomColors }) {
  const wallGeometry = useMemo(() => new THREE.BoxGeometry(shape.width, 4, 0.2), [shape.width]);
  const wallMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: colors.walls }), [colors.walls]);
  
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[shape.width, shape.length]} />
        <meshStandardMaterial color={colors.floor} />
      </mesh>
      
      {/* Walls - using instanced geometry for better performance */}
      <group>
        <instancedMesh args={[wallGeometry, wallMaterial, 4]} castShadow>
          <mesh position={[0, 2, -shape.length/2]} />
          <mesh position={[0, 2, shape.length/2]} />
          <mesh position={[-shape.width/2, 2, 0]} rotation={[0, Math.PI / 2, 0]} />
          <mesh position={[shape.width/2, 2, 0]} rotation={[0, Math.PI / 2, 0]} />
        </instancedMesh>
      </group>
    </group>
  );
}

function Scene({ roomShape, colors }: { roomShape: RoomShape | null; colors: RoomColors }) {
  return (
    <>
      {/* Optimized lighting setup */}
      <ambientLight intensity={0.3} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-10, 10, -5]} intensity={0.5} />
      
      {roomShape && <Room shape={roomShape} colors={colors} />}
      <Grid 
        infiniteGrid 
        fadeDistance={50} 
        fadeStrength={5}
        cellSize={1}
        cellThickness={0.5}
        cellColor={colors.grid}
        sectionSize={5}
        sectionThickness={1}
        sectionColor={colors.grid}
      />
      
      {/* Optimized camera controls */}
      <OrbitControls 
        makeDefault
        minDistance={5}
        maxDistance={50}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
        enableDamping
        dampingFactor={0.05}
      />
      
      {/* Performance monitoring */}
      <Stats />
    </>
  );
}

export function RoomDesigner({ activeView: initialView }: RoomDesignerProps) {
  const [activeView, setActiveView] = useState(initialView);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [roomShape, setRoomShape] = useState<RoomShape | null>(null);
  const [colors, setColors] = useState<RoomColors>(colorSchemes.modern);

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.5));
  const handleRotateLeft = () => setRotation(prev => prev - 90);
  const handleRotateRight = () => setRotation(prev => prev + 90);

  const createRoom = (type: RoomShape['type']) => {
    switch (type) {
      case 'square':
        setRoomShape({ type: 'square', width: 10, length: 10, position: [0, 0, 0] });
        break;
      case 'rectangle':
        setRoomShape({ type: 'rectangle', width: 15, length: 10, position: [0, 0, 0] });
        break;
      case 'l-shape':
        setRoomShape({ type: 'l-shape', width: 10, length: 15, position: [0, 0, 0] });
        break;
    }
  };

  const updateRoomDimensions = (dimension: 'width' | 'length', value: number) => {
    if (roomShape) {
      setRoomShape({
        ...roomShape,
        [dimension]: value,
        ...(roomShape.type === 'square' && {
          width: value,
          length: value
        })
      });
    }
  };

  const updateColor = (element: keyof RoomColors, value: string) => {
    setColors(prev => ({
      ...prev,
      [element]: value
    }));
  };

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <Sidebar
        activeView={activeView}
        scale={scale}
        rotation={rotation}
        roomShape={roomShape}
        colors={colors}
        onViewChange={setActiveView}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onRotateLeft={handleRotateLeft}
        onRotateRight={handleRotateRight}
        onCreateRoom={createRoom}
        onUpdateDimensions={updateRoomDimensions}
        onUpdateColor={updateColor}
      />

      {/* Design Canvas */}
      <div className="flex-1 bg-gray-100 p-8">
        {activeView === '2d' ? (
          <div className="h-full bg-white rounded-lg shadow-sm border border-gray-200 relative">
            <div 
              className="absolute inset-0 transition-transform duration-300 ease-in-out"
              style={{
                transform: `scale(${scale}) rotate(${rotation}deg)`,
                transformOrigin: 'center'
              }}
            >
              {/* Grid Background */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2UyZThlYiIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]" />
              
              {/* Room Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                {roomShape ? (
                  <div 
                    className="border-2 border-indigo-500"
                    style={{
                      width: `${roomShape.width * 20}px`,
                      height: `${roomShape.length * 20}px`,
                      transform: `rotate(${rotation}deg)`,
                      backgroundColor: colors.floor
                    }}
                  />
                ) : (
                  <p className="text-gray-500">Click a room shape button to start designing</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <Suspense fallback={<div className="h-full flex items-center justify-center">Loading 3D view...</div>}>
              <Canvas 
                shadows 
                dpr={[1, 2]} // Optimize for high DPI displays
                gl={{ 
                  antialias: true,
                  powerPreference: "high-performance",
                  stencil: false,
                  depth: true
                }}
              >
                <PerspectiveCamera makeDefault position={[15, 15, 15]} fov={50} />
                <Scene roomShape={roomShape} colors={colors} />
                <Environment preset="apartment" />
              </Canvas>
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
}