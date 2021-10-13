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
import { getAccessToken, setAccessToken } from "./utils/accessToken";
import { token } from "./graphql/cache";

//https://cql-remote.herokuapp.com/

interface DecodedToken {
  user: number;
  iat: number;
  exp: number;
}

const requestLink = setContext(async (_, { headers }) => {
  const accessToken = token();
  return {
    headers: {
      ...headers,
      authorization: "Bearer " + accessToken,
    },
  };
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        token: {
          read() {
            return token;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  link: ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: "accessToken",
      isTokenValidOrUndefined: () => {
        const storedToken = token();
        if (!storedToken) {
          return true;
        }
        try {
          const { exp } = jwt_decode<DecodedToken>(storedToken);
          if (Date.now() >= exp * 1000) {
            return false;
          } else {
            return true;
          }
        } catch {
          return false;
        }
      },
      fetchAccessToken: async () => {
        const accessToken = token();
        return fetch("https://cql-remote.herokuapp.com/refresh_mobile_token", {
          method: "POST",
          credentials: "include",
          headers: {
            authorization: "Bearer " + accessToken,
          },
        });
      },
      handleFetch: (accessToken) => {
        token(accessToken);
      },
      handleError: (err) => {
        console.warn("Your refresh token is invalid. Try to relogin");
        console.error(err);
      },
    }),
    // onError((ev) => {
    //   console.log(ev)
    // }),
    requestLink,
    new HttpLink({
      uri: "https://cql-remote.herokuapp.com/graphql",
      credentials: "include",
    }),
  ]),
  cache,
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
