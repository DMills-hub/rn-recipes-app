import React, { useState, useLayoutEffect } from "react";
import Authenticate from "../../components/Authenticate/Authenticate";
import ENVS from "../../env";
import { useDispatch, useSelector } from "react-redux";
import { login, loading, err } from "../../store/actions/auth";
import { Alert, TouchableOpacity, Text, StyleSheet } from "react-native";
import onClearAuthError from "../../helpers/onClearAuthError";
import { RootState } from '../../App';
import { AuthStackRouteParamList } from '../../navigation/AuthStackNavigator';
import { StackNavigationProp } from "@react-navigation/stack";

type AuthStackNavigatoionProp = StackNavigationProp<AuthStackRouteParamList, 'Auth'>;

type AuthProps = {
  navigation: AuthStackNavigatoionProp
}

const Auth: React.FC<AuthProps> = ({navigation}): JSX.Element => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [mode, setMode] = useState(true);
  const load = useSelector((state: RootState) => state.auth.loading);
  const myError = useSelector((state: RootState) => state.auth.error);

  const dispatch = useDispatch();

  const changeModeHandler = () => {
    setMode((prevState) => !prevState);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            onPress={() => changeModeHandler()}
            style={styles.authButton}
          >
            <Text style={styles.buttonText}>{mode ? "Sign Up" : "Login"}</Text>
          </TouchableOpacity>
        );
      },
    });
  }, [mode, changeModeHandler]);

  const onUsernameChangeHandler = (text: string) => {
    setUsername(text);
  };

  const onPasswordChangeHandler = (text: string) => {
    setPassword(text);
  };

  const onConfirmPasswordChangeHandler = (text: string) => {
    setConfirmPassword(text);
  };

  const onEmailChangeHandler = (text: string) => {
    setEmail(text);
  };

  const onRegisterHandler = async () => {
    if (
      username.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === "" ||
      email.trim() === ""
    )
      return dispatch(err("No blank values."));
    const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!emailRegex.test(email.toLowerCase()))
      return Alert.alert(
        "Email not valid.",
        "Please type in a valid email address",
        [{ text: "Okay" }]
      );
    if (password !== confirmPassword)
      return dispatch(err(`Password's don't match.`));
    dispatch(loading(true));
    try {
      const result = await fetch(`${ENVS.url}/auth/register`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
          confirmPassword: confirmPassword,
          email: email,
        }),
      });
      const registeredAttempt = await result.json();
      if (registeredAttempt.success) {
        setMode(true);
        dispatch(err(""));
        setPassword("");
        setConfirmPassword("");
        setEmail("");
        return;
      }
      dispatch(err(registeredAttempt.error));
    } catch (error) {
      if (error) dispatch(err("Sorry we couldn't register you."));
    }
    dispatch(loading(false));
  };

  const onLoginHandler = async () => {
    if (username.trim() === "" || password.trim() === "")
      return dispatch(err(`Password's dont't match.`));
    try {
      dispatch(loading(true));
      await dispatch(login(username, password));
      dispatch(loading(false));
    } catch (error) {
      if (error) dispatch(err("Sorry we coudln't log you in."));
    }
  };

  if (myError) {
    Alert.alert("Error", myError, [
      { text: "Okay", onPress: () => onClearAuthError(dispatch) },
    ]);
  }

  return (
    <Authenticate
      onUsernameChange={onUsernameChangeHandler}
      onPasswordChange={onPasswordChangeHandler}
      onConfirmPasswordChange={onConfirmPasswordChangeHandler}
      onEmailChange={onEmailChangeHandler}
      onSubmit={mode ? onLoginHandler : onRegisterHandler}
      username={username}
      password={password}
      confirmPassword={confirmPassword}
      email={email}
      loginMode={mode}
      loading={load}
      onForgotPasswordEmail={forgotPasswordEmail}
    />
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

export default Auth;
