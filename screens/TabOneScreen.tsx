import * as React from "react";
import { HomeParamList, RootTabScreenProps } from "../types";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../components/Dashboard";
import WorkoutPreviewScreen from "./WorkoutPreviewScreen";
import LogWorkoutScreen from "./LogWorkoutScreen";
import WorkoutsScreen from "./WorkoutsScreen";
import TimerScreen from "./TimerScreen";
import WorkoutTypeSelection from "./WorkoutTypeSelection";

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
      <HomeStack.Screen
        name="WorkoutTypeSelection"
        component={WorkoutTypeSelection}
        options={{ title: "Find a Session" }}
      />
      <HomeStack.Screen
        name="Workouts"
        component={WorkoutsScreen}
        options={({ route }) => ({ title: route.params.type })}
      />
      <HomeStack.Screen
        name="Workout"
        component={WorkoutPreviewScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
      <HomeStack.Screen
        name="LogWorkout"
        component={LogWorkoutScreen}
        options={{ title: "Log Workout" }}
      />
      <HomeStack.Screen name="WorkoutTimer" component={TimerScreen} />
    </HomeStack.Navigator>
  );
}
