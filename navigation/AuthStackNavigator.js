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
        options={({ route }) => {
          const { changeMode } = route.params || "";
          const { mode } = route.params || true;
          return {
            headerRight: () => {
              return (
                <TouchableOpacity
                  onPress={() => changeMode()}
                  style={styles.authButton}
                >
                  <Text style={styles.buttonText}>
                    {mode ? "Sign Up" : "Login"}
                  </Text>
                </TouchableOpacity>
              );
            },
            headerTitle: "Recipes & Me",
          };
        }}
      />
    </AuthStack.Navigator>
  );
};

const styles = StyleSheet.create({
  authButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default MyStack;
