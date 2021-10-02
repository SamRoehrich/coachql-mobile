import * as SecureStore from "expo-secure-store";

export function getAccessToken() {
  let token = "";

  SecureStore.getItemAsync("token")
    .then((data) => {
      if (data) {
        token = data;
      } else {
        return null;
      }
    })
    .finally(() => console.log("got token"));
  if (token) {
    return token;
  } else {
    return null;
  }
}

export async function setAccessToken(token: string) {
  SecureStore.setItemAsync("token", token)
    .then((data) => console.log(data))
    .finally(() => console.log("token set"));
}

let token = "";

export function getToken() {
  return token;
}

export function setToken(s: string) {
  token = s;
}
