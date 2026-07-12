import type { TleGroupKey } from '../constants/tleGroups.js';

const CELESTRAK_URL = 'https://celestrak.org/NORAD/elements/gp.php';

type FetchTleTextParams = {
    group: TleGroupKey;
    signal?: AbortSignal;
};

export async function fetchTleText({
    group,
    signal,
}: FetchTleTextParams): Promise<string> {
    const url = new URL(CELESTRAK_URL);

    url.searchParams.set('GROUP', group);
    url.searchParams.set('FORMAT', 'tle');

    const response = await fetch(url, { signal });

    if (!response.ok) {
        throw new Error(`Failed to fetch TLE: ${response.status} ${response.statusText}`);
    }

    return response.text();
}