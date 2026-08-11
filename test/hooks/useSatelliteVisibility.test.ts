import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { GROUND_STATIONS } from '../../src/constants/groundStations';
import type { TleRecordWithPosition } from '../../src/dataModel/satellitePosition';
import { useSatelliteVisibility } from '../../src/hooks/useSatelliteVisibility';

const selectedSatellite: TleRecordWithPosition = {
  tleRecord: {
    name: 'CYGFM05',
    line1: '1 41884U 16078A   26141.16913389  .00016990  00000+0  24180-3 0  9993',
    line2: '2 41884  34.9574  79.3244 0009021 259.1956 100.7753 15.55362017524545',
  },
  position: null,
  vector3: null,
};

describe('useSatelliteVisibility', () => {
  it('地上局を変更すると可視情報を再計算する', () => {
    const currentTime = new Date('2026-05-21T03:50:00.000Z');

    const { result, rerender } = renderHook(
      ({ groundStation }) =>
        useSatelliteVisibility(
          selectedSatellite,
          groundStation,
          currentTime,
        ),
      {
        initialProps: {
          groundStation: GROUND_STATIONS[0],
        },
      },
    );

    const hiyoshiLookAngle = result.current?.currentLookAngle;

    rerender({
      groundStation: GROUND_STATIONS[1],
    });

    const sapporoLookAngle = result.current?.currentLookAngle;

    expect(hiyoshiLookAngle).not.toBeNull();
    expect(sapporoLookAngle).not.toBeNull();
    expect(sapporoLookAngle).not.toEqual(hiyoshiLookAngle);
  });
});