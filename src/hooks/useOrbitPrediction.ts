import { useMemo } from 'react';
import type { TleRecordWithPosition } from '../dataModel/satellitePosition';
import type { OrbitPrediction } from '../dataModel/orbitPrediction';
import { calculateOrbitPrediction } from '../domain/orbitPrediction';

export function useOrbitPrediction(
    selectedSatellite: TleRecordWithPosition | null,
): OrbitPrediction | null {
    return useMemo(() => {
        if (!selectedSatellite) return null;

        return calculateOrbitPrediction({
            tleRecord: selectedSatellite.tleRecord,
        });
    }, [selectedSatellite]);
}