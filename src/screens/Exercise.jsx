import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

import ExerciseForm from "../components/ExerciseForm";
import BlockCard from "../components/BlockCard";
import ExerciseFilterPopUp from "../components/ExerciseFilterPopUp";
import useLoader from "../hooks/useLoader";
import { getExerciseById } from "../api/exercise";
import {
  addWorkout,
  getLatestWorkoutsByExerciseId,
  getLatestWorkoutsByExerciseIdNVariation,
  getRecordByExerciseId,
} from "../api/workout";
import Context from "../utils/context";
// TODO: Hacer componente Button
const Exercise = (props) => {
  const { user } = useContext(Context);
  const {
    route: {
      params: { exerciseId },
    },
  } = props;
  const { setLoader } = useLoader();
  const [showForm, setShowForm] = useState(false);
  const [modalFilter, setModalFilter] = useState(false);
  const [filter, setFilter] = useState("");
  const [currentBlock, setCurrentBlock] = useState({});
  const [exercise, setExercise] = useState(null);
  const [latestRecords, setLatestRecords] = useState([]);
  const [record, setRecord] = useState({});
  const [loaded, setLoaded] = useState(false);
  const navigation = useNavigation();

  const handleSaveBlock = async () => {
    try {
      setLoader(true);
      await addWorkout(currentBlock);
      setCurrentBlock({});
      filter ? handleWorkoutFilter() : handleWorkoutNoFilter();
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  const handleAddSerie = (values) => {
    const block = { ...currentBlock };
    setShowForm(false);

    if (!currentBlock.exercise) {
      block.user = user.uid;
      block.exercise = exerciseId;
      block.date = new Date();
      block.variation = values.variation;
      block.otherVariant = values.otherVariant;
      block.series = [
        { reps: values.reps, weight: values.weight, weightKg: values.weightKg },
      ];
    } else {
      block.series.push({
        reps: values.reps,
        weight: values.weight,
        weightKg: values.weightKg,
      });
    }

    setCurrentBlock(block);
  };

  const handleAddFilter = (value) => {
    setFilter(value);
    setModalFilter(false);
  };

  const handleCleanFilter = () => {
    setFilter("");
    setModalFilter(false);
  };

  const handleWorkoutFilter = async () => {
    try {
      setLoader(true);
      const workoutsData = await getLatestWorkoutsByExerciseIdNVariation(
        exerciseId,
        filter,
        user.uid
      );

      setLatestRecords(workoutsData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  const handleWorkoutNoFilter = async () => {
    try {
      setLoader(true);
      const workoutsData = await getLatestWorkoutsByExerciseId(
        exerciseId,
        user.uid
      );

      setLatestRecords(workoutsData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  const handleInitialLoad = async () => {
    try {
      setLoader(true);
      const exerciseData = await getExerciseById(exerciseId);
      const workoutsData = await getLatestWorkoutsByExerciseId(
        exerciseId,
        user.uid
      );
      const recordData = await getRecordByExerciseId(exerciseId, user.uid);

      setExercise(exerciseData);
      setLatestRecords(workoutsData);
      setRecord(recordData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoaded(true);
      setLoader(false);
    }
  };

  useEffect(() => {
    handleInitialLoad();
  }, []);

  useEffect(() => {
    if (loaded) {
      if (filter) handleWorkoutFilter();
      else handleWorkoutNoFilter();
    }
  }, [filter]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <ScrollView>
            <View
              style={[
                styles.headerContainer,
                styles[exercise?.muscleGroup?.toLowerCase()],
              ]}
            >
              <View style={styles.header}>
                <View style={styles.backIcon}>
                  <Icon
                    name="chevron-left"
                    color="#D3D3D3"
                    size={30}
                    onPress={() => navigation.navigate("Exercises")}
                  />
                </View>
                <View>
                  <Text style={styles.title}>{exercise?.name || ""}</Text>
                  <Text style={styles.subtitle}>
                    {exercise?.muscleGroup || ""}
                  </Text>
                </View>
              </View>
              {(latestRecords?.length > 0 || filter) && (
                <View style={styles.filterContainer}>
                  <Icon
                    name={filter ? "filter-check" : "filter-outline"}
                    color="#D3D3D3"
                    size={30}
                    onPress={() => setModalFilter(true)}
                  />
                </View>
              )}
            </View>
            <View>
              {!showForm && (
                <View style={styles.buttonsContainer}>
                  {currentBlock.exercise ? (
                    <>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleSaveBlock()}
                      >
                        <Text style={styles.buttonLabel}>Terminar Bloque</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => setShowForm(true)}
                      >
                        <Text style={styles.buttonLabel}>Agregar Serie</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => setShowForm(true)}
                    >
                      <Text style={styles.buttonLabel}>Comenzar Bloque</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              {showForm && (
                <ExerciseForm
                  handleFormSubmit={handleAddSerie}
                  variation={exercise?.variation}
                  setShowForm={setShowForm}
                  isBlock={!currentBlock.exercise}
                />
              )}
              {currentBlock.exercise && (
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Bloque Actual</Text>
                  <View style={styles.blockContainer}>
                    <BlockCard block={currentBlock} current />
                  </View>
                </View>
              )}
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Ultimos Registros</Text>
                {latestRecords?.length > 0 ? (
                  <View style={styles.blockContainer}>
                    {latestRecords.map((item, index) => (
                      <BlockCard key={index} block={item} />
                    ))}
                  </View>
                ) : (
                  <Text style={styles.paragraph}>No hay registros</Text>
                )}
                {/* <FlatList
                horizontal
                data={latestRecords}
                renderItem={item => <BlockCard block={item} />}
                keyExtractor={(item, index) => index}
              /> */}
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Record</Text>
                {record?.id ? (
                  <BlockCard block={record} current />
                ) : (
                  <Text style={styles.paragraph}>No hay records</Text>
                )}
              </View>
            </View>
          </ScrollView>
          <ExerciseFilterPopUp
            isVisible={modalFilter}
            addFilter={handleAddFilter}
            cleanFilter={handleCleanFilter}
            currentFilter={filter}
            onClose={setModalFilter}
            variation={exercise?.variation || []}
          />
        </>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  backIcon: {
    justifyContent: "center",
    marginRight: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 8,
    borderStyle: "solid",
    backgroundColor: "#4C00A4",
  },
  buttonsContainer: {
    marginVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderColor: "#4C00A4",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 4,
  },
  buttonLabel: {
    color: "#4C00A4",
    fontSize: 18,
    fontFamily: "FiraR",
  },
  sectionContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  blockContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "FiraB",
    fontSize: 24,
    color: "#F5F5F5",
  },
  subtitle: {
    fontFamily: "FiraM",
    fontSize: 16,
    color: "#D3D3D3",
  },
  paragraph: {
    color: "#858585",
    textAlign: "center",
    marginVertical: 4,
  },
  sectionTitle: {
    fontFamily: "FiraB",
    fontSize: 16,
    marginBottom: 6,
    color: "#424242",
  },
  variation: {
    fontSize: 14,
    marginBottom: 8,
  },
  brazo: {
    borderColor: "#BF7EFF",
  },
  espalda: {
    borderColor: "#FF0000",
  },
  hombro: {
    borderColor: "#00C5CD",
  },
  pecho: {
    borderColor: "#DAA520",
  },
  pierna: {
    borderColor: "#32CD32",
  },
});

export default Exercise;
