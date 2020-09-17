import React from 'react'
import { InMemoryCache,ApolloProvider as Provider,split,HttpLink } from '@apollo/client';
import {ApolloClient} from 'apollo-client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';


const httpLink = new HttpLink({
  uri: `http://localhost:4000/graphql`,
  credentials: "include",
});


const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  onError: ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
  }

});


export default function ApolloProvider(props){
    return <Provider client={client }{...props}/>
}