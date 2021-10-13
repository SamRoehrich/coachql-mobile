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
import Dashboard from "../components/Dashboard";
import WorkoutPreviewScreen from "./WorkoutPreviewScreen";
import LogWorkoutScreen from "./LogWorkoutScreen";

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
      <HomeStack.Screen name="Workout" component={WorkoutPreviewScreen} />
      <HomeStack.Screen name="LogWorkout" component={LogWorkoutScreen} />
    </HomeStack.Navigator>
  );
}

interface WorkoutListItemProps {
  workout: Workout;
}
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
