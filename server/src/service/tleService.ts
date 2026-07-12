import type { TleGroupKey } from '../constants/tleGroups.js';
import type { TleRecordsResponse } from '../dataModel/tle.js';
import { parseTleText } from '../domain/parseTleText.js';
import { fetchTleText } from '../infrastructure/celestrakClient.js';

type GetTleRecordsParams = {
    group: TleGroupKey;
    signal?: AbortSignal;
};

export async function getTleRecords({
    group,
    signal,
}: GetTleRecordsParams): Promise<TleRecordsResponse> {
    const tleText = await fetchTleText({ group, signal });
    const records = parseTleText(tleText);
    return {
        group,
        source: 'celestrak',
        fetchedAt: new Date().toISOString(),
        cached: false,
        records,
    };

}