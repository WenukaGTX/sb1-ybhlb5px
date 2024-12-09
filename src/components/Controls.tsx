import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useFurnitureStore } from '../store/furnitureStore';

export function Controls() {
  const { camera } = useThree();
  const isDragging = useFurnitureStore((state) => state.isDragging);

  return (
    <>
      <PerspectiveCamera makeDefault position={[10, 10, 10]} />
      <OrbitControls
        enabled={!isDragging}
        enableDamping
        dampingFactor={0.05}
        minDistance={5}
        maxDistance={20}
        maxPolarAngle={Math.PI / 2}
        camera={camera}
      />
    </>
  );
}