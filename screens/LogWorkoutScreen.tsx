import React from "react";
import { Button, SafeAreaView, TextInput } from "react-native";
import { Text } from "../components/Themed";
import { useLogWorkoutMutation } from "../generated/graphql";
import { HomeStackNavProps } from "../types";

const LogWorkoutScreen = ({
  route,
  navigation,
}: HomeStackNavProps<"LogWorkout">) => {
  const [logSession, { data, loading }] = useLogWorkoutMutation();
  const [percentCompleted, setPercentCompleted] = React.useState<string>("");
  const [rpe, setRpe] = React.useState<string>("");
  const [notes, setNotes] = React.useState<string>("");
  return (
    <SafeAreaView>
      <Text>Log Workout</Text>
      <Text>Percent Completed</Text>
      <TextInput
        onChangeText={(value) => setPercentCompleted(value)}
        value={percentCompleted}
      />
      <Text>RPE</Text>
      <TextInput onChangeText={(value) => setRpe(value)} value={rpe} />
      <Text>Notes</Text>
      <TextInput onChangeText={(value) => setNotes(value)} value={notes} />

      <Button
        title="Submit"
        onPress={async () => {
          const logRes = await logSession({
            variables: {
              workoutId: route.params.id,
              percentCompleted: Number.parseInt(percentCompleted),
              rpe: Number.parseInt(rpe),
              notes,
            },
          });
          if (logRes) {
            navigation.navigate("Workouts");
          }
        }}
      />
    </SafeAreaView>
  );
};

export default LogWorkoutScreen;
