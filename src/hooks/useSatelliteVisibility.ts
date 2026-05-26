import { useMemo } from 'react';
import { DEFAULT_GROUND_STATION } from '../constants/groundStations';
import type { SatelliteVisibility } from '../dataModel/visibility';
import type { TleRecordWithPosition } from '../dataModel/satellitePosition';
import { calculateCurrentVisibility } from '../domain/satelliteVisibility';

export function useSatelliteVisibility(
    selectedSatellite: TleRecordWithPosition | null,
    currentTime: Date,
): SatelliteVisibility | null {
    return useMemo(() => {
        if (!selectedSatellite) {
            return null;
        }

        return calculateCurrentVisibility({
            tleRecord: selectedSatellite.tleRecord,
            groundStation: DEFAULT_GROUND_STATION,
            date: currentTime,
        });
    }, [selectedSatellite, currentTime]);
}