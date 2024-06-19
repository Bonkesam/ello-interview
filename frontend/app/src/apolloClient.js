import { ApolloClient, InMemoryCache } from '@apollo/client';
// Remove the following line if not used:
// import { gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://your-graphql-endpoint.com/graphql',
  cache: new InMemoryCache()
});

export default client;
