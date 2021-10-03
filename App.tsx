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

//https://cql-remote.herokuapp.com/

interface DecodedToken {
  user: number;
  iat: number;
  exp: number;
}

// const requestLink = new ApolloLink(
//   (operation, forward) =>
//     new Observable((observer) => {
//       let handle: any;
//       Promise.resolve(operation)
//         .then((operation) => {
//           SecureStore.getItemAsync("token").then((accessToken) => {
//             if (accessToken) {
//               console.log("Opertaion" + accessToken);
//               operation.setContext({
//                 headers: {
//                   authorization: `bearer ${accessToken}`,
//                 },
//               });
//             }
//           });
//         })
//         .then(() => {
//           console.log(operation.getContext().headers);
//           handle = forward(operation).subscribe({
//             next: observer.next.bind(observer),
//             error: observer.error.bind(observer),
//             complete: observer.complete.bind(observer),
//           });
//         })
//         .catch(observer.error.bind(observer));
//     })
// );

// const requestLink = new ApolloLink((operation, forward) => {
//   SecureStore.getItemAsync("token").then((token) => {
//     operation.setContext(() => ({
//       headers: {
//         authorization: token,
//       },
//     }));
//     return forward(operation);
//   });
//   return forward(operation);
// });

const requestLink = setContext(async (_, { headers }) => {
  const token = await SecureStore.getItemAsync("token");
  return {
    headers: {
      ...headers,
      authorization: "Bearer " + token,
    },
  };
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: "accessToken",
      isTokenValidOrUndefined: () => {
        SecureStore.getItemAsync("token").then((storedToken) => {
          if (storedToken) {
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
          }
        });
        return false;
      },
      fetchAccessToken: () => {
        return SecureStore.getItemAsync("token").then((token) => {
          return fetch(
            "https://cql-remote.herokuapp.com/refresh_mobile_token",
            {
              method: "POST",
              credentials: "include",
              headers: {
                authorization: "Bearer " + token,
              },
            }
          );
        });
      },
      handleFetch: (accessToken) => {
        SecureStore.setItemAsync("token", accessToken);
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
