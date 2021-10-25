import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { Text, View } from "../components/Themed";
import tw from "twrnc";
import { HomeStackNavProps } from "../types";
import { TouchableOpacity } from "react-native-gesture-handler";
const TimerScreen = ({ route }: HomeStackNavProps<"WorkoutTimer">) => {
  const sets = JSON.parse(route.params.sets);
  const [set, setSet] = useState(0);

  return (
    <SafeAreaView>
      <View style={tw`h-1/2 flex items-center justify-center`}>
        <Text>{sets[set].title}</Text>
        <Text>{sets[set].reps}</Text>
        <Text>{sets[set].minutes}</Text>
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
          <Text>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Start/Stop</Text>
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
          <Text>Forward</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TimerScreen;
