import React from "react";
import {
  Button,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { Text, View } from "../components/Themed";
import { useLogWorkoutMutation } from "../generated/graphql";
import { HomeStackNavProps } from "../types";
import tw from "twrnc";

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
      <Text style={tw`font-bold text-2xl p-2 text-gray-800`}>
        Log Workout - {route.params.name}
      </Text>
      <View style={tw`flex flex-col justify-between p-2 bg-gray-100`}>
        <Text style={tw`text-xl text-gray-800 font-bold w-full`}>
          Percent Completed
        </Text>
        <View style={tw`flex flex-row w-full justify-between items-center`}>
          <TouchableOpacity
            style={tw`flex items-center justify-center w-10 ${
              percentCompleted === 25 ? "border border-blue-500 rounded" : ""
            }`}
            onPress={() => setPercentCompleted(25)}
          >
            <Text style={tw`text-xl`}>25</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setPercentCompleted(50)}
            style={tw`flex items-center justify-center  w-10 ${
              percentCompleted === 50 ? "border border-blue-500 rounded" : ""
            }`}
          >
            <Text style={tw`text-xl`}>50</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex items-center justify-center  w-10 ${
              percentCompleted === 75 ? "border border-blue-500 rounded" : ""
            }`}
            onPress={() => setPercentCompleted(75)}
          >
            <Text style={tw`text-xl`}>75</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex items-center justify-center  w-10 ${
              percentCompleted === 100 ? "border border-blue-500 rounded" : ""
            }`}
            onPress={() => setPercentCompleted(100)}
          >
            <Text style={tw`text-xl`}>100</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={tw`flex flex-row justify-between p-2 bg-gray-100`}>
        <Text style={tw`text-xl text-gray-800 font-bold`}>RPE</Text>
        <TextInput
          onChangeText={(value) => setRpe(value)}
          value={rpe}
          keyboardType="number-pad"
          style={tw`border border-gray-500 p-2 w-12 text-right rounded-lg`}
        />
      </View>
      <View style={tw`flex justify-between p-2 bg-gray-100`}>
        <Text style={tw`text-xl text-gray-800 font-bold`}>Notes</Text>
        <TextInput
          style={tw`border h-24 border-gray-500 p-2 rounded-lg`}
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
