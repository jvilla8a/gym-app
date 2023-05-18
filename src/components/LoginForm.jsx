import React from "react";
import { Formik } from "formik";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { LOGIN } from "../utils/forms";
import useAuth from "../hooks/useAuth";

const LoginForm = () => {
  const { initialValues, validationSchema } = LOGIN;
  const { signIn } = useAuth();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => signIn(values)}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
        dirty,
      }) => (
        <View style={styles.inputsContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={[
                styles.input,
                touched.email && errors.email && styles.errorInput,
              ]}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              keyboardType="email-address"
            />
            {touched.email && errors.email && (
              <Text style={styles.errorMessage}>{errors.email}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Contraseña:</Text>
            <TextInput
              style={[
                styles.input,
                touched.password && errors.password && styles.errorInput,
              ]}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry={true}
              id="password"
              name="password"
            />
            {touched.password && errors.password && (
              <Text style={styles.errorMessage}>{errors.password}</Text>
            )}
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.button}
              disabled={!(isValid && dirty)}
              onPress={handleSubmit}
            >
              <Icon name="login" size={30} color="#424242" />
              <View style={styles.buttonLabelContainer}>
                <Text style={styles.buttonLabel}>Inicia Sesión</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  inputsContainer: {
    borderBottomColor: "#DDD",
    borderBottomWidth: 1,
    borderStyle: "solid",
  },
  inputContainer: {
    marginBottom: 8,
  },
  input: {
    height: 44,
    justifyContent: "center",
    backgroundColor: "#f5f5f551",
    borderColor: "#F5F5F5",
    color: "#D3D3D3",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  label: {
    color: "#F5F5F5",
    fontSize: 16,
    marginBottom: 4,
  },
  errorMessage: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  errorInput: {
    borderColor: "red",
  },
  buttonsContainer: {
    marginVertical: 8,
  },
  button: {
    backgroundColor: "#F5F5F5",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 4,
    marginBottom: 16,
  },
  buttonLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 4,
  },
  buttonLabel: {
    fontSize: 16,
    color: "#424242",
    marginLeft: 8,
    fontWeight: "bold",
  },
});

export default LoginForm;
