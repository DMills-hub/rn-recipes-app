import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Platform,
  Text,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import Spinner from '../Spinner/Spinner';

const Authenticate = (props) => {
  return (
    <View style={styles.authScreen}>
      <View style={styles.authContainer}>
        <View style={styles.formController}>
          <View style={styles.labelConatiner}>
            <Text style={styles.label}>Username</Text>
          </View>
          <View style={styles.formControls}>
            <Ionicons
              size={20}
              name={Platform.OS === "android" ? "md-person" : "ios-person"}
            />
            <TextInput
              style={styles.textInput}
              value={props.username}
              onChangeText={props.onUsernameChange}
            />
          </View>
        </View>
        <View style={styles.formController}>
          <View style={styles.labelConatiner}>
            <Text style={styles.label}>Password</Text>
          </View>
          <View style={styles.formControls}>
            <Ionicons
              size={20}
              name={Platform.OS === "android" ? "md-key" : "ios-key"}
            />
            <TextInput
              style={styles.textInput}
              value={props.password}
              onChangeText={props.onPasswordChange}
              secureTextEntry={true}
            />
          </View>
        </View>
        {!props.loginMode ? (
          <View style={styles.formController}>
            <View style={styles.labelConatiner}>
              <Text style={styles.label}>Confirm Password</Text>
            </View>
            <View style={styles.formControls}>
              <Ionicons
                size={20}
                name={Platform.OS === "android" ? "md-key" : "ios-key"}
              />
              <TextInput
                style={styles.textInput}
                value={props.confirmPassword}
                onChangeText={props.onConfirmPasswordChange}
                secureTextEntry={true}
              />
            </View>
          </View>
        ) : null}
        {!props.loading ? (
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title={props.loginMode ? "Login" : "Register"}
                onPress={props.onSubmit}
                color={Colors.success}
              />
            </View>
            <View style={styles.button}>
              <Button
                title={`Switch to ${props.loginMode ? "Register" : "Login"}`}
                onPress={props.changeMode}
                color={Colors.primary}
              />
            </View>
          </View>
        ) : <Spinner />}
        {props.error ? <Text>{props.error}</Text> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  authScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  authContainer: {
    height: 300,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  formController: {
    width: "100%",
    padding: 30,
  },
  textInput: {
    width: "90%",
    marginLeft: 10,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  formControls: {
    flexDirection: "row",
  },
  labelConatiner: {
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 17,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "70%",
  },
  button: {
    width: "40%",
    minWidth: 100,
  },
});

export default Authenticate;
