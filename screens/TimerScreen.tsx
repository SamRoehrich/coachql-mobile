import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { HomeStackNavProps } from "../types";
import { TouchableOpacity } from "react-native-gesture-handler";
import HideKeyboard from "../components/HideKeyboard";

interface Set {
  intensity: number;
  minutes: number;
  seconds: number;
  timer: string;
  title: string;
  reps: number;
}
const TimerScreen = ({
  route,
  navigation,
}: HomeStackNavProps<"WorkoutTimer">) => {
  const sets: Set[] = JSON.parse(route.params.sets);
  const [started, setStarted] = useState(false);
  const [set, setSet] = useState(1);
  const [position, setPosition] = useState(0);
  const [seconds, setSeconds] = useState(sets[0].seconds);
  const [minutes, setMinutes] = useState(sets[0].minutes);
  const timerRef = useRef<NodeJS.Timer | null>(null);
  const numSets = route.params.numSets;

  // args: name of button (Forward or Back)
  // change current timer item based on where it is in the timer
  function handleButtonPress(button: string, called?: boolean) {
    if (!called) {
      setStarted(false);
    }
    timerRef.current ? clearTimeout(timerRef.current) : null;
    if (button === "Forward") {
      if (position === sets.length - 1) {
        // if at the end of the sets, increase the set and restart or go to the log workout page
        if (set === numSets) {
          navigation.navigate("LogWorkout", {
            id: route.params.id,
            name: route.params.workoutName,
          });
          setSet(1);
          setPosition(0);
        } else {
          setSet((set) => set + 1);
          setPosition(0);
        }
      } else {
        setPosition((position) => position + 1);
      }
    }

    if (button === "Back") {
      // if not at the end of the set, move the position back by one
      if (position !== 0) {
        setPosition((position) => position - 1);
      } else if (position === 0) {
        // if at the end of the set, move the set back one and puush the position to the end of the set array
        if (set === 1) {
          setSet(1);
        } else {
          setSet((set) => set - 1);
          setPosition(sets.length - 1);
        }
      }
    }
  }

  useEffect(() => {
    if (started) {
      if (seconds == 0) {
        if (minutes == 0) {
          handleButtonPress("Forward", true);
        }
        if (minutes > 0) {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
      if (seconds > 0) {
        timerRef.current = setTimeout(
          () => setSeconds((seconds) => seconds - 1),
          1000
        );
      }
    }
  }, [started, seconds, minutes]);

  useEffect(() => {
    setMinutes(sets[position].minutes);
    setSeconds(sets[position].seconds);
  }, [position]);

  return (
    <HideKeyboard>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.timer}>
            <Text style={styles.text}>{sets[position].title}</Text>
            {sets[position].reps > 1 ? (
              <Text style={styles.text}>{sets[position].reps} reps</Text>
            ) : (
              <Text style={styles.text}>
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </Text>
            )}
          </View>
          <Text style={styles.text}>
            Set {set} of {numSets}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => handleButtonPress("Back")}>
            <Text style={styles.text}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setStarted((started) => !started)}>
            <Text style={styles.text}>{started ? "Stop" : "Start"}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleButtonPress("Forward")}>
            <Text style={styles.text}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </HideKeyboard>
  );
};

export default TimerScreen;

const styles = StyleSheet.create({
  text: {
    lineHeight: 32,
    fontSize: 24,
    padding: 32,
  },
  timer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  container: {
    height: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    padding: 32,
    height: "50%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
