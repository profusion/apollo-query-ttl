import { useCallback, useRef } from 'react';

const useTTL = (ttlInMilliseconds: number): [boolean, () => void] => {
  const initialMs = useRef(Date.now());
  const finalMs = initialMs.current + ttlInMilliseconds;

  const refreshTtl = useCallback(() => {
    initialMs.current = Date.now();
  }, []);

  const isExpired = Date.now() > finalMs;
  return [isExpired, refreshTtl];
};

export default useTTL;
