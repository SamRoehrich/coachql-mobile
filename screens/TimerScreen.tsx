import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { Text, View } from "../components/Themed";
import tw from "twrnc";
import { HomeStackNavProps } from "../types";
import { TouchableOpacity } from "react-native-gesture-handler";
const TimerScreen = ({ route }: HomeStackNavProps<"WorkoutTimer">) => {
  const sets = JSON.parse(route.params.sets);
  const [set, setSet] = useState(0);
  const [started, setStarted] = useState(false);
  console.log(sets);

  return (
    <SafeAreaView>
      <View style={tw`h-1/2 flex items-center justify-center`}>
        <Text style={tw`font-semibold text-4xl`}>{sets[set].title}</Text>
        {sets[set].minutes || sets[set].seconds > 0 ? (
          <Text style={tw`font-semibold text-3xl`}>
            {sets[set].minutes}:
            {sets[set].seconds === 0 ? "00" : sets[set].seconds}
          </Text>
        ) : (
          <Text style={tw`text-lg`}>{sets[set].reps} reps</Text>
        )}
      </View>
      <View style={tw`p-2 h-1/2 flex flex-row justify-between items-center`}>
        <TouchableOpacity
          onPress={() =>
            setSet((set) => {
              if (set === 0) {
                return 0;
              } else {
                return set - 1;
              }
            })
          }
        >
          <Text style={tw`text-2xl`}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setStarted((started) => !started)}>
          <Text style={tw`text-2xl`}>{started ? "Stop" : "Start"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            setSet((set) => {
              if (set === sets.length - 1) {
                return set;
              } else {
                return set + 1;
              }
            })
          }
        >
          <Text style={tw`text-2xl`}>Forward</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TimerScreen;
