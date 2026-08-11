import { useMemo } from 'react';
import type { SatelliteVisibility } from '../dataModel/visibility';
import type { TleRecordWithPosition } from '../dataModel/satellitePosition';
import { calculateCurrentVisibility } from '../domain/satelliteVisibility';
import { GroundStation } from '../dataModel/groundStation';

export function useSatelliteVisibility(
    selectedSatellite: TleRecordWithPosition | null,
    groundStation: GroundStation,
    currentTime: Date,
): SatelliteVisibility | null {
    return useMemo(() => {
        if (!selectedSatellite) {
            return null;
        }

        return calculateCurrentVisibility({
            tleRecord: selectedSatellite.tleRecord,
            groundStation,
            date: currentTime,
        });
    }, [selectedSatellite, groundStation, currentTime]);
}