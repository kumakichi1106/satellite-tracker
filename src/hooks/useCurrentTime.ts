import { useEffect, useState } from 'react';

// 一定間隔で現在時刻を更新するフック
export function useCurrentTime(intervalMs = 1000) {
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setCurrentTime(new Date());
    }, intervalMs);

    return () => {
      window.clearInterval(timerId);
    };
  }, [intervalMs]);

  return currentTime;
}