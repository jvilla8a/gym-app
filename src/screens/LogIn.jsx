import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import useFonts from "../hooks/useFont";

const LogIn = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const { onLayoutRootView } = useFonts();

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      onLayout={onLayoutRootView}
    >
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>N-GYM</Text>
          <Text style={styles.subtitle}>🔥 Te da la bienvenida 🔥</Text>
        </View>
        <View>
          <View style={styles.loginContainer}>
            {/* <TouchableOpacity
              style={styles.button}
              disabled={!request}
              onPress={logIn}
            >
              <Icon name="google" size={32} color="#424242" />
              <View style={styles.buttonLabelContainer}>
                <Text style={styles.buttonLabel}>Continuar con </Text>
                <Text style={styles.brandLabel}>Google</Text>
              </View>
            </TouchableOpacity> */}
            {!showRegisterForm ? (
              <LoginForm />
            ) : (
              <RegisterForm setShowRegisterForm={setShowRegisterForm} />
            )}
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowRegisterForm(!showRegisterForm)}
            >
              {!showRegisterForm && (
                <Icon name="account-plus" size={30} color="#F5F5F5" />
              )}
              <View style={styles.buttonLabelContainer}>
                <Text style={styles.buttonLabel}>
                  {!showRegisterForm ? "Registrate" : "Volver"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4C00A4",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  titleContainer: {},
  title: {
    fontFamily: "BebasNeue",
    fontSize: 112,
    color: "#F5F5F5",
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "FiraL",
    fontSize: 20,
    color: "#D3D3D3",
    textAlign: "center",
  },
  loginContainer: {
    paddingHorizontal: 32,
  },
  button: {
    backgroundColor: "#4C00A451",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 4,
    marginTop: 20,
  },
  buttonLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 4,
  },
  buttonLabel: {
    fontFamily: "FiraB",
    fontSize: 16,
    color: "#F5F5F5",
  },
});

export default LogIn;
