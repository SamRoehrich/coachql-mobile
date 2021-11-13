import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeStackNavProps } from "../types";
import { Text, View } from "./Themed";
import { StyleSheet } from "react-native";

const Dashboard = ({ navigation }: HomeStackNavProps<"Dashboard">) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("WorkoutTypeSelection");
        }}
      >
        <View>
          <Text style={styles.text}>Workouts</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <View>
          <Text style={styles.text}>Notes</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <View>
          <Text style={styles.text}>Training History</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <View>
          <Text style={styles.text}>Calendar</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    display: "flex",
    justifyContent: "space-around",
    padding: 16,
    paddingTop: 10,
  },
  button: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    paddingHorizontal: 16,
    fontSize: 24,
    lineHeight: 32,
  },
});
