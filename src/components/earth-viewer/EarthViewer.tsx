import * as THREE from 'three';
import { Canvas, useLoader } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import { SatelliteMarker } from "../satellite-marker";
import type { TleRecordWithPosition } from '../../dataModel/satellitePosition';

type EarthViewerProps = {
  satellites: TleRecordWithPosition[];
};


export function EarthViewer({ satellites }: EarthViewerProps) {
  const map = useLoader(THREE.TextureLoader, "./assets/earthmap.jpg");

  return (
    <div className="h-screen w-full">
      <Canvas className="h-full w-full">
        <mesh rotation={[0, -Math.PI / 2, 0]}>
          <sphereGeometry args={[5, 64, 64]} />
          <meshPhongMaterial map={map} />
        </mesh>
        <ambientLight intensity={1} />
        <CameraControls minDistance={1} maxDistance={100} />
        {satellites.map(({ tleRecord, vector3 }) => {
          if (!vector3) return null;
          return (
            <SatelliteMarker
              key={tleRecord.name}
              position={[vector3.x, vector3.y, vector3.z]}
            />
          );
        })}
      </Canvas>

    </div>
  );
}
