import type { TleRecord } from './tle';

export type SatellitePosition = {
  latitude: number;
  longitude: number;
  altitudeKm: number;
};

export type SatelliteVector3 = {
  x: number;
  y: number;
  z: number;
};

export type TleRecordWithPosition = {
  tleRecord: TleRecord;
  position: SatellitePosition | null;
  vector3: SatelliteVector3 | null;
};