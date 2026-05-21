import { useMemo } from 'react';
import type { TleRecordWithPosition } from '../dataModel/satellitePosition';
import type { TleRecord } from '../dataModel/tle';
import {
  calculateSatellitePosition,
  convertSatellitePositionToVector3,
} from '../domain/satellitePosition';

export function useSatellitePositions(
  tleRecords: TleRecord[],
  date: Date,
): TleRecordWithPosition[] {
  return useMemo(() => {
    return tleRecords.map((tleRecord) => {
      const position = calculateSatellitePosition(tleRecord, date);

      return {
        tleRecord,
        position,
        vector3: position ? convertSatellitePositionToVector3(position) : null,
      };
    });
  }, [tleRecords, date]);
}