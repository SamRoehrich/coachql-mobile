import { HomeStackNavProps } from "../types";
import React from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";

const WorkoutTypeSelection = ({
  navigation,
}: HomeStackNavProps<"Workouts">) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Workouts", {
              type: "Strength and Power",
            });
          }}
        >
          <Text style={styles.text}>Strength and Power</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Workouts", {
              type: "Anaerobic Capacity",
            });
          }}
        >
          <Text style={styles.text}>Anaerobic Capacity</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Workouts", {
              type: "Anaerobic Power",
            });
          }}
        >
          <Text style={styles.text}>Anaerobic Power</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Workouts", {
              type: "Aerobic Capacity",
            });
          }}
        >
          <Text style={styles.text}>Aerobic Capacity</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Workouts", {
              type: "Aerobic Power",
            });
          }}
        >
          <Text style={styles.text}>Areobic Power</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Workouts", {
              type: "Conditioning",
            });
          }}
        >
          <Text style={styles.text}>Conditioning</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Mobility and Flexability</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkoutTypeSelection;

const styles = StyleSheet.create({
  button: {
    height: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    lineHeight: 32,
  },
  container: {
    height: "100%",
  },
});
