import * as React from "react";
import { ActivityIndicator, Button, StyleSheet } from "react-native";
import tw from "twrnc";
import { Text, View } from "../components/Themed";
import {
  HomeParamList,
  HomeStackNavProps,
  RootTabScreenProps,
  WorkoutParamList,
} from "../types";
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  useGetWorkoutQuery,
  useGetWorkoutsQuery,
  useLogWorkoutMutation,
  Workout,
} from "../generated/graphql";
import { Spinner } from "../components/Spinner";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"Home">) {
  const HomeStack = createNativeStackNavigator<HomeParamList>();

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="Workouts" component={WorkoutsScreen} />
      <HomeStack.Screen name="Workout" component={WorkoutScreen} />
      <HomeStack.Screen name="LogWorkout" component={LogWorkout} />
    </HomeStack.Navigator>
  );
}

interface WorkoutListItemProps {
  workout: Workout;
}

const LogWorkout = ({ route, navigation }: HomeStackNavProps<"LogWorkout">) => {
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

const WorkoutScreen = ({ navigation, route }: HomeStackNavProps<"Workout">) => {
  const { data, loading } = useGetWorkoutQuery({
    variables: {
      workoutId: route.params.id,
    },
  });
  if (loading) {
    return <Spinner />;
  }
  return (
    <SafeAreaView>
      <Text style={tw`text-xl p-2`}>Workout: {route.params.name}</Text>
      {data && data.getWorkout ? (
        <>
          <Text style={tw`text-lg p-2`}>{data.getWorkout.description}</Text>
          <View style={tw`flex flex-row justify-between p-2`}>
            <Button title="Start Workout" onPress={() => {}} />
            <Button
              title="Log Workout"
              onPress={() => {
                navigation.navigate("LogWorkout", { id: route.params.id });
              }}
            />
          </View>
        </>
      ) : (
        <>
          <Text>
            Could not load the workout from the server. Close the app and try
            again.
          </Text>
        </>
      )}
    </SafeAreaView>
  );
};

const WorkoutsScreen = ({ navigation }: HomeStackNavProps<"Workouts">) => {
  const { data, loading } = useGetWorkoutsQuery({
    fetchPolicy: "cache-and-network",
  });

  const WorkoutListItem: React.FC<WorkoutListItemProps> = ({ workout }) => {
    return (
      <Button
        title={workout.name}
        onPress={() => {
          navigation.navigate("Workout", {
            name: workout.name,
            id: workout.id,
          });
        }}
      />
    );
  };

  if (loading) {
    return <Spinner />;
  }
  if (data) {
    return (
      <SafeAreaView>
        <FlatList
          data={data.getWorkoutsInOrg}
          renderItem={({ item }) => {
            return <WorkoutListItem workout={item} />;
          }}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    );
  }
  return <Spinner />;
};
const Dashboard = ({ navigation }: HomeStackNavProps<"Dashboard">) => {
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`h-full p-4 bg-white`}>
        <TouchableOpacity
          style={tw`w-full h-1/4`}
          onPress={() => {
            navigation.navigate("Workouts");
          }}
        >
          <View style={tw`bg-gray-100 h-full flex justify-center`}>
            <Text style={tw`px-4 text-2xl text-gray-700`}>Workouts</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={tw`w-full`}>
          <View style={tw`bg-gray-100 flex justify-center`}>
            <Text style={tw`px-4 text-2xl text-gray-700`}>Notes</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={tw`w-full`}>
          <View style={tw`bg-gray-100 flex justify-center`}>
            <Text style={tw`px-4 text-2xl text-gray-700`}>
              Training History
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={tw`w-full`}>
          <View style={tw`bg-gray-100 flex justify-center`}>
            <Text style={tw`px-4 text-2xl text-gray-700`}>Calendar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderColor: "blue",
    borderWidth: 1,
    height: 20,
    width: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
