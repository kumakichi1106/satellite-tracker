import type { TleGroupKey } from '../constants/tleGroups.js';
import type { TleRecordResponse } from '../dataModel/tle.js';
import { parseTleText } from '../domain/parseTleText.js';
import { fetchTleText } from '../infrastructure/celestrakClient.js';

type GetTleRecordsParams = {
    group: TleGroupKey;
    signal?: AbortSignal;
};

export async function getTleRecords({
    group,
    signal,
}: GetTleRecordsParams): Promise<TleRecordResponse[]> {
    const tleText = await fetchTleText({ group, signal });

    return parseTleText(tleText);
}