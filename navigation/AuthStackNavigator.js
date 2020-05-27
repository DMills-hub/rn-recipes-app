import { createStackNavigator } from "react-navigation-stack";
import StackDefaultOptions from "./StackDefaultOptions";
import AuthScreen from "../screens/auth/Auth";
import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Platform,
  ImagePropTypes,
} from "react-native";
import Colors from "../constants/Colors";

const AuthStackNavigator = createStackNavigator(
  {
    Auth: {
      screen: AuthScreen,
      navigationOptions: ({ navigation }) => {
        const changeMode = navigation.getParam("changeMode");
        const mode = navigation.getParam("mode");
        return {
          headerRight: () => {
            return (
              <TouchableOpacity onPress={() => changeMode()} style={styles.authButton}>
                <Text style={styles.buttonText}>
                  {mode ? "Sign Up" : "Login"}
                </Text>
              </TouchableOpacity>
            );
          },
        };
      },
    },
  },
  {
    defaultNavigationOptions: StackDefaultOptions,
  }
);

const styles = StyleSheet.create({
  authButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
  buttonText: {
    color: Platform.OS === "android" ? "white" : Colors.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AuthStackNavigator;
