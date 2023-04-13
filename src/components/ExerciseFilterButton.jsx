import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

function ExerciseFilterButton(props) {
  const { label, active, onPress } = props;

  return (
    <TouchableOpacity style={[styles.containerFilter, active && styles.activeFilter]} onPress={() => onPress(label)}>
      <Text style={[styles.label, active && styles.activeLabel]}>{label}</Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  containerFilter: {
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#E0E0E0'
  },
  activeFilter: {
    backgroundColor: '#0000FF'
  },
  label: {
    color: '#424242',
    fontSize: 14,
    fontWeight: 'bold'
  },
  activeLabel: {
    color: '#F5F5F5'
  },
});

export default ExerciseFilterButton;
