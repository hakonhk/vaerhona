import fetch from "isomorphic-unfetch";
import { HttpLink, InMemoryCache, ApolloClient } from "apollo-boost";

let apolloClient = null;

// Determine the api path
let apiUri;
if (typeof window !== "undefined") {
  apiUri = location.origin;
} else if (
  typeof process !== "undefined" &&
  process.env &&
  process.env.APP_PORT
) {
  apiUri = "http://localhost:" + process.env.APP_PORT;
}

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

function create(initialState) {
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri: `${apiUri}/api/graphql`,
      credentials: "same-origin" // Additional fetch() options like `credentials` or `headers`
    }),
    cache: new InMemoryCache().restore(initialState || {})
  });
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}