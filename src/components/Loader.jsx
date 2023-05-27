import React from "react";
import { Text, StyleSheet, View, ActivityIndicator } from "react-native";

const Loader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>N-GYM</Text>
      <View>
        <ActivityIndicator size={48} color="#4C00A4" />
        <Text style={styles.label}>Cargando...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    zIndex: 100,
  },
  title: {
    fontFamily: "BebasNeue",
    fontSize: 112,
    color: "#4C00A4",
    textAlign: "center",
  },
  label: {
    fontFamily: "FiraR",
    fontSize: 20,
    color: "#4C00A4",
    marginTop: 16,
  },
});

export default Loader;
