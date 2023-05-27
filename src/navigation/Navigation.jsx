import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import ExerciseNaviagtion from "./ExerciseNavigation";
import Home from "../screens/Home";
import User from "../screens/User";
import Dashboard from "../screens/Dashboard";
import LogIn from "../screens/LogIn";
import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth";
import useLoader from "../hooks/useLoader";

const Tab = createBottomTabNavigator(); // Usar tabs cuando se creen las otras paginas
const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { user } = useAuth();
  const { loader } = useLoader();

  return (
    <>
      {user ? (
        <Stack.Navigator>
          {/* <Tab.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
              tabBarLabel: ({ focused }) => (
                <Text
                  style={{
                    color: focused ? "#4C00A4" : "#424242",
                    fontSize: 12,
                  }}
                >
                  Home
                </Text>
              ),
              tabBarIcon: ({ focused, size }) => (
                <Icon
                  name="home"
                  color={focused ? "#4C00A4" : "#424242"}
                  size={size}
                />
              ),
            }}
          /> */}
          <Stack.Screen
            name="Train"
            component={ExerciseNaviagtion}
            options={{
              headerShown: false,
              tabBarLabel: ({ focused }) => (
                <Text
                  style={{
                    color: focused ? "#4C00A4" : "#424242",
                    fontSize: 12,
                  }}
                >
                  Entranamiento
                </Text>
              ),
              tabBarIcon: ({ focused, size }) => (
                <Icon
                  name="arm-flex"
                  color={focused ? "#4C00A4" : "#424242"}
                  size={size}
                />
              ),
            }}
          />
          {/* <Tab.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              title: "Registros",
              tabBarLabel: ({ focused }) => (
                <Text
                  style={{
                    color: focused ? "#4C00A4" : "#424242",
                    fontSize: 12,
                  }}
                >
                  Registros
                </Text>
              ),
              tabBarIcon: ({ focused, size }) => (
                <Icon
                  name="chart-bar"
                  color={focused ? "#4C00A4" : "#424242"}
                  size={size}
                />
              ),
            }}
          /> */}
          {/* <Tab.Screen
            name="User"
            component={User}
            options={{
              title: "Cuenta",
              tabBarLabel: ({ focused }) => (
                <Text
                  style={{
                    color: focused ? "#4C00A4" : "#424242",
                    fontSize: 12,
                  }}
                >
                  Cuenta
                </Text>
              ),
              tabBarIcon: ({ focused, size }) => (
                <Icon
                  name="account"
                  color={focused ? "#4C00A4" : "#424242"}
                  size={size}
                />
              ),
            }}
          /> */}
        </Stack.Navigator>
      ) : (
        <LogIn />
      )}
      {loader && <Loader />}
    </>
  );
};

export default Navigation;
