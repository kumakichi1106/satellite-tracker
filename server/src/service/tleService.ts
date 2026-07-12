import type { TleGroupKey } from '../constants/tleGroups.js';
import type { TleRecordsResponse } from '../dataModel/tle.js';
import { parseTleText } from '../domain/parseTleText.js';
import { fetchTleText } from '../infrastructure/celestrakClient.js';
import { getTleCache, setTleCache } from '../infrastructure/tleCache.js';

type GetTleRecordsParams = {
    group: TleGroupKey;
    signal?: AbortSignal;
};

export async function getTleRecords({
    group,
    signal,
}: GetTleRecordsParams): Promise<TleRecordsResponse> {
    const cache = getTleCache(group);

    if (cache) {
        return {
            group,
            source: 'celestrak',
            fetchedAt: cache.fetchedAt,
            cached: true,
            records: cache.records,
        };
    }
    const tleText = await fetchTleText({ group, signal });
    const records = parseTleText(tleText);
    const fetchedAt = new Date().toISOString();

    setTleCache({
        group,
        records,
        fetchedAt,
    });

    return {
        group,
        source: 'celestrak',
        fetchedAt: new Date().toISOString(),
        cached: false,
        records,
    };
}