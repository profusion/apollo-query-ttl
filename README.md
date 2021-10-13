# Apollo Queries With TTL

This project provides an implementation of Apollo Hook Queries (useQuery and useLazyQuery) with a TTL (Time To Live) for cache hits.

These hooks are useful when you want to control how long your queries can fetch data from cache. In another words, you can provide a TTL in miliseconds to the hook,
it will use the `cache-first` fetch policy until the TTL time expires, the next fetch after expiration will use a `network-only` policy, then, the TTL will be applied again.

Check Apollo Client docs about fetch policy, [here](https://www.apollographql.com/docs/react/data/queries/#supported-fetch-policies)

# Instalattion

```bash
$ npm i @profusion/apollo-query-ttl

$ yarn add @profusion/apollo-query-ttl
```

# Hooks

This lib exports two hooks:

- `useQueryWithTTL`: wraps Apollo's useQuery hook with TTL logic

Usage:

```ts
const QUERY = gql`
  query ContinentsQuery {
    data {
      id
      payload
    }
  }
`;

const TryQueryTTL = (): JSX.Element => {
  const { data } = useQueryWithTTL({
    query,
    queryOptions: {}, // you can provide all the options available on useQuery
    ttl: 10000, // it will allow cache hits for 10 seconds
  });

  return (
    <pre>
      {JSON.stringify(data)}
    </pre>
  )
}
```

- `useLazyQueryWithTTL`: wraps Apollo's useLazyQuery hook with TTL logic

Usage:

```ts
const QUERY = gql`
  query ContinentsQuery {
    data {
      id
      payload
    }
  }
`;

const TryQueryTTL = (): JSX.Element => {
  const [fetch, { data }] = useLazyQueryWithTTL({
    query,
    queryOptions: {}, // you can provide all the options available on useQuery
    ttl: 10000, // it will allow cache hits for 10 seconds
  });

  return (
    <div>
      <pre>
        {JSON.stringify(data)}
      </pre>
      <button onClick={fetch}>Fetch!</button>
    </div>
  )
}
```

# Typing the data

You can type your `data` and variables in the same way you do on default queries:

```ts
interface DataType {}
interface VariablesType {}

const { data } = useQueryWithTTL<DataType, VariablesType>({
  query,
  queryOptions: {
    variables: {},
  },
  ttl: 10000,
});

// data and queryOptions.variables will be
// typed as DataType and VariablesType, respectivelly
```
