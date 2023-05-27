import React, { useState, useRef, useEffect } from "react";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Switch,
  TouchableOpacity,
} from "react-native";

import { EXERCISE_RECORD } from "../utils/forms";
// TODOS:
// Usar formik hooks
// Mejorar picker en ios
// Usar inputs custom para estandarizar los estilos
// Mejorar los estilos del select
const ExerciseForm = (props) => {
  const { initialValues, validationSchema } = EXERCISE_RECORD;
  const { handleFormSubmit, variation = [], setShowForm, isBlock } = props;
  const selectRef = useRef(null);

  const [weightKg, setWeightKg] = useState(true);

  const handleWeightKg = (formikValues) => {
    formikValues.weightKg = !weightKg;
    setWeightKg(!weightKg);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => handleFormSubmit(values)}
    >
      {({
        setFieldValue,
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
          <View style={styles.inputsRowContainer}>
            <View style={[styles.inputContainer, styles.weightInput]}>
              <Text style={styles.label}>Peso</Text>
              <TextInput
                style={[
                  styles.input,
                  touched.weight && errors.weight && styles.errorInput,
                ]}
                onChangeText={handleChange("weight")}
                onBlur={handleBlur("weight")}
                placeholder="Peso"
                keyboardType="number-pad"
                value={values.weight}
              />
              {touched.weight && errors.weight && (
                <Text style={styles.errorMessage}>{errors.weight}</Text>
              )}
            </View>
            <View style={styles.inputsRow}>
              <Text style={styles.label}>Lb</Text>
              <Switch
                trackColor={{ false: "#424242", true: "#424242" }}
                thumbColor={"#F5F5F5"}
                ios_backgroundColor="#424242"
                onValueChange={() => handleWeightKg(values)}
                value={weightKg}
              />
              <Text style={styles.label}>Kg</Text>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Repeticiones</Text>
            <TextInput
              style={[
                styles.input,
                touched.reps && errors.reps && styles.errorInput,
              ]}
              onChangeText={handleChange("reps")}
              onBlur={handleBlur("reps")}
              placeholder="Repeticiones"
              keyboardType="number-pad"
              value={values.reps}
            />
            {touched.reps && errors.reps && (
              <Text style={styles.errorMessage}>{errors.reps}</Text>
            )}
          </View>
          {isBlock && (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Variante</Text>
                <Picker
                  ref={selectRef}
                  selectedValue={values.variation}
                  onValueChange={(value) => setFieldValue("variation", value)}
                >
                  <Picker.Item
                    label="Elige una variación..."
                    value={null}
                    enabled={false}
                  />
                  {[...variation].map((item) => (
                    <Picker.Item
                      label={item}
                      value={item}
                      key={item.toLowerCase().replace(/\s+/g, "")}
                    />
                  ))}
                  <Picker.Item label="Otra variación" value="other" />
                </Picker>
              </View>
              {values.variation === "other" && (
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Otra variante</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange("otherVariant")}
                    onBlur={handleBlur("otherVariant")}
                    placeholder="Repeticiones"
                    keyboardType="default"
                    value={values.otherVariant}
                  />
                  {touched.otherVariant && errors.otherVariant && (
                    <Text style={styles.errorMessage}>
                      {errors.otherVariant}
                    </Text>
                  )}
                </View>
              )}
            </>
          )}
          {/* <View style={styles.inputContainer}>
            <Text>Fecha</Text>
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                mode='datetime'
                is24Hour={true}
                onChange={(value) => console.log('DATE ===> ', date)}
              />
            {touched.otherVariant && errors.otherVariant && <Text style={styles.errorMessage}>{errors.otherVariant}</Text>}
          </View> */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                !(isValid && dirty) && styles.buttonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={!(isValid && dirty)}
            >
              <Text
                style={[
                  styles.buttonLabel,
                  !(isValid && dirty) && styles.buttonLabelDisabled,
                ]}
              >
                Agregar serie
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowForm(false)}
            >
              <Text style={styles.buttonLabel}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  inputsContainer: {
    padding: 16,
  },
  inputsRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "30%",
    marginLeft: 8,
  },
  inputContainer: {
    marginBottom: 8,
  },
  input: {
    fontFamily: "FiraR",
    height: 40,
    justifyContent: "center",
    borderColor: "#DDD",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  label: {
    fontFamily: "FiraL",
    fontSize: 16,
    color: "#424242",
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderColor: "#4C00A4",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 4,
  },
  buttonDisabled: {
    borderColor: "#424242",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 4,
    backgroundColor: "#DDDDDD",
  },
  buttonLabelDisabled: {
    color: "#424242",
  },
  buttonLabel: {
    color: "#4C00A4",
    fontSize: 18,
    fontFamily: "FiraR",
  },
  weightInput: {
    width: "70%",
  },
  errorMessage: {
    color: "#FF2400",
    fontSize: 10,
    textAlign: "right",
    fontFamily: "FiraM",
  },
  errorInput: {
    borderColor: "#FF2400",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 8,
  },
});

export default ExerciseForm;
