import { describe, expect, it } from 'vitest';
import {
  calculateSatellitePosition,
  convertSatellitePositionToVector3,
} from '../../src/domain/satellitePosition';
import type { TleRecord } from '../../src/dataModel/tle';

const tle: TleRecord = {
  name: 'ISS (ZARYA)',
  line1: '1 25544U 98067A   26140.52007258  .00005164  00000+0  10084-3 0  9993',
  line2: '2 25544  51.6328  77.0641 0007497  79.3410 280.8422 15.49283153567468',
};

describe('calculateSatellitePosition', () => {

  it('TLEと日時から衛星位置を計算する', () => {
    const result = calculateSatellitePosition(
      tle,
      new Date('2026-05-21T00:00:00.000Z'),
    );

    expect(result).not.toBeNull();
    expect(result?.latitude).toEqual(expect.any(Number));
    expect(result?.longitude).toEqual(expect.any(Number));
    expect(result?.altitudeKm).toEqual(expect.any(Number));
  });
});

describe('convertSatellitePositionToVector3', () => {
    
  it('緯度・経度・高度をThree.js用Vector3に変換する', () => {
    const result = convertSatellitePositionToVector3({
      latitude: 35.0,
      longitude: 139.0,
      altitudeKm: 400,
    });

    expect(result.x).toEqual(expect.any(Number));
    expect(result.y).toEqual(expect.any(Number));
    expect(result.z).toEqual(expect.any(Number));
  });
});