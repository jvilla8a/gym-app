import React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";

import useAuth from "../hooks/useAuth";

const Home = () => {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View styles={styles.subcontainer}>
        <Text style={styles.name}>{`Hola, ${user?.displayName}`}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  subcontainer: {
    margin: 16,
  },
  name: {
    fontSize: 32,
    fontWeight: "bold",
  },
});

export default Home;
