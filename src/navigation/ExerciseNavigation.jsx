import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Train from "../screens/Train";
import Exercise from "../screens/Exercise";

const Stack = createNativeStackNavigator();

const ExerciseNavigation = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen  name='Exercises' component={Train} options={{ title: 'Entranamiento', headerShown: false }} />
      <Stack.Screen name='Exercise' component={Exercise} />
    </Stack.Navigator>
  );
}

export default ExerciseNavigation;