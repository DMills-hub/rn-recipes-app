import React from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
  Button,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import Spinner from "../Spinner/Spinner";
import Card from "../Card/Card";
import CustomTextInput from "../CustomTextInput/CustomTextInput";

const Authenticate = (props) => {
  return (
    <KeyboardAvoidingView keyboardVerticalOffset={50} behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.authScreen}>
      <Card style={styles.authContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.formController}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Username</Text>
            </View>
            <View style={styles.formControls}>
              <Ionicons
                size={20}
                name={Platform.OS === "android" ? "md-person" : "ios-person"}
              />
              <CustomTextInput
                style={styles.textInput}
                value={props.username}
                onChangeText={props.onUsernameChange}
              />
            </View>
          </View>
          <View style={styles.formController}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Password</Text>
            </View>
            <View style={styles.formControls}>
              <Ionicons
                size={20}
                name={Platform.OS === "android" ? "md-key" : "ios-key"}
              />
              <CustomTextInput
                style={styles.textInput}
                value={props.password}
                onChangeText={props.onPasswordChange}
                secureTextEntry={true}
              />
            </View>
          </View>
          {!props.loginMode ? (
            <View style={styles.formController}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Confirm Password</Text>
              </View>
              <View style={styles.formControls}>
                <Ionicons
                  size={20}
                  name={Platform.OS === "android" ? "md-key" : "ios-key"}
                />
                <CustomTextInput
                  style={styles.textInput}
                  value={props.confirmPassword}
                  onChangeText={props.onConfirmPasswordChange}
                  secureTextEntry={true}
                />
              </View>
            </View>
          ) : null}
          {!props.loading ? (
            <View style={styles.btnCon}>
              <View style={styles.buttonContainer}>
                <View style={styles.button}>
                  <Button
                    title={props.loginMode ? "Login" : "Register"}
                    onPress={props.onSubmit}
                    color={Colors.success}
                  />
                </View>
              </View>
            </View>
          ) : (
            <Spinner />
          )}
          {props.error ? (
            <View style={styles.errorContainer}>
              <Text>{props.error}</Text>
            </View>
          ) : null}
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  authScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100
  },
  authContainer: {
    height: 400,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollViewContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
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
  labelContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 17,
  },
  buttonContainer: {
    width: "40%",
  },
  btnCon: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "100%",
    minWidth: 100,
  },
  errorContainer: {
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Authenticate;
