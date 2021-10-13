import React from "react";
import { SafeAreaView } from "react-native";
import { Text, View } from "../components/Themed";
import tw from "twrnc";
import { HomeStackNavProps } from "../types";
import { TouchableOpacity } from "react-native-gesture-handler";
const TimerScreen = ({ route }: HomeStackNavProps<"WorkoutTimer">) => {
  const sets = JSON.parse(route.params.sets);
  return (
    <SafeAreaView>
      <View style={tw`h-1/2 flex items-center justify-center`}>
        <Text>{sets[0].title}</Text>
        <Text>{sets[0].reps}</Text>
        <Text>{sets[0].minutes}</Text>
      </View>
      <View style={tw`p-2 h-1/2 flex flex-row justify-between items-center`}>
        <TouchableOpacity>
          <Text>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Start/Stop</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Forward</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TimerScreen;
