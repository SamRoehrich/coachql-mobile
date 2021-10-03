import * as React from "react";
import { Button, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, useThemeColor, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { useHelloQuery, useMeQuery } from "../generated/graphql";
import * as SecureStore from "expo-secure-store";
import { TextInput } from "react-native-gesture-handler";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const { data, loading } = useMeQuery();
  const [value, setValue] = React.useState("");
  const [token, setToken] = React.useState<string | null>("");

  React.useEffect(() => {
    SecureStore.getItemAsync("token").then((value) => setToken(value));
  }, [token, value]);

  const handleSubmit = () => {
    SecureStore.setItemAsync("token", value);
  };

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (data) {
    return (
      <View>
        <Text>{data.me?.firstName}</Text>
        <Button
          title="Log out"
          onPress={() => {
            SecureStore.setItemAsync("token", "");
          }}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <Button title="Submit" onPress={handleSubmit} />
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setValue(text);
        }}
      />
      <Text style={styles.title}>{token}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderColor: "blue",
    borderWidth: 1,
    height: 20,
    width: 40,
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
