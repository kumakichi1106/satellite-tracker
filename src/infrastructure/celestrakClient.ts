import { CELESTRAK_BASE_URL } from '../constants/celestrak';
import { TleGroupKey } from '../constants/tleGroups';
import type { TleRecord } from '../dataModel/tle';
import { mockTleRecordsByGroup } from './mockTleRecords';

// CelesTrakは短時間の過剰アクセスでIP制限されるため、開発中はモックTLEを使用
const USE_MOCK_TLE = true;

type FetchTleRecordsParams = {
  group: TleGroupKey;
  // fetchキャンセル用
  signal?: AbortSignal;
};

// CelesTrakからTLEデータを取得する関数
export async function fetchTleRecords({
  group, signal,
}: FetchTleRecordsParams): Promise<TleRecord[]> {
  if (USE_MOCK_TLE) {
    return mockTleRecordsByGroup[group];
  }
  
  const response = await fetch(setTleUrl(group), { signal });

  if (!response.ok) {
    throw new Error(`Failed to fetch TLE: ${response.status} ${response.statusText}`);
  }

  const tleText = await response.text();

  return parseTleText(tleText);
}

function setTleUrl(group: string) {
  const url = new URL(CELESTRAK_BASE_URL);
  url.searchParams.set('GROUP', group);
  url.searchParams.set('FORMAT', 'tle');

  return url.toString();
}

// TLEテキストをパースしてTleRecordの配列に変換する関数
function parseTleText(tleText: string): TleRecord[] {
  const records: TleRecord[] = [];

  const lines = tleText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  for (let index = 0; index < lines.length; index += 3) {
    const [name, line1, line2] = lines.slice(index, index + 3);

    if (!name || !line1 || !line2) {
      continue;
    }

    records.push({ name, line1, line2 });
  }

  return records;
}

