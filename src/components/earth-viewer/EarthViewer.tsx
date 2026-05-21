import * as THREE from 'three';
import { Canvas, useLoader } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import { SatelliteMarker } from "../satellite-marker";
import { OrbitLine } from "../orbit-line";
import type { TleRecordWithPosition } from '../../dataModel/satellitePosition';
import type { OrbitPrediction } from '../../dataModel/orbitPrediction';

type EarthViewerProps = {
  satellites: TleRecordWithPosition[];
  selectedSatelliteName: string | null;
  selectedOrbitPrediction: OrbitPrediction | null;
  onSelectSatellite: (name: string) => void;
  onClearSelectedSatellite: () => void;

};


export function EarthViewer({
  satellites,
  selectedSatelliteName,
  selectedOrbitPrediction,
  onSelectSatellite,
  onClearSelectedSatellite
}: EarthViewerProps) {
  const map = useLoader(THREE.TextureLoader, "./assets/earthmap.jpg");

  return (
    <div className="h-screen w-full">
      <Canvas className="h-full w-full"
        onPointerMissed={onClearSelectedSatellite}
        camera={{
          position: [0, 0, 14],
          fov: 45,
        }}>
        <mesh rotation={[0.6, -Math.PI * 1.28, 0]}>
          <sphereGeometry args={[5, 64, 64]} />
          <meshPhongMaterial map={map} />
        </mesh>
        <ambientLight intensity={1.8} />
        <directionalLight position={[5, 5, 5]} intensity={2.5} />
        <CameraControls minDistance={7} maxDistance={30} />
        {satellites.map(({ tleRecord, vector3 }) => {
          if (!vector3) return null;
          return (
            <SatelliteMarker
              key={tleRecord.name}
              position={[vector3.x, vector3.y, vector3.z]}
              isSelected={tleRecord.name === selectedSatelliteName}
              onClick={() => onSelectSatellite(tleRecord.name)}
            />
          );
        })}
        {selectedOrbitPrediction && (
          <OrbitLine points={selectedOrbitPrediction.points} />
        )}
      </Canvas>

    </div>
  );
}
