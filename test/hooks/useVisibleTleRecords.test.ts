import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useVisibleTleRecords } from '../../src/hooks/useVisibleTleRecords';
import type { TleRecord } from '../../src/dataModel/tle';

const records: TleRecord[] = [
  {
    name: 'ISS (ZARYA)',
    line1: '1 25544U 98067A   26140.52007258  .00005164  00000+0  10084-3 0  9993',
    line2: '2 25544  51.6328  77.0641 0007497  79.3410 280.8422 15.49283153567468',
  },
  {
    name: 'GPS BIII-1 (PRN 04)',
    line1: '1 43873U 18109A   26140.28832900  .00000011  00000+0  00000+0 0  9999',
    line2: '2 43873  55.6661  93.2866 0037942 198.6197 301.0092  2.00560163 54519',
  },
  {
    name: 'GPS BIII-2 (PRN 18)',
    line1: '1 44506U 19056A   26140.82786065 -.00000077  00000+0  00000+0 0  9998',
    line2: '2 44506  55.6503 332.2294 0060640 197.3789 234.7170  2.00569187 49522',
  },
  {
    name: 'NOAA 20 (JPSS-1)',
    line1: '1 43013U 17073A   26141.21646093  .00000052  00000+0  45436-4 0  9996',
    line2: '2 43013  98.7764  80.9203 0001233  42.6389 317.4882 14.19506117440643',
  },
];

describe('useVisibleTleRecords', () => {
  it('検索文字が空の場合は先頭から表示上限件数だけ返す', () => {
    const { result } = renderHook(() =>
      useVisibleTleRecords({
        records,
        searchText: '',
        limit: 2,
      }),
    );

    expect(result.current.visibleRecords).toHaveLength(2);
    expect(result.current.visibleRecords.map((record) => record.name)).toEqual([
      'ISS (ZARYA)',
      'GPS BIII-1 (PRN 04)',
    ]);
    expect(result.current.filteredRecordCount).toBe(4);
    expect(result.current.totalRecordCount).toBe(4);
    expect(result.current.visibleRecordLimit).toBe(2);
  });

  it('衛星名で検索できる', () => {
    const { result } = renderHook(() =>
      useVisibleTleRecords({
        records,
        searchText: 'GPS',
        limit: 10,
      }),
    );

    expect(result.current.visibleRecords.map((record) => record.name)).toEqual([
      'GPS BIII-1 (PRN 04)',
      'GPS BIII-2 (PRN 18)',
    ]);
    expect(result.current.filteredRecordCount).toBe(2);
    expect(result.current.totalRecordCount).toBe(4);
  });

  it('検索は大文字小文字を区別しない', () => {
    const { result } = renderHook(() =>
      useVisibleTleRecords({
        records,
        searchText: 'noaa',
        limit: 10,
      }),
    );

    expect(result.current.visibleRecords).toHaveLength(1);
    expect(result.current.visibleRecords[0]?.name).toBe('NOAA 20 (JPSS-1)');
  });

  it('検索結果が表示上限を超える場合は先頭から上限件数だけ返す', () => {
    const { result } = renderHook(() =>
      useVisibleTleRecords({
        records,
        searchText: 'GPS',
        limit: 1,
      }),
    );

    expect(result.current.visibleRecords).toHaveLength(1);
    expect(result.current.visibleRecords[0]?.name).toBe('GPS BIII-1 (PRN 04)');
    expect(result.current.filteredRecordCount).toBe(2);
    expect(result.current.visibleRecordLimit).toBe(1);
  });

  it('検索文字の前後空白を無視する', () => {
    const { result } = renderHook(() =>
      useVisibleTleRecords({
        records,
        searchText: '  ISS  ',
        limit: 10,
      }),
    );

    expect(result.current.visibleRecords).toHaveLength(1);
    expect(result.current.visibleRecords[0]?.name).toBe('ISS (ZARYA)');
  });
});