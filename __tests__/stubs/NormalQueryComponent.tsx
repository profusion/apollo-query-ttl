import React from 'react';

import useQueryWithTTL from '../../src/use-query-with-ttl';

import { Constants } from './shared';

interface NormalQueryComponentProps {
  onCompleted?: () => void;
}

const NormalQueryComponent = ({
  onCompleted,
}: NormalQueryComponentProps): JSX.Element => {
  const { data, loading } = useQueryWithTTL({
    ...Constants.hookParams,
    queryOptions: onCompleted ? { onCompleted } : undefined,
  });
  return <React.Fragment>{JSON.stringify({ data, loading })}</React.Fragment>;
};

export default NormalQueryComponent;
