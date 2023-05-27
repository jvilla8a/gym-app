import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

function ExerciseCard(props) {
  const {
    exercise: { item },
  } = props;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Exercise", { exerciseId: item.id })}
    >
      <View style={[styles.container, styles[item.muscleGroup.toLowerCase()]]}>
        <View style={styles.content}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subtitle}>{item.muscleGroup}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    overflow: "hidden",
    elevation: 2,
    borderStyle: "solid",
    borderWidth: 2,
  },
  content: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: "FiraB",
    fontSize: 20,
    color: "#424242",
  },
  subtitle: {
    fontFamily: "FiraR",
    fontSize: 14,
    color: "#858585",
    marginBottom: 4,
  },
  brazo: {
    borderColor: "#BF7EFF",
  },
  espalda: {
    borderColor: "#FF2400",
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

export default ExerciseCard;
