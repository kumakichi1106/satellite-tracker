import { describe, expect, it } from 'vitest';
import {
    calculateCurrentVisibility,
    calculateLookAngle,
    calculateNextVisibilityWindow,
    isVisibleFromGroundStation,
} from '../../src/domain/satelliteVisibility';
import type { GroundStation } from '../../src/dataModel/groundStation';
import type { TleRecord } from '../../src/dataModel/tle';

const groundStation: GroundStation = {
    name: 'Hiyoshi',
    latitude: 35.5532,
    longitude: 139.6469,
    altitudeKm: 0,
};

const cygfm05: TleRecord = {
    name: 'CYGFM05',
    line1: '1 41884U 16078A   26141.16913389  .00016990  00000+0  24180-3 0  9993',
    line2: '2 41884  34.9574  79.3244 0009021 259.1956 100.7753 15.55362017524545',
};

describe('satelliteVisibility', () => {

    it('地上局から見た仰角・方位角・距離を計算できる', () => {
        const lookAngle = calculateLookAngle({
            tleRecord: cygfm05,
            groundStation,
            date: new Date('2026-05-21T00:00:00.000Z'),
        });

        expect(lookAngle).not.toBeNull();

        expect(lookAngle?.elevationDeg).toEqual(expect.any(Number));
        expect(lookAngle?.azimuthDeg).toEqual(expect.any(Number));
        expect(lookAngle?.rangeKm).toEqual(expect.any(Number));

        expect(lookAngle?.azimuthDeg).toBeGreaterThanOrEqual(0);
        expect(lookAngle?.azimuthDeg).toBeLessThan(360);
        expect(lookAngle?.rangeKm).toBeGreaterThan(0);
    });

    it('仰角が0度より大きい場合は可視と判定する', () => {
        expect(isVisibleFromGroundStation({ elevationDeg: 10, azimuthDeg: 180, rangeKm: 1000 })).toBe(true);
    });

    it('仰角が0度以下の場合は不可視と判定する', () => {
        expect(isVisibleFromGroundStation({ elevationDeg: 0, azimuthDeg: 180, rangeKm: 1000 })).toBe(false);
        expect(isVisibleFromGroundStation({ elevationDeg: -5, azimuthDeg: 180, rangeKm: 1000 })).toBe(false);
    });

    it('指定範囲内の可視時間帯を計算できる', () => {
        const visibility = calculateCurrentVisibility({
            tleRecord: cygfm05,
            groundStation,
            date: new Date('2026-05-21T03:50:00.000Z'),
        });

        expect(visibility.currentLookAngle).not.toBeNull();

        if (!visibility.nextWindow) {
            throw new Error('Expected next visibility window');
        }

        expect(visibility.nextWindow.aos).toBeInstanceOf(Date);
        expect(visibility.nextWindow.los).toBeInstanceOf(Date);
        expect(visibility.nextWindow.aos.getTime()).toBeLessThan(visibility.nextWindow.los.getTime());
        expect(visibility.nextWindow.maxElevationDeg).toBeGreaterThan(0);
        expect(visibility.nextWindow.durationMinutes).toBeGreaterThan(0);
    });

    it('現在可視中の場合は現在の通過のAOS/LOSを計算できる', () => {
        const nextWindow = calculateNextVisibilityWindow({
            tleRecord: cygfm05,
            groundStation,
            startDate: new Date('2026-05-21T03:50:00.000Z'),
        });

        if (!nextWindow) {
            throw new Error('Expected next visibility window');
        }

        const currentVisibleDate = new Date(
            Math.floor(((nextWindow.aos.getTime() + nextWindow.los.getTime()) / 2) / 60_000) * 60_000,
        );

        const visibilityWindow = calculateNextVisibilityWindow({
            tleRecord: cygfm05,
            groundStation,
            startDate: currentVisibleDate,
        });

        if (!visibilityWindow) {
            throw new Error('Expected current visibility window');
        }

        expect(visibilityWindow.aos.getTime()).toBeLessThanOrEqual(currentVisibleDate.getTime());
        expect(visibilityWindow.los.getTime()).toBeGreaterThanOrEqual(currentVisibleDate.getTime());
        expect(visibilityWindow.maxElevationDeg).toBeGreaterThan(0);
        expect(visibilityWindow.durationMinutes).toBeGreaterThan(0);
    });

    it('指定範囲内に可視時間帯がない場合はnullを返す', () => {
        const visibilityWindow = calculateNextVisibilityWindow({
            tleRecord: cygfm05,
            groundStation,
            startDate: new Date('2026-05-21T00:00:00.000Z'),
            searchMinutes: 1,
        });

        expect(visibilityWindow).toBeNull();
    });
});
