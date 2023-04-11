import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback, Button, FlatList } from 'react-native';

import ExerciseForm from '../components/ExerciseForm';
import BlockCard from '../components/BlockCard';
import useLoader from '../hooks/useLoader';
import Loader from '../components/Loader';
import { getExerciseById } from '../api/exercise';
import { addWorkout, getLatestWorkoutsByExerciseId } from '../api/workout';

const Exercise = (props) => {
  const { route: { params: { exerciseId } } } = props;
  const [loading, setLoading] = useLoader();
  const [showForm, setShowForm] = useState(false);
  const [currentBlock, setCurrentBlock] = useState({});
  const [exercise, setExercise] = useState(null);
  const [latestRecords, setLatestRecords] = useState([]);

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

  const handleGetExerciseDetails = async () => {
    try {
      const exerciseData = await getExerciseById(exerciseId);
      const workoutsData = await getLatestWorkoutsByExerciseId(exerciseId);

      setExercise(exerciseData);
      setLatestRecords(workoutsData);
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetExerciseDetails();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={[styles.exerciseContainer, styles[exercise?.muscleGroup?.toLowerCase()]]}>
          <Text style={styles.title}>{exercise?.name || ''}</Text>
          <Text style={styles.subtitle}>{exercise?.muscleGroup || ''}</Text>
        </View>
        {!showForm && (
          <View style={styles.buttonsContainer}>
            {currentBlock.exercise ? (
              <>
                <Button onPress={() => handleSaveBlock()} title='Terminar Bloque' />
                <Button onPress={() => setShowForm(true)} title='Agregar Serie' />
              </>
            ) : (
              <Button onPress={() => setShowForm(true)} title='Comenzar Bloque' />
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
          {/* <FlatList data={variations} renderItem={renderItem} keyExtractor={item => item.id} /> */}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  exerciseContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
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
    marginBottom: 8,
    color: 'black',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16
  },
  paragraph: {
    color: '#ccc',
    textAlign: 'center',
    marginVertical: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6
  },
  variation: {
    fontSize: 14,
    marginBottom: 8
  },
  brazo: {
    backgroundColor: '#DC143C'
  },
  espalda: {
    backgroundColor: '#3CB371'
  },
  hombro: {
    backgroundColor: '#9370DB'
  },
  pecho: {
    backgroundColor: '#DAA520'
  },
  pierna: {
    backgroundColor: '#1E90FF'
  },
});

export default Exercise;
