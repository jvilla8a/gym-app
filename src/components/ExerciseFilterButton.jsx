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
    backgroundColor: '#EDEDED'
  },
  activeFilter: {
    backgroundColor: '#2D9CDB'
  },
  label: {
    color: '#6B6B6B',
    fontSize: 14,
    fontWeight: 'bold'
  },
  activeLabel: {
    color: '#FFF'
  },
});

export default ExerciseFilterButton;
