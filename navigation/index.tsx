/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import {
  ActivityIndicator,
  ColorSchemeName,
  Pressable,
  Text,
} from "react-native";
import * as SecureStore from "expo-secure-store";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import AuthenticationScreen from "../screens/AuthenticationScreen";
import { useMeLazyQuery, useMeQuery } from "../generated/graphql";
import { View } from "../components/Themed";
import { getAccessToken } from "../utils/accessToken";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { token } from "../graphql/cache";
import { useReactiveVar } from "@apollo/client";
export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const [appLoading, setLoading] = React.useState(true);
  const [me, { data, loading, error }] = useMeLazyQuery();
  let accessToken = useReactiveVar(token);

  React.useEffect(() => {
    if (accessToken) {
      console.log(accessToken);
      me();
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [accessToken]);

  if (appLoading || loading) {
    return (
      <SafeAreaView style={tw`flex h-full items-center justify-center`}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      {accessToken ? (
        <RootNavigator />
      ) : (
        <Stack.Navigator>
          <>
            <Stack.Screen
              name="Authentication"
              component={AuthenticationScreen}
              options={{ title: "Welcome!" }}
            />
          </>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator();

function RootNavigator() {
  // const [userToken, setUserToken] = React.useState<string | null>(null);
  const { data, loading } = useMeQuery();
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: "Oops!" }}
        />
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen name="Modal" component={ModalScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={TabOneScreen}
        options={{ headerShown: false }}
      />
      <BottomTab.Screen
        name="Profile"
        component={TabTwoScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
