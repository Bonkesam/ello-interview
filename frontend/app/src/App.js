import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Hero from './components/Home';

const client = new ApolloClient({
  uri: 'http://localhost:4000', 
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className='bg-[#FFFFFF]'>
        <Hero />
      </div>
    </ApolloProvider>
  );
}

export default App;
