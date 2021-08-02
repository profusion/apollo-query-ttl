import { Query } from '../stubs/NormalQueryComponent';

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
