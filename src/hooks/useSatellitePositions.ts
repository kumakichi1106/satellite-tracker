import { useMemo } from 'react';
import type { TleRecordWithPosition } from '../dataModel/satellitePosition';
import type { TleRecord } from '../dataModel/tle';
import {
  calculateSatellitePosition,
  convertSatellitePositionToVector3,
} from '../domain/satellitePosition';

export function useSatellitePositions(tleRecords: TleRecord[]): TleRecordWithPosition[] {
  return useMemo(() => {
    const calculatedAt = new Date();

    return tleRecords.map((tleRecord) => {
      const position = calculateSatellitePosition(tleRecord, calculatedAt);

      return {
        tleRecord,
        position,
        vector3: position ? convertSatellitePositionToVector3(position) : null,
      };
    });
  }, [tleRecords]);
}