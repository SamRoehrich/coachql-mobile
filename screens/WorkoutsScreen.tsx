import React from "react";
import { Button, SafeAreaView, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Spinner } from "../components/Spinner";
import { useGetWorkoutsQuery, Workout } from "../generated/graphql";
import { HomeStackNavProps } from "../types";

interface WorkoutListItemProps {
  workout: Workout;
}
const WorkoutsScreen = ({
  navigation,
  route,
}: HomeStackNavProps<"Workouts">) => {
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
    const workouts = data.getWorkoutsInOrg.filter(
      (workout) => workout.workoutType === route.params.type
    );
    console.log(workouts);

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={workouts}
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

export default WorkoutsScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
