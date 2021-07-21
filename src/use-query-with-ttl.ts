import {
  DocumentNode,
  QueryHookOptions,
  useQuery,
  QueryResult,
  OperationVariables,
  QueryTuple,
} from '@apollo/client';

import useTTL from './use-ttl';

interface UseQueryWithTTLParams<TData, TVariables> {
  query: DocumentNode;
  queryOptions?: QueryHookOptions<TData, TVariables>;
  ttl: number;
}

export type HookWithTTLFunction<QType = ''> = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TData = any,
  TVariables = OperationVariables,
>(
  params: UseQueryWithTTLParams<TData, TVariables>,
) => QType extends 'lazy'
  ? QueryTuple<TData, TVariables>
  : QueryResult<TData, TVariables>;

const useQueryWithTTL: HookWithTTLFunction = ({
  query,
  ttl,
  queryOptions = {},
}) => {
  const [isExpired, refreshTtl] = useTTL(ttl);
  const fetchPolicy = isExpired ? 'network-only' : 'cache-first';
  return useQuery(query, {
    ...queryOptions,
    fetchPolicy,
    onCompleted: data => {
      refreshTtl();
      if (queryOptions?.onCompleted) {
        queryOptions.onCompleted(data);
      }
    },
  });
};

export default useQueryWithTTL;
