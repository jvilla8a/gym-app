import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import ExerciseCard from './ExerciseCard';


function ExercisesList(props) {
  const { data, handleNavigation } = props;

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id.toString()}
      renderItem={item => <ExerciseCard handleNavigation={handleNavigation} exercise={item} />}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 8,
    backgroundColor: '#F5F5F5'
  },
});


export default ExercisesList;
