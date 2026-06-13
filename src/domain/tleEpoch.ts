import type { TleEpochInfo } from '../dataModel/tleEpoch';

const TLE_EPOCH_START_INDEX = 18;
const TLE_EPOCH_END_INDEX = 32;
const TLE_EPOCH_YEAR_THRESHOLD = 57;

export function parseTleEpoch(line1: string): Date | null {
    const epochText = line1.slice(TLE_EPOCH_START_INDEX, TLE_EPOCH_END_INDEX).trim();

    if (!/^\d{5}\.\d+$/.test(epochText)) {
        return null;
    }

    const yearText = epochText.slice(0, 2);
    const dayOfYearText = epochText.slice(2);

    const year = Number(yearText);
    const dayOfYear = Number(dayOfYearText);

    if (!Number.isFinite(year) || !Number.isFinite(dayOfYear)) {
        return null;
    }

    const fullYear =
        year < TLE_EPOCH_YEAR_THRESHOLD ? 2000 + year : 1900 + year;

    const startOfYear = Date.UTC(fullYear, 0, 1, 0, 0, 0, 0);
    const epochTime = startOfYear + (dayOfYear - 1) * 24 * 60 * 60 * 1000;

    return new Date(epochTime);
}

export function calculateTleAgeMinutes(epoch: Date, now = new Date()): number {
    return Math.floor((now.getTime() - epoch.getTime()) / 60_000);
}

export function getTleEpochInfo(
    line1: string,
    now = new Date(),
): TleEpochInfo | null {
    const epoch = parseTleEpoch(line1);

    if (!epoch) {
        return null;
    }

    return {
        epoch,
        ageMinutes: calculateTleAgeMinutes(epoch, now),
    };
}