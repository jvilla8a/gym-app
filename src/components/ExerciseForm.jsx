import React, { useState } from 'react';
import { Formik } from 'formik';
import SelectPicker from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, StyleSheet, TextInput, Button, Switch } from 'react-native';

import { EXERCISE_RECORD } from '../utils/forms';

const ExerciseForm = (props) => {
  const { initialValues, validationSchema } = EXERCISE_RECORD;
  const { handleFormSubmit, variation = [], setShowForm, isBlock } = props;
  

  const [weightKg, setWeightKg] = useState(true);

  const handleWeightKg = (formikValues) => {
    formikValues.weightKg = !weightKg;
    setWeightKg(!weightKg);
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => handleFormSubmit(values)}>
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, dirty }) => (
        <View style={styles.inputsContainer}>
          <View style={styles.inputsRowContainer}>
            <View style={[styles.inputContainer, styles.weightInput]}>
              <Text>Peso</Text>
              <TextInput
                style={[styles.input, touched.weight && errors.weight && styles.errorInput]}
                onChangeText={handleChange('weight')}
                onBlur={handleBlur('weight')}
                placeholder='Peso'
                keyboardType='number-pad'
                value={values.weight}
                />
              {touched.weight && errors.weight && <Text style={styles.errorMessage}>{errors.weight}</Text>}
            </View>
            <View style={styles.inputsRow}>
              <Text>Lb</Text>
              <Switch
                trackColor={{false: '#3e3e3e', true: '#3e3e3e'}}
                thumbColor={'#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => handleWeightKg(values)}
                value={weightKg}
              />
              <Text>Kg</Text>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text>Repeticiones</Text>
            <TextInput
              style={[styles.input, touched.reps && errors.reps && styles.errorInput]}
              onChangeText={handleChange('reps')}
              onBlur={handleBlur('reps')}
              placeholder='Repeticiones'
              keyboardType='number-pad'
              value={values.reps}
            />
            {touched.reps && errors.reps && <Text style={styles.errorMessage}>{errors.reps}</Text>}
          </View>
          {isBlock && (
            <>
              <View style={styles.inputContainer}>
                <Text>Variante</Text>
                <View style={styles.input}>
                  <SelectPicker
                    value={values.variation}
                    placeholder={{
                      label: 'Elige una variante...',
                      value: '',
                    }}
                    onValueChange={handleChange('variation')}
                    useNativeAndroidPickerStyle={true}
                    items={[
                      ...variation.map((item) => ({
                        label: item,
                        // value: item.toLowerCase().replace(/\s+/g, ''),
                        value: item,
                        key: item.toLowerCase().replace(/\s+/g, '')
                      })),
                      { label: 'Otra variación', value: 'other' },
                    ]}
                  />
                </View>
              </View>
              {values.variation === 'other' && (
                <View style={styles.inputContainer}>
                  <Text>Otra variante</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange('otherVariant')}
                      onBlur={handleBlur('otherVariant')}
                      placeholder='Repeticiones'
                      keyboardType='default'
                      value={values.otherVariant}
                    />
                  {touched.otherVariant && errors.otherVariant && <Text style={styles.errorMessage}>{errors.otherVariant}</Text>}
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
            <Button onPress={handleSubmit} title="Agregar serie" disabled={!(isValid && dirty)} />
            <Button onPress={() => setShowForm(false)} title="Cancelar" />
          </View>
        </View>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  inputsContainer: {
    padding: 16,
  },
  inputsRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '30%',
    marginLeft: 8,
  },
  inputContainer: {
    marginBottom: 8
  },
  input: {
    height: 40,
    justifyContent: 'center',
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  weightInput: {
    width: '70%'
  },
  errorMessage: {
    color: 'red',
    fontSize: 10,
  },
  errorInput: {
    borderColor: 'red',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 8,
  },
});

export default ExerciseForm;
