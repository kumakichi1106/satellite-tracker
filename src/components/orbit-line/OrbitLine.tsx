import { Line } from '@react-three/drei';
import { useMemo } from 'react';
import type { OrbitPoint } from '../../dataModel/orbitPrediction';

type OrbitLineProps = {
    points: OrbitPoint[];
};

export function OrbitLine({ points }: OrbitLineProps) {
    const linePoints = useMemo(
        () => points.map(({ vector3 }) => [vector3.x, vector3.y, vector3.z] as [number, number, number]),
        [points],
    );

    if (linePoints.length < 2) {
        return null;
    }

    return (
        <Line
            points={linePoints}
            color="cyan"
            lineWidth={1.5}
            transparent
            opacity={0.7}
        />
    );
}