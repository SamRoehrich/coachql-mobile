import React from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";
import tw from "twrnc";
export function Spinner() {
  return (
    <SafeAreaView style={tw`flex justify-center items-center h-full`}>
      <ActivityIndicator size="large" />
    </SafeAreaView>
  );
}
