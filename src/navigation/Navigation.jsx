import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from '../screens/Home';
import User from '../screens/User';
import Dashboard from '../screens/Dashboard';
import ExerciseNaviagtion from './ExerciseNavigation';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={Home} options={{
        tabBarLabel: ({ focused }) => <Text style={{ color: focused ? '#0000FF' : '#424242', fontSize: 12 }}>Home</Text>,
        tabBarIcon: ({ focused, size }) => <Icon name='home' color={focused ? '#0000FF' : '#424242'} size={size} />
      }} />
      <Tab.Screen name='Train' component={ExerciseNaviagtion} options={{ 
        headerShown: false,
        tabBarLabel: ({ focused }) => <Text style={{ color: focused ? '#0000FF' : '#424242', fontSize: 12 }}>Entranamiento</Text>,
        tabBarIcon: ({ focused, size }) => <Icon name='arm-flex' color={focused ? '#0000FF' : '#424242'} size={size} />
      }} />
      <Tab.Screen name='Dashboard' component={Dashboard} options={{
        title: 'Registros',
        tabBarLabel: ({ focused }) => <Text style={{ color: focused ? '#0000FF' : '#424242', fontSize: 12 }}>Registros</Text>,
        tabBarIcon: ({ focused, size }) => <Icon name='chart-bar' color={focused ? '#0000FF' : '#424242'} size={size} />
      }} />
      <Tab.Screen name='User' component={User} options={{
        title: 'Cuenta',
        tabBarLabel: ({ focused }) => <Text style={{ color: focused ? '#0000FF' : '#424242', fontSize: 12 }}>Cuenta</Text>,
        tabBarIcon: ({ focused, size }) => <Icon name='account' color={focused ? '#0000FF' : '#424242'} size={size} />
      }} />
    </Tab.Navigator>
  )
};

export default Navigation;
