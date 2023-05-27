import React from "react";
import { StyleSheet, View } from "react-native";

function ExerciseFilter(props) {
  const { children } = props;

  return (
    <View style={styles.header}>
      <View style={styles.filtersContainer}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 10,
    backgroundColor: "#4C00A4",
  },
  filtersContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

export default ExerciseFilter;
