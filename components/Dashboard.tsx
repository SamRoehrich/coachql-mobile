import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeStackNavProps } from "../types";
import { Text, View } from "./Themed";
import tw from "twrnc";

const Dashboard = ({ navigation }: HomeStackNavProps<"Dashboard">) => {
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <TouchableOpacity
        style={tw`w-full`}
        onPress={() => {
          navigation.navigate("Workouts");
        }}
      >
        <View style={tw`bg-gray-100 flex justify-center`}>
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
          <Text style={tw`px-4 text-2xl text-gray-700`}>Training History</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={tw`w-full`}>
        <View style={tw`bg-gray-100 flex justify-center`}>
          <Text style={tw`px-4 text-2xl text-gray-700`}>Calendar</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Dashboard;
