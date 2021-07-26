import { renderHook } from '@testing-library/react-hooks';

import useTTL from '../src/use-ttl';

describe('useTTL hook', () => {
  afterEach(() => jest.clearAllTimers());

  it('should properly handle TTL status - expired/non expired', async () => {
    jest.useFakeTimers();

    const { result, rerender } = renderHook(() => useTTL(100));
    expect(result.current[0]).toBe(false);
    jest.advanceTimersByTime(110);
    rerender();
    expect(result.current[0]).toBe(true);
    result.current[1]();
    rerender();
    expect(result.current[0]).toBe(false);
  });
});
