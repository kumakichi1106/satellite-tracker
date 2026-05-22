import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useOrbitPrediction } from '../../src/hooks/useOrbitPrediction';
import type { TleRecordWithPosition } from '../../src/dataModel/satellitePosition';

const satellite: TleRecordWithPosition = {
  tleRecord: {
    name: 'ISS (ZARYA)',
    line1: '1 25544U 98067A   26140.52007258  .00005164  00000+0  10084-3 0  9993',
    line2: '2 25544  51.6328  77.0641 0007497  79.3410 280.8422 15.49283153567468',
  },
  position: {
    latitude: 0,
    longitude: 0,
    altitudeKm: 400,
  },
  vector3: {
    x: 0,
    y: 0,
    z: 0,
  },
};

describe('useOrbitPrediction', () => {
  it('選択中衛星がない場合はnullを返す', () => {
    const { result } = renderHook(() => useOrbitPrediction(null));

    expect(result.current).toBeNull();
  });

  it('選択中衛星がある場合は軌道予測を返す', () => {
    const { result } = renderHook(() => useOrbitPrediction(satellite));

    expect(result.current).not.toBeNull();
    expect(result.current?.points.length).toBeGreaterThan(0);
    expect(result.current?.points[0]).toEqual(
      expect.objectContaining({
        calculatedAt: expect.any(Date),
        position: expect.objectContaining({
          latitude: expect.any(Number),
          longitude: expect.any(Number),
          altitudeKm: expect.any(Number),
        }),
        vector3: expect.objectContaining({
          x: expect.any(Number),
          y: expect.any(Number),
          z: expect.any(Number),
        }),
      }),
    );
  });
});