import { describe, expect, it } from 'vitest';
import {
    calculateTleAgeMinutes,
    getTleEpochInfo,
    parseTleEpoch,
} from '../../src/domain/tleEpoch';

describe('tleEpoch', () => {
    it('TLE line1からepochをDateに変換できる', () => {
        const epoch = parseTleEpoch(
            '1 25544U 98067A   26140.52007258  .00005164  00000+0  10084-3 0  9993',
        );

        expect(epoch).not.toBeNull();
        expect(epoch?.getUTCFullYear()).toBe(2026);
    });

    it('TLE epochからageを分単位で計算できる', () => {
        const epoch = new Date('2026-01-01T00:00:00.000Z');
        const now = new Date('2026-01-02T01:30:00.000Z');

        expect(calculateTleAgeMinutes(epoch, now)).toBe(1530);
    });

    it('不正なline1の場合はnullを返す', () => {
        expect(parseTleEpoch('invalid tle')).toBeNull();
    });

    it('epoch情報を取得できる', () => {
        const info = getTleEpochInfo(
            '1 25544U 98067A   26140.52007258  .00005164  00000+0  10084-3 0  9993',
            new Date('2026-05-21T00:00:00.000Z'),
        );

        expect(info).not.toBeNull();
        expect(info?.epoch).toBeInstanceOf(Date);
        expect(info?.ageMinutes).toEqual(expect.any(Number));
    });
});