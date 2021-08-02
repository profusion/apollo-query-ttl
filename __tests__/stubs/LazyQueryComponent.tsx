import React from 'react';

import useLazyQueryWithTTL from '../../src/use-lazy-query-with-ttl';
import { Constants } from './shared';

interface LazyQueryComponentProps {
  onCompleted?: () => void;
}

const LazyQueryComponent = ({
  onCompleted,
}: LazyQueryComponentProps): JSX.Element => {
  const [fetch, { data, loading, refetch }] = useLazyQueryWithTTL({
    ...Constants.hookParams,
    queryOptions: onCompleted ? { onCompleted } : undefined,
  });
  return (
    <React.Fragment>
      <pre>{JSON.stringify({ data, loading })}</pre>
      <button data-testid="fetch-button" onClick={(): void => fetch()}>
        Fetch
      </button>
      <button
        data-testid="refetch-button"
        onClick={(): void => {
          if (refetch) refetch();
        }}
      >
        Refetch
      </button>
    </React.Fragment>
  );
};

export default LazyQueryComponent;
