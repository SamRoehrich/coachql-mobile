import * as React from "react";
import { Button, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { useLogoutMutation } from "../generated/graphql";

import * as SecureStore from "expo-secure-store";

export default function TabTwoScreen() {
  const [logout] = useLogoutMutation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button
        title="Log Out"
        onPress={async () => {
          await logout();
          await SecureStore.setItemAsync("token", "");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
