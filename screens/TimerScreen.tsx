import React, { FC, useState } from "react";
import { SafeAreaView } from "react-native";
import { Text, View } from "../components/Themed";
import tw from "twrnc";
import { HomeStackNavProps } from "../types";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Set {
  intensity: number;
  minutes: number;
  seconds: number;
  timer: string;
  title: string;
}
const TimerScreen = ({
  route,
  navigation,
}: HomeStackNavProps<"WorkoutTimer">) => {
  const sets = JSON.parse(route.params.sets);
  const [position, setPosition] = useState(0);
  const numSets = route.params.numSets;
  const [set, setSet] = useState(1);
  const [started, setStarted] = useState(false);
  console.log(sets);

  // args: name of button (Forward or Back)
  // change current timer item based on where it is in the timer
  function handleButtonPress(button: string) {
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
      if(position !== 0) {
        setPosition((position) => position - 1)
      } else if(position === 0) {
        // if at the end of the set, move the set back one and puush the position to the end of the set array
        if(set === 1) {
          setSet(1)
        } else {
          setSet((set) => set - 1)
          setPosition(sets.length - 1)
        }
      }
    }
  }

  return (
    <SafeAreaView>
      <View style={tw`h-1/2 flex items-center justify-center`}>
        <CurrentTimerItem item={sets[position]} />
        {sets[position].minutes || sets[position].seconds > 0 ? (
          <Text style={tw`font-semibold text-3xl`}>
            {sets[position].minutes}:
            {sets[position].seconds === 0 ? "00" : sets[position].seconds}
          </Text>
        ) : (
          <Text style={tw`text-lg`}>{sets[position].reps} reps</Text>
        )}
        <Text>
          Set {set} of {numSets}
        </Text>
      </View>
      <View style={tw`p-2 h-1/2 flex flex-row justify-between items-center`}>
        <TouchableOpacity
          onPress={() => handleButtonPress("Back")
          }
        >
          <Text style={tw`text-2xl`}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setStarted((started) => !started)}>
          <Text style={tw`text-2xl`}>{started ? "Stop" : "Start"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleButtonPress("Forward")}>
          <Text style={tw`text-2xl`}>Forward</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// takes an item from the sets array and shows its data. contains timer component aswell

interface CurrentItemProps {
  item: Set;
}

const CurrentTimerItem: FC<CurrentItemProps> = ({ item }) => {
  return (
    <View>
      <Text>{item.title}</Text>
    </View>
  );
};

export default TimerScreen;
