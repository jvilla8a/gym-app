import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Home from '../screens/Home';
import User from '../screens/User';
import Dashboard from '../screens/Dashboard';
import ExerciseNaviagtion from './ExerciseNavigation';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={Home} options={{
        tabBarIcon: ({ color, size }) => <Icon name='home' color={color} size={size} />
      }} />
      <Tab.Screen name='Train' component={ExerciseNaviagtion} options={{ 
        headerShown: false,
        tabBarLabel: 'Entranamiento',
        tabBarIcon: ({ color, size }) => <Icon name='arm-flex' color={color} size={size} />
      }} />
      <Tab.Screen name='Dashboard' component={Dashboard} options={{
        title: 'Registros',
        tabBarLabel: 'Registros',
        tabBarIcon: ({ color, size }) => <Icon name='chart-bar' color={color} size={size} />
      }} />
      <Tab.Screen name='User' component={User} options={{
        title: 'Cuenta',
        tabBarLabel: 'Cuenta',
        tabBarIcon: ({ color, size }) => <Icon name='account' color={color} size={size} />
      }} />
    </Tab.Navigator>
  )
};

export default Navigation;
