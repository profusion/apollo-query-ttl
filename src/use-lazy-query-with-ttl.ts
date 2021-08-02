import { useLazyQuery } from '@apollo/client';

import useTTL from './use-ttl';

import type { HookWithTTLFunction } from './use-query-with-ttl';

const useLazyQueryWithTTL: HookWithTTLFunction<'lazy'> = ({
  query,
  ttl,
  queryOptions = {},
}) => {
  const [isExpired, refreshTtl] = useTTL(ttl);
  const fetchPolicy = isExpired ? 'network-only' : 'cache-first';
  return useLazyQuery(query, {
    ...queryOptions,
    fetchPolicy,
    onCompleted: data => {
      refreshTtl();
      if (queryOptions.onCompleted) {
        queryOptions.onCompleted(data);
      }
    },
  });
};

export default useLazyQueryWithTTL;
