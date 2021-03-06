/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
  RouteProp,
} from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Home: undefined;
  Profile: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type HomeParamList = {
  Dashboard: undefined;
  Workouts: {
    type: string;
  };
  WorkoutTypeSelection: undefined;
  Workout: {
    name: string;
    id: number;
  };
  WorkoutTimer: {
    sets: string;
    numSets: number;
    workoutName: string;
    id: number;
  };
  LogWorkout: {
    id: number;
    name: string;
  };
};

export type HomeStackNavProps<T extends keyof HomeParamList> = {
  navigation: NativeStackNavigationProp<HomeParamList, T>;
  route: RouteProp<HomeParamList, T>;
};

export type WorkoutParamList = {
  Workout: {
    name: string;
    id: number;
  };
};

export type WorkoutStackNavProps<T extends keyof WorkoutParamList> = {
  navigation: NativeStackNavigationProp<WorkoutParamList, T>;
  route: RouteProp<HomeParamList, T>;
};
