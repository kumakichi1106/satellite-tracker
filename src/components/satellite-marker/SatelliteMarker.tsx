type SatelliteMarkerProps = {
  position: [number, number, number];
};

export function SatelliteMarker({ position }: SatelliteMarkerProps) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.02, 16, 16]} />
      <meshBasicMaterial color="red" />
    </mesh>
  );
}