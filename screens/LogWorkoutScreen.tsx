import React from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import HideKeyboard from "../components/HideKeyboard";
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
    <HideKeyboard>
      <SafeAreaView style={styles.container}>
        <Text style={styles.headerText}>Log Workout - {route.params.name}</Text>
        <View style={styles.percentContainer}>
          <Text style={styles.headerText}>Percent Completed</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={
                percentCompleted === 0 ? styles.buttonSelected : styles.button
              }
              onPress={() => setPercentCompleted(0)}
            >
              <Text style={styles.buttonText}>0</Text>
            </TouchableOpacity>
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
            style={styles.rpeInput}
          />
        </View>
        <View style={styles.notesContainer}>
          <Text style={styles.headerText}>Notes</Text>
          <TextInput
            onChangeText={(value) => setNotes(value)}
            value={notes}
            multiline={true}
            numberOfLines={3}
            style={styles.notes}
          />
        </View>
        <Button
          title="Log Session"
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
    </HideKeyboard>
  );
};

export default LogWorkoutScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  submit: {},
  notesContainer: {
    height: 250,
    width: "100%",
  },
  notes: {
    borderColor: "blue",
    borderRadius: 8,
    borderWidth: 1,
    width: "95%",
    height: "65%",
    alignSelf: "center",
  },
  rpeInput: {
    borderColor: "blue",
    borderWidth: 1,
    borderRadius: 10,
    width: 45,
    height: 40,
    fontSize: 24,
    lineHeight: 30,
    textAlign: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 4,
  },
  headerText: {
    fontWeight: "600",
    textAlign: "left",
    lineHeight: 32,
    fontSize: 24,
    padding: 16,
  },
  percentContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "space-between",
  },
  buttonText: {
    lineHeight: 32,
    fontSize: 24,
    textAlign: "center",
  },
  button: {
    width: 80,
    textAlign: "center",
  },
  buttonSelected: {
    width: 80,
    textAlign: "center",
    borderColor: "blue",
    borderWidth: 1,
    borderRadius: 15,
  },
});
