import { InMemoryCache } from '@apollo/client';

import { Query } from '../stubs/NormalQueryComponent';

const cache = new InMemoryCache();
cache.writeQuery({
  data: {
    todoList: [
      {
        description: 'Todo from cache',
        id: '1',
      },
    ],
  },
  query: Query,
});

export default cache;
