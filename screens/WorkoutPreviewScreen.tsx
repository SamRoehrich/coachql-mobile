import React from "react";
import { Button, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Spinner } from "../components/Spinner";
import { Text, View } from "../components/Themed";
import { useGetWorkoutQuery } from "../generated/graphql";
import { HomeStackNavProps } from "../types";
const WorkoutPreviewScreen = ({
  navigation,
  route,
}: HomeStackNavProps<"Workout">) => {
  const { data, loading } = useGetWorkoutQuery({
    variables: {
      workoutId: route.params.id,
    },
  });
  if (loading) {
    return <Spinner />;
  }
  return (
    <SafeAreaView>
      <Text style={styles.text}>Description</Text>
      {data && data.getWorkout ? (
        <>
          <Text style={styles.text}>{data.getWorkout.description}</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Start Workout"
              onPress={() => {
                navigation.navigate("WorkoutTimer", {
                  sets: data.getWorkout.sets,
                  numSets: data.getWorkout.numSets,
                  workoutName: data.getWorkout.name,
                  id: data.getWorkout.id,
                });
              }}
            />
            <Button
              title="Log Workout"
              onPress={() => {
                navigation.navigate("LogWorkout", {
                  id: route.params.id,
                  name: route.params.name,
                });
              }}
            />
          </View>
        </>
      ) : (
        <>
          <Text>
            Could not load the workout from the server. Close the app and try
            again.
          </Text>
        </>
      )}
    </SafeAreaView>
  );
};

export default WorkoutPreviewScreen;

const styles = StyleSheet.create({
  text: {
    lineHeight: 32,
    fontSize: 24,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
  },
});
