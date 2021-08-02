import { Query } from '../stubs/shared';

const mock = [
  {
    request: {
      query: Query,
    },
    result: {
      data: {
        todoList: [
          {
            description: 'Todo from server',
            id: '1',
          },
        ],
      },
    },
  },
];

export default mock;
