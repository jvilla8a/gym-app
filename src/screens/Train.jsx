import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Platform, StatusBar } from "react-native";

import ExercisesList from "../components/ExercisesList";
import ExerciseFilter from "../components/ExerciseFilter";
import ExerciseFilterButton from "../components/ExerciseFilterButton";
import useLoader from "../hooks/useLoader";
import { getExercises } from "../api/exercise";
import { MUSCLE_GROUP } from "../utils/muscleGroups";
// TODO: Mejorar navigation
const Train = () => {
  const [exercises, setExercises] = useState([]);
  const { setLoader } = useLoader();
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [activeFilter, setActiveFilter] = useState("");

  const handleFilter = (muscleGroup) => {
    if (muscleGroup.toLowerCase() === activeFilter) {
      setActiveFilter("");
      setFilteredExercises(exercises);
    } else {
      setActiveFilter(muscleGroup.toLowerCase());
      setFilteredExercises(
        exercises.filter((exercise) => exercise.muscleGroup === muscleGroup)
      );
    }
  };

  const handleGetExercises = async () => {
    try {
      setLoader(true);
      const data = await getExercises();

      setExercises(data);
      setFilteredExercises(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    handleGetExercises();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ExerciseFilter>
        {MUSCLE_GROUP.map(({ name, slug }) => (
          <ExerciseFilterButton
            active={slug === activeFilter}
            label={name}
            onPress={handleFilter}
            key={slug}
          />
        ))}
      </ExerciseFilter>
      <ExercisesList data={filteredExercises} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default Train;
