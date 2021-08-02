import { gql } from '@apollo/client';

export const Query = gql`
  query Todos {
    todoList {
      id
      description
    }
  }
`;

export const Constants = {
  hookParams: {
    query: Query,
    ttl: 100,
  },
};
