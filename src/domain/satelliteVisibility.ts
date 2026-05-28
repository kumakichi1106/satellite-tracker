/*
 * TLEは現在位置そのものではなく、SGP4で任意時刻の衛星位置を推算するための軌道要素。
 * そのため、現在時刻だけでなく、過去・未来の時刻を指定して衛星位置を計算できる。
 *
 * このファイルでは、指定時刻の仰角・方位角・距離を算出し、
 * 仰角が0度を超える区間を地上局から見える時間帯として扱う。
 *
 * AOSは衛星が地上局から見え始める時刻。
 * LOSは衛星が地上局から見え終わる時刻。
 * 
 * AOS/LOSは1分刻みのサンプリングで求める近似値。
 */

import {
    degreesToRadians,
    eciToEcf,
    ecfToLookAngles,
    gstime,
    propagate,
    radiansToDegrees,
    twoline2satrec,
} from 'satellite.js';

import type { GroundStation } from '../dataModel/groundStation';
import type {
    LookAngle,
    SatelliteVisibility,
    VisibilityWindow,
} from '../dataModel/visibility';
import type { TleRecord } from '../dataModel/tle';

const DEFAULT_VISIBILITY_SEARCH_MINUTES = 180;
const DEFAULT_VISIBILITY_STEP_MINUTES = 1;
const VISIBLE_ELEVATION_THRESHOLD_DEG = 0;

type CalculateLookAngleParams = {
    tleRecord: TleRecord;
    groundStation: GroundStation;
    date?: Date;
};

type CalculateCurrentVisibilityParams = {
    tleRecord: TleRecord;
    groundStation: GroundStation;
    date?: Date;
};

type CalculateVisibilityWindowParams = {
    tleRecord: TleRecord;
    groundStation: GroundStation;
    startDate?: Date;
    searchMinutes?: number;
    stepMinutes?: number;
};

type VisibilitySearchParams = {
    tleRecord: TleRecord;
    groundStation: GroundStation;
    startDate: Date;
    searchMinutes: number;
    stepMinutes: number;
};

// 指定時刻における、地上局から見た衛星の方位角・仰角・距離を計算する
function calculateLookAngle({
    tleRecord,
    groundStation,
    date = new Date(),
}: CalculateLookAngleParams): LookAngle | null {
    const satrec = twoline2satrec(tleRecord.line1, tleRecord.line2);
    const positionAndVelocity = propagate(satrec, date);

    if (!positionAndVelocity || typeof positionAndVelocity.position !== 'object') {
        return null;
    }

    const gmst = gstime(date);
    const satelliteEcf = eciToEcf(positionAndVelocity.position, gmst);

    const observerGeodetic = {
        latitude: degreesToRadians(groundStation.latitude),
        longitude: degreesToRadians(groundStation.longitude),
        height: groundStation.altitudeKm,
    };

    const lookAngles = ecfToLookAngles(observerGeodetic, satelliteEcf);

    return {
        azimuthDeg: normalizeAzimuthDeg(radiansToDegrees(lookAngles.azimuth)),
        elevationDeg: radiansToDegrees(lookAngles.elevation),
        rangeKm: lookAngles.rangeSat,
    };
}

// 仰角が0度を超えていれば、地上局の地平線より上にあるとみなす
function isVisibleFromGroundStation(lookAngle: LookAngle | null): boolean {
    return lookAngle !== null && lookAngle.elevationDeg > VISIBLE_ELEVATION_THRESHOLD_DEG;
}

// 現在の可視状態と、次または現在進行中の可視時間帯をまとめて返す
export function calculateCurrentVisibility({
    tleRecord,
    groundStation,
    date = new Date(),
}: CalculateCurrentVisibilityParams): SatelliteVisibility {
    const currentLookAngle = calculateLookAngle({
        tleRecord,
        groundStation,
        date,
    });

    return {
        currentLookAngle,
        isCurrentlyVisible: isVisibleFromGroundStation(currentLookAngle),
        nextWindow: calculateNextVisibilityWindow({
            tleRecord,
            groundStation,
            startDate: date,
        }),
    };
}

// 現在可視中なら過去方向にAOSを探し、不可視なら未来方向に次のAOSを探す
export function calculateNextVisibilityWindow({
    tleRecord,
    groundStation,
    startDate = new Date(),
    searchMinutes = DEFAULT_VISIBILITY_SEARCH_MINUTES,
    stepMinutes = DEFAULT_VISIBILITY_STEP_MINUTES,
}: CalculateVisibilityWindowParams): VisibilityWindow | null {
    const searchStartDate = floorToMinute(startDate);

    const currentLookAngle = calculateLookAngle({
        tleRecord,
        groundStation,
        date: searchStartDate,
    });

    const isCurrentlyVisible = isVisibleFromGroundStation(currentLookAngle);

    if (isCurrentlyVisible) {
        const aos = findAosFromCurrentPass({
            tleRecord,
            groundStation,
            startDate: searchStartDate,
            searchMinutes,
            stepMinutes,
        });

        const los = findLosFromDate({
            tleRecord,
            groundStation,
            startDate: searchStartDate,
            searchMinutes,
            stepMinutes,
        });

        if (!aos || !los) {
            return null;
        }

        return buildVisibilityWindow({
            tleRecord,
            groundStation,
            aos,
            los,
            stepMinutes,
        });
    }

    const aos = findNextAos({
        tleRecord,
        groundStation,
        startDate: searchStartDate,
        searchMinutes,
        stepMinutes,
    });

    if (!aos) {
        return null;
    }

    const los = findLosFromDate({
        tleRecord,
        groundStation,
        startDate: aos,
        searchMinutes,
        stepMinutes,
    });

    if (!los) {
        return null;
    }

    return buildVisibilityWindow({
        tleRecord,
        groundStation,
        aos,
        los,
        stepMinutes,
    });
}

// 過去方向に戻ってAOSを探す
function findAosFromCurrentPass({
    tleRecord,
    groundStation,
    startDate,
    searchMinutes,
    stepMinutes,
}: VisibilitySearchParams): Date | null {
    // startDate時点で既に可視中の場合、AOSは過去にある
    // TLEは任意時刻の衛星位置を推算できるため、過去方向に仰角を再計算して可視開始時刻を探す
    let firstVisibleDate = startDate;

    for (let i = stepMinutes; i <= searchMinutes; i += stepMinutes) {
        const calculatedAt = new Date(startDate.getTime() - i * 60 * 1000);

        const lookAngle = calculateLookAngle({
            tleRecord,
            groundStation,
            date: calculatedAt,
        });

        if (!isVisibleFromGroundStation(lookAngle)) {
            return firstVisibleDate;
        }

        firstVisibleDate = calculatedAt;
    }

    return null;
}

// 未来方向で次に仰角が0度を超える時刻を探す
function findNextAos({
    tleRecord,
    groundStation,
    startDate,
    searchMinutes,
    stepMinutes,
}: VisibilitySearchParams): Date | null {
    for (let i = 0; i <= searchMinutes; i += stepMinutes) {
        const calculatedAt = new Date(startDate.getTime() + i * 60 * 1000);

        const lookAngle = calculateLookAngle({
            tleRecord,
            groundStation,
            date: calculatedAt,
        });

        if (isVisibleFromGroundStation(lookAngle)) {
            return calculatedAt;
        }
    }

    return null;
}

// 可視開始後、未来方向で仰角が0度以下に戻る直前の時刻をLOSとして返す
function findLosFromDate({
    tleRecord,
    groundStation,
    startDate,
    searchMinutes,
    stepMinutes,
}: VisibilitySearchParams): Date | null {
    let lastVisibleDate: Date | null = null;

    for (let minute = 0; minute <= searchMinutes; minute += stepMinutes) {
        const calculatedAt = new Date(startDate.getTime() + minute * 60 * 1000);

        const lookAngle = calculateLookAngle({
            tleRecord,
            groundStation,
            date: calculatedAt,
        });

        if (!isVisibleFromGroundStation(lookAngle)) {
            return lastVisibleDate;
        }

        lastVisibleDate = calculatedAt;
    }

    return lastVisibleDate;
}

function buildVisibilityWindow({
    tleRecord,
    groundStation,
    aos,
    los,
    stepMinutes,
}: {
    tleRecord: TleRecord;
    groundStation: GroundStation;
    aos: Date;
    los: Date;
    stepMinutes: number;
}): VisibilityWindow {
    let maxElevationDeg = Number.NEGATIVE_INFINITY;

    for (
        let i = aos.getTime();
        i <= los.getTime();
        i += stepMinutes * 60 * 1000
    ) {
        const lookAngle = calculateLookAngle({
            tleRecord,
            groundStation,
            date: new Date(i),
        });

        if (!lookAngle) {
            continue;
        }

        maxElevationDeg = Math.max(maxElevationDeg, lookAngle.elevationDeg);
    }

    return {
        aos,
        los,
        maxElevationDeg,
        durationMinutes: differenceInMinutes(aos, los),
    };
}

function differenceInMinutes(startDate: Date, endDate: Date) {
    return Math.round((endDate.getTime() - startDate.getTime()) / 60_000);
}

function normalizeAzimuthDeg(degrees: number) {
    return (degrees + 360) % 360;
}

function floorToMinute(date: Date) {
    const flooredDate = new Date(date);
    flooredDate.setSeconds(0, 0);
    return flooredDate;
}