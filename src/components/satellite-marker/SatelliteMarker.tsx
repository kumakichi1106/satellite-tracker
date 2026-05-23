import type { ThreeEvent } from '@react-three/fiber';

type SatelliteMarkerProps = {
  position: [number, number, number];
  isSelected: boolean;
  onClick: () => void;
};

export function SatelliteMarker({ position, isSelected, onClick }: SatelliteMarkerProps) {
  return (
    <mesh
      position={position}
      onClick={(event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation();
        onClick();
      }}>
      <sphereGeometry args={isSelected ? [0.06, 16, 16] : [0.04, 16, 16]} />
      <meshBasicMaterial color={isSelected ? 'yellow' : 'red'} />
    </mesh>
  );
}