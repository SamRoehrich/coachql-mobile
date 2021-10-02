import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  HttpLink,
  InMemoryCache,
  Observable,
} from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { setContext } from "@apollo/client/link/context";
import * as SecureStore from "expo-secure-store";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwt_decode from "jwt-decode";
import { getToken, setToken } from "./utils/accessToken";

//https://cql-remote.herokuapp.com/

interface DecodedToken {
  user: number;
  iat: number;
  exp: number;
}

const httpLink = createHttpLink({
  uri: "https://cql-remote.herokuapp.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return (
      <SafeAreaProvider>
        <Text> Loading </Text>
      </SafeAreaProvider>
    );
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </ApolloProvider>
      </SafeAreaProvider>
    );
  }
}
