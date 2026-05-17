import { useEffect, useState } from 'react';
import { DEFAULT_TLE_GROUP } from '../constants/celestrak';
import type { TleRecord } from '../dataModel/tle';
import { fetchTleRecords } from '../infrastructure/celestrakClient';

type UseTleRecordsState = {
  records: TleRecord[];
  isLoading: boolean;
  errorMessage: string | null;
};


export function useTleRecords(group = DEFAULT_TLE_GROUP): UseTleRecordsState {
  const [records, setRecords] = useState<TleRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // fetchをキャンセルするためのコントローラー
    const abortController = new AbortController();

    async function loadTleRecords() {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const nextRecords = await fetchTleRecords({
          group,
          signal: abortController.signal,
        });

        setRecords(nextRecords);
      } catch (error) {
        if (abortController.signal.aborted) {
          return;
        }

        setErrorMessage(error instanceof Error ? error.message : 'Failed to fetch TLE');
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadTleRecords();

    return () => {
      abortController.abort();
    };
  }, [group]);

  return { records, isLoading, errorMessage };
}
