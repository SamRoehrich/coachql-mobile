import * as SecureStore from "expo-secure-store";

export function getAccessToken(): string | null {
  return null;
}

export async function setAccessToken(token: string) {
  SecureStore.setItemAsync("token", token)
    .then((data) => console.log(data))
    .finally(() => console.log("token set"));
}
