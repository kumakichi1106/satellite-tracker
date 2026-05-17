// 通信しすぎると403になってしまうのでモックデータで開発をすすめる

// import { CELESTRAK_BASE_URL } from '../constants/celestrak';
// import type { TleRecord } from '../dataModel/tle';

// type FetchTleRecordsParams = {
//   group: string;
//   // fetchキャンセル用
//   signal?: AbortSignal;
// };

// // CelesTrakからTLEデータを取得する関数
// export async function fetchTleRecords({ group, signal }: FetchTleRecordsParams) {
//   const response = await fetch(setTleUrl(group), { signal });

//   if (!response.ok) {
//     throw new Error(`Failed to fetch TLE: ${response.status} ${response.statusText}`);
//   }

//   const tleText = await response.text();

//   return parseTleText(tleText);
// }
// // CelesTrakのURLに値をセット関数
// function setTleUrl(group: string) {
//   const url = new URL(CELESTRAK_BASE_URL);
//   console.log(CELESTRAK_BASE_URL)
//   url.searchParams.set('GROUP', group);
//   url.searchParams.set('FORMAT', 'tle');

//   return url.toString();
// }

// // TLEテキストをパースしてTleRecordの配列に変換する関数
// function parseTleText(tleText: string): TleRecord[] {
//   const records: TleRecord[] = [];

//   const lines = tleText
//     .split(/\r?\n/)
//     .map((line) => line.trim())
//     .filter(Boolean);



//   for (let index = 0; index < lines.length; index += 3) {
//     const [name, line1, line2] = lines.slice(index, index + 3);

//     if (!name || !line1 || !line2) {
//       continue;
//     }

//     records.push({ name, line1, line2 });
//   }

//   return records;
// }



import type { TleRecord } from '../dataModel/tle';

type FetchTleRecordsParams = {
  group?: string;
  signal?: AbortSignal;
};

const satellites: TleRecord[] = [
  {
    name: 'ISS (ZARYA)',
    line1: '1 25544U 98067A 26137.03684517 .00005133 00000+0 10043-3 0 9995',
    line2: '2 25544 51.6321 94.3035 0007556 67.0843 293.0943 15.49238964 566924',
  },
];

// 開発中はCelesTrakを直接叩かず、固定TLEを返す。
export async function fetchTleRecords(_params: FetchTleRecordsParams): Promise<TleRecord[]> {
  return satellites;
}
