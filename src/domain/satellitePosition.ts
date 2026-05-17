import * as satellite from 'satellite.js';

import type { SatellitePosition } from '../dataModel/satellitePosition';
import type { TleRecord } from '../dataModel/tle';

// TLEから衛星の緯度経度高度を計算する関数
export function calculateSatellitePosition(
  tleRecord: TleRecord,
  date = new Date(),
): SatellitePosition | null {
  const satrec = satellite.twoline2satrec(tleRecord.line1, tleRecord.line2);
  const positionAndVelocity = satellite.propagate(satrec, date);

  if (!positionAndVelocity || typeof positionAndVelocity.position !== 'object') {
    return null;
  }

  const gmst = satellite.gstime(date);
  const positionGd = satellite.eciToGeodetic(positionAndVelocity.position, gmst);

  return {
    latitude: satellite.degreesLat(positionGd.latitude),
    longitude: satellite.degreesLong(positionGd.longitude),
    altitudeKm: positionGd.height,
  };
}