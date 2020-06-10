import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from "../screens/auth/Auth";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import React from "react";
import StackDefaultOptions from "./StackDefaultOptions";

const AuthStack = createStackNavigator();

const MyStack = () => {
  return (
    <AuthStack.Navigator screenOptions={StackDefaultOptions}>
      <AuthStack.Screen
        name="Auth"
        component={AuthScreen}
        options={{
          headerTitle: "Recipe & Me"
        }}
      />
    </AuthStack.Navigator>
  );
};

export default MyStack;
