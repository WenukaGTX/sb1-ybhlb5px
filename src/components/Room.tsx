import { useRef } from 'react';
import { Mesh } from 'three';

export function Room() {
  const floorRef = useRef<Mesh>(null);
  const wallsRef = useRef<Mesh>(null);

  return (
    <group>
      {/* Floor */}
      <mesh
        ref={floorRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2, 0]}
        receiveShadow
      >
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {/* Walls */}
      <group ref={wallsRef}>
        {/* Back wall */}
        <mesh position={[0, 3, -10]} receiveShadow castShadow>
          <boxGeometry args={[20, 10, 0.3]} />
          <meshStandardMaterial color="#e0e0e0" />
        </mesh>

        {/* Left wall */}
        <mesh position={[-10, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow castShadow>
          <boxGeometry args={[20, 10, 0.3]} />
          <meshStandardMaterial color="#e8e8e8" />
        </mesh>

        {/* Right wall */}
        <mesh position={[10, 3, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow castShadow>
          <boxGeometry args={[20, 10, 0.3]} />
          <meshStandardMaterial color="#e8e8e8" />
        </mesh>
      </group>
    </group>
  );
}