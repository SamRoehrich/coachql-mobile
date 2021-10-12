import { Text, View } from "../components/Themed";
import * as React from "react";
import { Button, StyleSheet, TextInput } from "react-native";
import { useLoginMutation, useMeLazyQuery } from "../generated/graphql";
import { token } from "../graphql/cache";

export default function AuthenticationScreen() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [login, { data, loading, client }] = useLoginMutation();
  const [me] = useMeLazyQuery();

  const handleLoginClick = async () => {
    const loginRes = await login({
      variables: {
        email,
        password,
      },
    });
    if (loginRes && loginRes.data && loginRes.data.login.accessToken) {
      console.log(loginRes.data.login.accessToken + "access token");
      token(loginRes.data.login.accessToken);
      me();
    }
  };
  if (loading) {
    return (
      <View>
        <Text> LOADING... </Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email Address</Text>
      <TextInput
        onChangeText={(email) => setEmail(email)}
        value={email}
        defaultValue={email}
        style={styles.input}
        keyboardType="email-address"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        onChangeText={(text) => setPassword(text)}
        value={password}
        defaultValue={password}
        style={styles.input}
        secureTextEntry={true}
      />
      <Button title="Sign In" onPress={handleLoginClick} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  label: {
    color: "black",
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
  input: {
    borderColor: "gray",
    borderRadius: 5,
    height: 40,
    borderWidth: 2,
    width: "80%",
  },
});
