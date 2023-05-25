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
} from "react-native";

import { EXERCISE_RECORD } from "../utils/forms";
// TODOS:
// Usar formik hooks
// Mejorar picker en ios
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
            <Button
              color="#4C00A4"
              onPress={handleSubmit}
              title="Agregar serie"
              disabled={!(isValid && dirty)}
            />
            <Button
              color="#4C00A4"
              onPress={() => setShowForm(false)}
              title="Cancelar"
            />
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
    height: 40,
    justifyContent: "center",
    borderColor: "#DDD",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  label: {
    color: "#424242",
  },
  weightInput: {
    width: "70%",
  },
  errorMessage: {
    color: "red",
    fontSize: 10,
  },
  errorInput: {
    borderColor: "red",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 8,
  },
});

export default ExerciseForm;
