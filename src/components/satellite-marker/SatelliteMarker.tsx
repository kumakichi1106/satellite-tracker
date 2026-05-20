type SatelliteMarkerProps = {
  position: [number, number, number];
  isSelected: boolean;
  onClick: () => void;
};

export function SatelliteMarker({ position, isSelected, onClick }: SatelliteMarkerProps) {
  return (
    // 衛星マーカーの描画
    <mesh position={position} onClick={onClick}>
      <sphereGeometry args={isSelected ?[0.06, 16, 16] : [0.04, 16, 16]} />
      <meshBasicMaterial color={isSelected ? 'yellow' : 'red'} />
    </mesh>
  );
}