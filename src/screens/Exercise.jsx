import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback, Button, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ExerciseForm from '../components/ExerciseForm';
import BlockCard from '../components/BlockCard';
import ExerciseFilterPopUp from '../components/ExerciseFilterPopUp';
import Loader from '../components/Loader';
import useLoader from '../hooks/useLoader';
import { getExerciseById } from '../api/exercise';
import { addWorkout, getLatestWorkoutsByExerciseId, getLatestWorkoutsByExerciseIdNVariation } from '../api/workout';

const Exercise = (props) => {
  const { route: { params: { exerciseId } } } = props;
  const [loading, setLoading] = useLoader();
  const [showForm, setShowForm] = useState(false);
  const [modalFilter, setModalFilter] = useState(false);
  const [filter, setFilter] = useState('');
  const [currentBlock, setCurrentBlock] = useState({});
  const [exercise, setExercise] = useState(null);
  const [latestRecords, setLatestRecords] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const handleSaveBlock = async () => {
    try {
      setLoading(true);
      await addWorkout(currentBlock);
      setCurrentBlock({});
      handleGetExerciseDetails();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSerie = (values) => {
    const block = {...currentBlock};
    setShowForm(false);

    if(!currentBlock.exercise) {
      block.exercise = exerciseId;
      block.date = new Date();
      block.variation = values.variation;
      block.otherVariant = values.otherVariant;
      block.series = [{ reps: values.reps, weight: values.weight, weightKg: values.weightKg }];
    } else {
      block.series.push({ reps: values.reps, weight: values.weight, weightKg: values.weightKg });
    }

    setCurrentBlock(block);
  };

  const handleAddFilter = (value) => {
    setFilter(value);
    setModalFilter(false);
  };

  const handleCleanFilter = () => {
    setFilter('');
    setModalFilter(false);
  };

  const handleWorkoutFilter = async () => {
    try {
      setLoading(true);
      const workoutsData = await getLatestWorkoutsByExerciseIdNVariation(exerciseId, filter);

      setLatestRecords(workoutsData);
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false);
    }
  };

  const handleWorkoutNoFilter = async () => {
    try {
      setLoading(true);
      const workoutsData = await getLatestWorkoutsByExerciseId(exerciseId);

      setLatestRecords(workoutsData);
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false);
    }
  };

  const handleInitialLoad = async () => {
    try {
      setLoading(true);
      const exerciseData = await getExerciseById(exerciseId);
      const workoutsData = await getLatestWorkoutsByExerciseId(exerciseId);

      setExercise(exerciseData);
      setLatestRecords(workoutsData);
    } catch (error) {
      console.error(error)
    } finally {
      setLoaded(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleInitialLoad();
  }, []);

  useEffect(() => {
    if(loaded) {
      if(filter) handleWorkoutFilter();
      else handleWorkoutNoFilter();
    }
  }, [filter]);

  if (loading) {
    return <Loader />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <>
        <View style={styles.container}>
          <View style={[styles.exerciseContainer, styles[exercise?.muscleGroup?.toLowerCase()]]}>
            <View>
              <Text style={styles.title}>{exercise?.name || ''}</Text>
              <Text style={styles.subtitle}>{exercise?.muscleGroup || ''}</Text>
            </View>
            <View style={styles.filterContainer}>
              <Icon
                name={filter ? 'filter-check' : 'filter-outline'}
                color='#D3D3D3'
                size={30}
                onPress={() => setModalFilter(true)}
              />
            </View>
          </View>
          {!showForm && (
            <View style={styles.buttonsContainer}>
              {currentBlock.exercise ? (
                <>
                  <Button color='#4C00A4' onPress={() => handleSaveBlock()} title='Terminar Bloque' />
                  <Button color='#4C00A4' onPress={() => setShowForm(true)} title='Agregar Serie' />
                </>
              ) : (
                <Button color='#4C00A4' onPress={() => setShowForm(true)} title='Comenzar Bloque' />
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
            { latestRecords.length > 0 ? (
              <View style={styles.blockContainer}>
                { latestRecords.map((item, index) => <BlockCard key={index} block={item} />) }
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
            <Text style={styles.paragraph}>No hay registros</Text>
          </View>
        </View>
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
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5'
  },
  exerciseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 8,
    borderStyle: 'solid',
    backgroundColor: '#4C00A4'
  },
  buttonsContainer: {
    marginVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  sectionContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  blockContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F5F5F5',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D3D3D3',
  },
  paragraph: {
    color: '#858585',
    textAlign: 'center',
    marginVertical: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#424242',
  },
  variation: {
    fontSize: 14,
    marginBottom: 8
  },
  brazo: {
    borderColor: '#BF7EFF'
  },
  espalda: {
    borderColor: '#FF0000'
  },
  hombro: {
    borderColor: '#00C5CD'
  },
  pecho: {
    borderColor: '#DAA520'
  },
  pierna: {
    borderColor: '#32CD32'
  },
});

export default Exercise;
