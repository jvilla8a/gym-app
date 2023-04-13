import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, SafeAreaView } from 'react-native';

import Loader from '../components/Loader';
import ExercisesList from '../components/ExercisesList';
import ExerciseFilter from '../components/ExerciseFilter';
import ExerciseFilterButton from '../components/ExerciseFilterButton';
import useLoader from '../hooks/useLoader';
import { getExercises } from '../api/exercise';
import { MUSCLE_GROUP } from '../utils/muscleGroups';

const Train = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useLoader();
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [activeFilter, setActiveFilter] = useState('');
  const navigation = useNavigation();

  const handleFilter = (muscleGroup) => {
    if(muscleGroup.toLowerCase() === activeFilter) {
      setActiveFilter('');
      setFilteredExercises(exercises);  
    } else {
      setActiveFilter(muscleGroup.toLowerCase());
      setFilteredExercises(exercises.filter(exercise => exercise.muscleGroup === muscleGroup));
    }
  };

  const handleNavigation = (params) => {
    navigation.navigate('Exercise', params);
  }

  const handleGetExercises = async () => {
    try {
      setLoading(true);
      const data = await getExercises();
  
      setExercises(data);
      setFilteredExercises(data);
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetExercises();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ExerciseFilter>
        {MUSCLE_GROUP.map(({name, slug}) => <ExerciseFilterButton 
          active={slug === activeFilter} 
          label={name}
          onPress={handleFilter}
          key={slug}
        />)}
      </ExerciseFilter>
      <ExercisesList data={filteredExercises} handleNavigation={handleNavigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
});

export default Train;
