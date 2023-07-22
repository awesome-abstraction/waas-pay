import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import config from "../config";

const client = new ApolloClient({
  uri: config.apiUrl,
  cache: new InMemoryCache(),
});

export const WithApolloClient = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default client;
