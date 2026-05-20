import {
    propagate, gstime, twoline2satrec,
    eciToGeodetic, degreesLong, degreesLat, PositionAndVelocity
} from "satellite.js";


import type { SatellitePosition } from '../dataModel/satellitePosition';
import type { TleRecord } from '../dataModel/tle';

// TLEから衛星の緯度経度高度を計算する関数
export function calculateSatellitePosition(
  tleRecord: TleRecord,
  date = new Date(),
): SatellitePosition | null {
  const satrec = twoline2satrec(tleRecord.line1, tleRecord.line2);
  const positionAndVelocity = propagate(satrec, date);

  if (!positionAndVelocity || typeof positionAndVelocity.position !== 'object') {
    return null;
  }

  const gmst = gstime(date);
  const positionGd = eciToGeodetic(positionAndVelocity.position, gmst);

  return {
    latitude: degreesLat(positionGd.latitude),
    longitude: degreesLong(positionGd.longitude),
    altitudeKm: positionGd.height,
  };
}

export function convertSatellitePositionToVector3({
  latitude,
  longitude,
  altitudeKm,
}: SatellitePosition) {
const earthRadiusKm = 6371;
  const earthRadiusScene = 5;

  const radius = earthRadiusScene + (altitudeKm / earthRadiusKm) * earthRadiusScene;

  const lat = (latitude * Math.PI) / 180;
  const lon = (longitude * Math.PI) / 180;

  return {
    x: radius * Math.cos(lat) * Math.sin(lon),
    y: radius * Math.sin(lat),
    z: radius * Math.cos(lat) * Math.cos(lon),
  };
}