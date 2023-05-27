import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

function ExerciseFilterButton(props) {
  const { label, active, onPress } = props;

  return (
    <TouchableOpacity
      style={[styles.containerFilter, active && styles.activeFilter]}
      onPress={() => onPress(label)}
    >
      <Text style={[styles.label, active && styles.activeLabel]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerFilter: {
    borderRadius: 16,
    paddingVertical: 3,
    paddingHorizontal: 10,
    backgroundColor: "#4C00A4",
    borderColor: "#f5f5f551",
    borderWidth: 1,
  },
  activeFilter: {
    backgroundColor: "#E0E0E0",
  },
  label: {
    fontFamily: "FiraM",
    color: "#F5F5F5",
    fontSize: 15,
  },
  activeLabel: {
    color: "#424242",
  },
});

export default ExerciseFilterButton;
