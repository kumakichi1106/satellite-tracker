import { useMemo } from 'react';
import type { TleRecordWithPosition } from '../dataModel/satellitePosition';
import type { TleRecord } from '../dataModel/tle';
import { calculateSatellitePosition } from '../domain/satellitePosition';

export function useSatellitePositions(tleRecords: TleRecord[]): TleRecordWithPosition[] {
  return useMemo(() => {
    const calculatedAt = new Date();

    return tleRecords.map((tleRecord) => ({
      tleRecord,
      position: calculateSatellitePosition(tleRecord, calculatedAt),
    }));
  }, [tleRecords]);
}