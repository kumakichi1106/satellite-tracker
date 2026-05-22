import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useSatellitePositions } from '../../src/hooks/useSatellitePositions';
import type { TleRecord } from '../../src/dataModel/tle';

const tle: TleRecord = {
  name: 'ISS (ZARYA)',
  line1: '1 25544U 98067A   26140.52007258  .00005164  00000+0  10084-3 0  9993',
  line2: '2 25544  51.6328  77.0641 0007497  79.3410 280.8422 15.49283153567468',
};

describe('useSatellitePositions', () => {
    
  it('TLE配列から衛星位置とVector3を持つ配列を生成する', () => {
    const { result } = renderHook(() =>
      useSatellitePositions([tle], new Date('2026-05-21T00:00:00.000Z')),
    );

    expect(result.current).toHaveLength(1);
    expect(result.current[0]?.tleRecord).toEqual(tle);

    expect(result.current[0]?.position).toEqual(
      expect.objectContaining({
        latitude: expect.any(Number),
        longitude: expect.any(Number),
        altitudeKm: expect.any(Number),
      }),
    );

    expect(result.current[0]?.vector3).toEqual(
      expect.objectContaining({
        x: expect.any(Number),
        y: expect.any(Number),
        z: expect.any(Number),
      }),
    );
  });

  it('空配列を渡した場合は空配列を返す', () => {
    const { result } = renderHook(() =>
      useSatellitePositions([], new Date('2026-05-21T00:00:00.000Z')),
    );

    expect(result.current).toEqual([]);
  });
});