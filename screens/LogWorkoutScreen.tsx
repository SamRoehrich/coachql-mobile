import React from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "../components/Themed";
import { useLogWorkoutMutation } from "../generated/graphql";
import { HomeStackNavProps } from "../types";

const LogWorkoutScreen = ({
  route,
  navigation,
}: HomeStackNavProps<"LogWorkout">) => {
  const [logSession, { data, loading }] = useLogWorkoutMutation();
  const [percentCompleted, setPercentCompleted] = React.useState<number>(0);
  const [rpe, setRpe] = React.useState<string>("");
  const [notes, setNotes] = React.useState<string>("");
  return (
    <SafeAreaView>
      <Text style={styles.headerText}>Log Workout - {route.params.name}</Text>
      <View style={styles.buttonContainer}>
        <Text style={styles.headerText}>Percent Completed</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={
              percentCompleted === 25 ? styles.buttonSelected : styles.button
            }
            onPress={() => setPercentCompleted(25)}
          >
            <Text style={styles.buttonText}>25</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setPercentCompleted(50)}
            style={
              percentCompleted === 50 ? styles.buttonSelected : styles.button
            }
          >
            <Text style={styles.buttonText}>50</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              percentCompleted === 75 ? styles.buttonSelected : styles.button
            }
            onPress={() => setPercentCompleted(75)}
          >
            <Text style={styles.buttonText}>75</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              percentCompleted === 100 ? styles.buttonSelected : styles.button
            }
            onPress={() => setPercentCompleted(100)}
          >
            <Text style={styles.buttonText}>100</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.headerText}>RPE</Text>
        <TextInput
          onChangeText={(value) => setRpe(value)}
          value={rpe}
          keyboardType="number-pad"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.headerText}>Notes</Text>
        <TextInput
          onChangeText={(value) => setNotes(value)}
          value={notes}
          multiline={true}
          numberOfLines={5}
        />
      </View>

      <Button
        title="Submit"
        onPress={async () => {
          const logRes = await logSession({
            variables: {
              workoutId: route.params.id,
              percentCompleted,
              rpe: Number.parseInt(rpe),
              notes,
            },
          });
          if (logRes) {
            navigation.navigate("WorkoutTypeSelection");
          }
        }}
      />
    </SafeAreaView>
  );
};

export default LogWorkoutScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 8,
  },
  headerText: {
    fontWeight: "500",
    lineHeight: 32,
    fontSize: 24,
    padding: 32,
  },
  percentContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonText: {
    lineHeight: 32,
    fontSize: 24,
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
  },
  buttonSelected: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    borderColor: "blue",
    borderWidth: 2,
    borderRadius: 2,
  },
});
