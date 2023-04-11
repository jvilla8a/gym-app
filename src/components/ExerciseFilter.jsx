import React from 'react';
import { StyleSheet, View } from 'react-native';

function ExerciseFilter(props) {
  const { children } = props;

  return (
    <View style={styles.header}>
      <View style={styles.filtersContainer}>
        {children}
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: '#FFF',
    borderBottomColor: '#EDEDED',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  filtersContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default ExerciseFilter
