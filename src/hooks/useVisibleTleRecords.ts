import { useMemo } from 'react';
import type { TleRecord } from '../dataModel/tle';

const DEFAULT_VISIBLE_TLE_RECORD_LIMIT = 100;

type UseVisibleTleRecordsParams = {
  records: TleRecord[];
  searchText: string;
  limit?: number;
};

type UseVisibleTleRecordsResult = {
  visibleRecords: TleRecord[];
  filteredRecordCount: number;
  totalRecordCount: number;
  visibleRecordLimit: number;
};

export function useVisibleTleRecords({
  records,
  searchText,
  limit = DEFAULT_VISIBLE_TLE_RECORD_LIMIT,
}: UseVisibleTleRecordsParams): UseVisibleTleRecordsResult {
  const filteredRecords = useMemo(() => {
    const normalizedSearchText = searchText.trim().toLowerCase();

    if (!normalizedSearchText) {
      return records;
    }

    return records.filter((record) =>
      record.name.toLowerCase().includes(normalizedSearchText),
    );
  }, [records, searchText]);

  const visibleRecords = useMemo(
    () => filteredRecords.slice(0, limit),
    [filteredRecords, limit],
  );

  return {
    visibleRecords,
    filteredRecordCount: filteredRecords.length,
    totalRecordCount: records.length,
    visibleRecordLimit: limit,
  };
}