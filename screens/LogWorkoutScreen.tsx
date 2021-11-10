import React from "react";
import {
  Button,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
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
      <View style={tw`flex flex-row justify-between p-2 bg-gray-100`}>
        <Text style={tw`text-xl text-gray-800`}>Percent Completed</Text>
        <TouchableOpacity onPress={() => setPercentCompleted(25)}>
          <Text>25</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPercentCompleted(50)}>
          <Text>50</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPercentCompleted(75)}>
          <Text>75</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPercentCompleted(100)}>
          <Text>100</Text>
        </TouchableOpacity>
      </View>
      <View style={tw`flex flex-row justify-between p-2 bg-gray-100`}>
        <Text style={tw`text-xl text-gray-800`}>RPE</Text>
        <TextInput
          onChangeText={(value) => setRpe(value)}
          value={rpe}
          style={tw`border border-gray-500 p-2 w-12 text-right rounded-lg`}
        />
      </View>
      <View style={tw`flex justify-between p-2 bg-gray-100`}>
        <Text style={tw`text-xl text-gray-800`}>Notes</Text>
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
