import React from 'react';
import { gql } from '@apollo/client';

import useQueryWithTTL from '../../src/use-query-with-ttl';

export const Query = gql`
  query Todos {
    todoList {
      id
      description
    }
  }
`;

const Constants = {
  hookParams: {
    query: Query,
    ttl: 100,
  },
};

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
