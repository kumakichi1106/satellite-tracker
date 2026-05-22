import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { ReactNode } from 'react';
import {
    SatelliteTrackerProvider,
    useSatelliteTracker,
} from '../../src/contexts/satelliteTrackerContext';
import type { TleRecord } from '../../src/dataModel/tle';

const tle: TleRecord = {
    name: 'ISS (ZARYA)',
    line1: '1 25544U 98067A   26140.52007258  .00005164  00000+0  10084-3 0  9993',
    line2: '2 25544  51.6328  77.0641 0007497  79.3410 280.8422 15.49283153567468',
};

vi.mock('../../src/hooks/useCurrentTime', () => ({
    useCurrentTime: () => new Date('2026-05-21T00:00:00.000Z'),
}));

vi.mock('../../src/hooks/useTleRecords', () => ({
    useTleRecords: () => ({
        records: [tle],
        isLoading: false,
        errorMessage: null,
    }),
}));

vi.mock('../../src/hooks/useSatellitePositions', () => ({
    useSatellitePositions: () => [
        {
            tleRecord: tle,
            position: {
                latitude: 35,
                longitude: 139,
                altitudeKm: 400,
            },
            vector3: {
                x: 1,
                y: 2,
                z: 3,
            },
        },
    ],
}));

vi.mock('../../src/hooks/useOrbitPrediction', () => ({
    useOrbitPrediction: () => ({
        points: [],
    }),
}));

function wrapper({ children }: { children: ReactNode }) {
    return <SatelliteTrackerProvider>{children}</SatelliteTrackerProvider>;
}

describe('SatelliteTrackerContext', () => {
    it('Provider配下で衛星データを取得できる', () => {
        const { result } = renderHook(() => useSatelliteTracker(), { wrapper });

        expect(result.current.satellites).toHaveLength(1);
        expect(result.current.satellites[0]?.tleRecord.name).toBe('ISS (ZARYA)');
        expect(result.current.isLoading).toBe(false);
        expect(result.current.errorMessage).toBeNull();
    });

    it('selectSatelliteで選択中衛星を更新できる', () => {
        const { result } = renderHook(() => useSatelliteTracker(), { wrapper });

        act(() => {
            result.current.selectSatellite('ISS (ZARYA)');
        });

        expect(result.current.selectedSatelliteName).toBe('ISS (ZARYA)');
        expect(result.current.selectedSatellite?.tleRecord.name).toBe('ISS (ZARYA)');
    });

    it('clearSelectedSatelliteで選択中衛星を解除できる', () => {
        const { result } = renderHook(() => useSatelliteTracker(), { wrapper });

        act(() => {
            result.current.selectSatellite('ISS (ZARYA)');
        });

        act(() => {
            result.current.clearSelectedSatellite();
        });

        expect(result.current.selectedSatelliteName).toBeNull();
        expect(result.current.selectedSatellite).toBeNull();
    });
});