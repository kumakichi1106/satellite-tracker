import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useCurrentTime } from '../../src/hooks/useCurrentTime';

describe('useCurrentTime', () => {
  it('指定した間隔で現在時刻を更新する', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-05-21T00:00:00.000Z'));

    const { result } = renderHook(() => useCurrentTime(1000));

    expect(result.current.toISOString()).toBe('2026-05-21T00:00:00.000Z');

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.toISOString()).toBe('2026-05-21T00:00:01.000Z');

    vi.useRealTimers();
  });
});