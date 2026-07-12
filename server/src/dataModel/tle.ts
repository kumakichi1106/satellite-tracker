import type { TleGroupKey } from '../constants/tleGroups.js';

export type TleRecordResponse = {
  name: string;
  line1: string;
  line2: string;
};

export type TleRecordsResponse = {
  group: TleGroupKey;
  source: 'celestrak';
  fetchedAt: string;
  cached: boolean;
  records: TleRecordResponse[];
};