import { HomeStackNavProps } from "../types";
import tw from "twrnc";
import React from "react";
import { SafeAreaView, TouchableOpacity, Text } from "react-native";

const WorkoutTypeSelection = ({
  navigation,
}: HomeStackNavProps<"Workouts">) => {
  return (
    <SafeAreaView style={tw`h-full`}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Workouts", {
            type: "Strength and Power",
          });
        }}
      >
        <Text>Strength and Power</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Workouts", {
            type: "Anaerobic Capacity",
          });
        }}
      >
        <Text>Anaerobic Capacity</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Workouts", {
            type: "Anaerobic Power",
          });
        }}
      >
        <Text>Anaerobic Power</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Workouts", {
            type: "Aerobic Capacity",
          });
        }}
      >
        <Text>Aerobic Capacity</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Workouts", {
            type: "Aerobic Power",
          });
        }}
      >
        <Text>Areobic Power</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Workouts", {
            type: "Conditioning",
          });
        }}
      >
        <Text>Conditioning</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Mobility and Flexability</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WorkoutTypeSelection;
