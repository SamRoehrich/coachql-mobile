import * as React from "react";
import { ActivityIndicator, Button, StyleSheet } from "react-native";
import tw from "twrnc";
import { Text, View } from "../components/Themed";
import { HomeParamList, HomeStackNavProps, RootTabScreenProps } from "../types";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useGetWorkoutsQuery } from "../generated/graphql";
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
    </HomeStack.Navigator>
  );
}

const WorkoutsScreen = () => {
  const { data, loading } = useGetWorkoutsQuery();
  if (loading) {
    return <Spinner />;
  }
  if (data) {
    return (
      <SafeAreaView>
        <FlatList
          data={data.getWorkoutsInOrg}
          renderItem={({ item }) => {
            return <Button title={item.name} onPress={() => {}} />;
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
