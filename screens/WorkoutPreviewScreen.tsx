import React from "react";
import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Spinner } from "../components/Spinner";
import { Text, View } from "../components/Themed";
import { useGetWorkoutQuery } from "../generated/graphql";
import { HomeStackNavProps } from "../types";
import tw from "twrnc";
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
      <Text style={tw`text-xl font-light text-gray-700 px-2`}>Description</Text>
      {data && data.getWorkout ? (
        <>
          <Text style={tw`text-lg px-2 text-gray-900`}>
            {data.getWorkout.description}
          </Text>
          <View style={tw`flex flex-row justify-between p-2`}>
            <Button
              title="Start Workout"
              onPress={() => {
                navigation.navigate("WorkoutTimer", {
                  sets: data.getWorkout.sets,
                  numSets: data.getWorkout.numSets,
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
