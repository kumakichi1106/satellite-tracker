import { useEffect, useState } from 'react';

// 現在時刻を返すフック
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