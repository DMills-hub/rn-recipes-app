import React, { useState } from "react";
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
import Spinner from "../Spinner/Spinner";
import Card from "../Card/Card";
import CustomTextInput from "../CustomTextInput/CustomTextInput";
import { scale, verticalScale } from "react-native-size-matters";

type AuthenticateProps = {
  onEmailChange: (text: string) => void;
  onUsernameChange: (text: string) => void;
  onPasswordChange: (text: string) => void;
  onConfirmPasswordChange: (text: string) => void;
  onSubmit: () => void;
  onForgotPasswordEmail: string;
  username: string;
  loginMode: boolean;
  email: string;
  password: string;
  confirmPassword: string;
  loading: boolean;
};

const Authenticate: React.FC<AuthenticateProps> = (props): JSX.Element => {
  const [forgotPasswordPopUp, setForgotPasswordPopUp] = useState(false);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={scale(110)}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.authScreen}
    >
      {forgotPasswordPopUp ? (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.6)",
            zIndex: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "80%",
              backgroundColor: "white",
              padding: 30,
              borderRadius: 10,
            }}
          >
            <View style={{ alignItems: "flex-end" }}>
              <Button
                title="X"
                color="red"
                onPress={() => setForgotPasswordPopUp(false)}
              />
            </View>
            <Text style={{ textAlign: "center" }}>
              Please type in your email address to reset your password.
            </Text>
            <View style={{ flexDirection: "row", marginTop: 30 }}>
              <Ionicons
                size={scale(14)}
                name={Platform.OS === "android" ? "md-mail" : "ios-mail"}
              />
              <CustomTextInput
                style={styles.textInput}
                onChangeText={props.onEmailChange}
                value={props.onForgotPasswordEmail}
              />
            </View>
          </View>
        </View>
      ) : null}
      <Card style={styles.authContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.formController}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Username</Text>
            </View>
            <View style={styles.formControls}>
              <Ionicons
                size={scale(14)}
                name={Platform.OS === "android" ? "md-person" : "ios-person"}
              />
              <CustomTextInput
                style={styles.textInput}
                value={props.username}
                onChangeText={props.onUsernameChange}
              />
            </View>
          </View>
          {!props.loginMode ? (
            <View style={styles.formController}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Email</Text>
              </View>
              <View style={styles.formControls}>
                <Ionicons
                  size={scale(14)}
                  name={Platform.OS === "android" ? "md-mail" : "ios-mail"}
                />
                <CustomTextInput
                  style={styles.textInput}
                  value={props.email}
                  onChangeText={props.onEmailChange}
                />
              </View>
            </View>
          ) : null}
          <View style={styles.formController}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Password</Text>
            </View>
            <View style={styles.formControls}>
              <Ionicons
                size={scale(14)}
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
                  size={scale(14)}
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
                  <View style={styles.buttonMargin}>
                    <Button
                      title={props.loginMode ? "Login" : "Register"}
                      onPress={props.onSubmit}
                    />
                  </View>
                  <View style={styles.buttonMargin}>
                    <Button
                      title="Forgot Password"
                      onPress={() => setForgotPasswordPopUp(true)}
                    />
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <Spinner />
          )}
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
    zIndex: 100,
  },
  authContainer: {
    height: verticalScale(500),
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
    padding: 15,
  },
  textInput: {
    width: "90%",
    marginLeft: 10,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    fontSize: scale(12),
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
    fontSize: scale(14),
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
  buttonMargin: {
    marginTop: 5,
    marginBottom: 5
  }
});

export default Authenticate;
