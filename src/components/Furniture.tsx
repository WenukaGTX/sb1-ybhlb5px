import { useRef, useState } from 'react';
import { Mesh, Plane, Raycaster, Vector3 } from 'three';
import { useThree } from '@react-three/fiber';
import { Html, useHelper } from '@react-three/drei';
import { RotateCw } from 'lucide-react';
import { BoxHelper } from 'three';
import { useFurnitureStore } from '../store/furnitureStore';

interface FurnitureProps {
  position: [number, number, number];
  type: 'chair' | 'table' | 'sofa';
  id: string;
}

export function Furniture({ position, type, id }: FurnitureProps) {
  const meshRef = useRef<Mesh>(null);
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const updateFurniture = useFurnitureStore((state) => state.updateFurniture);
  const setGlobalDragging = useFurnitureStore((state) => state.setIsDragging);

  const { camera, raycaster } = useThree();
  const dragPlane = new Plane(new Vector3(0, 1, 0), 0);
  const intersection = new Vector3();

  // Add box helper when dragging or hovering
  useHelper(isHovered || isDragging ? meshRef : null, BoxHelper, 'cyan');

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    setIsDragging(true);
    setGlobalDragging(true);
    document.body.style.cursor = 'grabbing';
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    setGlobalDragging(false);
    document.body.style.cursor = 'auto';
  };

  const handlePointerMove = (e: any) => {
    if (!isDragging || !meshRef.current) return;

    e.stopPropagation();
    const { clientX, clientY } = e;
    const rect = e.target.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera({ x, y }, camera);
    raycaster.ray.intersectPlane(dragPlane, intersection);

    const newPosition: [number, number, number] = [
      Math.max(-9, Math.min(9, intersection.x)),
      position[1],
      Math.max(-9, Math.min(9, intersection.z))
    ];

    meshRef.current.position.x = newPosition[0];
    meshRef.current.position.z = newPosition[2];
    updateFurniture(id, newPosition);
  };

  const handleRotate = (event: React.MouseEvent) => {
    event.stopPropagation();
    const newRotation = rotation + Math.PI / 2;
    setRotation(newRotation);
    if (meshRef.current) {
      meshRef.current.rotation.y = newRotation;
    }
  };

  const renderFurniture = () => {
    switch (type) {
      case 'chair':
        return (
          <>
            <mesh position={[0, 0, 0]} castShadow>
              <boxGeometry args={[0.8, 0.5, 0.8]} />
              <meshStandardMaterial color={isHovered || isDragging ? "#a0522d" : "#8b4513"} />
            </mesh>
            <mesh position={[0, 0.85, -0.3]} castShadow>
              <boxGeometry args={[0.8, 0.8, 0.2]} />
              <meshStandardMaterial color={isHovered || isDragging ? "#a0522d" : "#8b4513"} />
            </mesh>
          </>
        );
      case 'table':
        return (
          <>
            <mesh position={[0, 0.4, 0]} castShadow>
              <boxGeometry args={[2, 0.1, 1.5]} />
              <meshStandardMaterial color={isHovered || isDragging ? "#8b4513" : "#654321"} />
            </mesh>
            {[[-0.8, -0.6], [0.8, -0.6]].map(([x, y], i) => (
              <mesh key={i} position={[x, y, 0.6]} castShadow>
                <boxGeometry args={[0.1, 1, 0.1]} />
                <meshStandardMaterial color={isHovered || isDragging ? "#8b4513" : "#654321"} />
              </mesh>
            ))}
            {[[-0.8, -0.6], [0.8, -0.6]].map(([x, y], i) => (
              <mesh key={i + 2} position={[x, y, -0.6]} castShadow>
                <boxGeometry args={[0.1, 1, 0.1]} />
                <meshStandardMaterial color={isHovered || isDragging ? "#8b4513" : "#654321"} />
              </mesh>
            ))}
          </>
        );
      case 'sofa':
        return (
          <>
            <mesh position={[0, 0.2, 0]} castShadow>
              <boxGeometry args={[2.5, 0.4, 1]} />
              <meshStandardMaterial color={isHovered || isDragging ? "#4a4a4a" : "#3a3a3a"} />
            </mesh>
            <mesh position={[0, 0.7, -0.35]} castShadow>
              <boxGeometry args={[2.5, 0.6, 0.3]} />
              <meshStandardMaterial color={isHovered || isDragging ? "#4a4a4a" : "#3a3a3a"} />
            </mesh>
            <mesh position={[-1.05, 0.5, 0]} castShadow>
              <boxGeometry args={[0.4, 0.4, 1]} />
              <meshStandardMaterial color={isHovered || isDragging ? "#4a4a4a" : "#3a3a3a"} />
            </mesh>
            <mesh position={[1.05, 0.5, 0]} castShadow>
              <boxGeometry args={[0.4, 0.4, 1]} />
              <meshStandardMaterial color={isHovered || isDragging ? "#4a4a4a" : "#3a3a3a"} />
            </mesh>
          </>
        );
    }
  };

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      {renderFurniture()}
      {(isHovered || isDragging) && (
        <Html position={[0, 1.5, 0]}>
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={handleRotate}
              className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            >
              <RotateCw size={16} />
            </button>
            {isDragging && (
              <div className="px-2 py-1 bg-black/75 text-white text-xs rounded">
                Dragging {type}...
              </div>
            )}
          </div>
        </Html>
      )}
    </group>
  );
}