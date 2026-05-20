import * as THREE from 'three';
import { Canvas, useLoader } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";

export function Earth() {
  const map = useLoader(THREE.TextureLoader, "./assets/earthmap.jpg");

  return (
    <div className="h-screen w-full">
      <Canvas className="h-full w-full">
        <mesh>
          <sphereGeometry />
          <meshPhongMaterial map={map} />
        </mesh>
        <ambientLight intensity={1} />
        <CameraControls minDistance={1} maxDistance={100} />
      </Canvas>

    </div>
  );
}

