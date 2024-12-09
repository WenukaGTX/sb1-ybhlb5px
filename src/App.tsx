import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Room } from './components/Room';
import { Controls } from './components/Controls';
import { Furniture } from './components/Furniture';
import { UI } from './components/UI';
import { useFurnitureStore } from './store/furnitureStore';

function App() {
  const furniture = useFurnitureStore((state) => state.furniture);

  return (
    <div className="relative w-full h-screen bg-gray-900">
      <Canvas shadows camera={{ position: [10, 10, 10], fov: 60 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <Controls />
          <Room />
          {furniture.map((item) => (
            <Furniture
              key={item.id}
              id={item.id}
              position={item.position}
              type={item.type}
            />
          ))}
        </Suspense>
      </Canvas>
      <UI />
    </div>
  );
}

export default App;