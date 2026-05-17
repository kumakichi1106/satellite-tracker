import type { TleRecord } from './tle';

export type SatellitePosition = {
  latitude: number;
  longitude: number;
  altitudeKm: number;
};

export type TleRecordWithPosition = {
  tleRecord: TleRecord;
  position: SatellitePosition | null;
};