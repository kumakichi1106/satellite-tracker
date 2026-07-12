import type { TleGroupKey } from '../constants/tleGroups.js';
import type { TleRecordResponse } from '../dataModel/tle.js';

type TleCacheEntry = {
    records: TleRecordResponse[];
    fetchedAt: string;
    expiresAt: number;
};

const TLE_CACHE_TTL_MS = 2 * 60 * 60 * 1000;

// Node.jsプロセスのメモリ上にTLEキャッシュを保持する。
const tleCache = new Map<TleGroupKey, TleCacheEntry>();

export function getTleCache(group: TleGroupKey): TleCacheEntry | null {
    const cache = tleCache.get(group);

    if (!cache) {
        return null;
    }

    if (Date.now() > cache.expiresAt) {
        tleCache.delete(group);
        return null;
    }

    return cache;
}

export function setTleCache({
    group,
    records,
    fetchedAt,
}: {
    group: TleGroupKey;
    records: TleRecordResponse[];
    fetchedAt: string;
}) {
    tleCache.set(group, {
        records,
        fetchedAt,
        expiresAt: Date.now() + TLE_CACHE_TTL_MS,
    });
}