import { describe, expect, it } from 'vitest';
import { calculateOrbitPrediction } from '../../src/domain/orbitPrediction';
import type { TleRecord } from '../../src/dataModel/tle';

const tle: TleRecord = {
    name: 'ISS (ZARYA)',
    line1: '1 25544U 98067A   26140.52007258  .00005164  00000+0  10084-3 0  9993',
    line2: '2 25544  51.6328  77.0641 0007497  79.3410 280.8422 15.49283153567468',
};

describe('calculateOrbitPrediction', () => {

    it('指定した時間範囲と間隔で軌道予測点を生成する', () => {
        const result = calculateOrbitPrediction({
            tleRecord: tle,
            startDate: new Date('2026-05-21T00:00:00.000Z'),
            durationMinutes: 10,
            stepMinutes: 5,
        });

        expect(result.points).toHaveLength(3);
    });

    it('各軌道予測点に位置情報とVector3を含む', () => {
        
        const result = calculateOrbitPrediction({
            tleRecord: tle,
            startDate: new Date('2026-05-21T00:00:00.000Z'),
            durationMinutes: 0,
            stepMinutes: 1,
        });

        expect(result.points[0]?.position).toEqual(
            expect.objectContaining({
                latitude: expect.any(Number),
                longitude: expect.any(Number),
                altitudeKm: expect.any(Number),
            }),
        );

        expect(result.points[0]?.vector3).toEqual(
            expect.objectContaining({
                x: expect.any(Number),
                y: expect.any(Number),
                z: expect.any(Number),
            }),
        );
    });
});