import React, { useState, useEffect } from "react";
import Authenticate from "../../components/Authenticate/Authenticate";
import ENVS from "../../env";
import { useDispatch, useSelector } from "react-redux";
import { login, loading, err } from "../../store/actions/auth";
import { Alert } from "react-native";

const Auth = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mode, setMode] = useState(true);
  const load = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const dispatch = useDispatch();

  useEffect(() => {
    props.navigation.setParams({ changeMode: changeModeHandler });
    props.navigation.setParams({ mode: mode });
  }, [changeModeHandler, mode]);

  const changeModeHandler = () => {
    setMode((prevState) => !prevState);
  };

  const onUsernameChangeHandler = (text) => {
    setUsername(text);
  };

  const onPasswordChangeHandler = (text) => {
    setPassword(text);
  };

  const onConfirmPasswordChangeHandler = (text) => {
    setConfirmPassword(text);
  };

  const onEmailChangeHandler = (text) => {
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
    if (!emailRegex.test(email.toLowerCase())) return Alert.alert("Email not valid.", "Please type in a valid email address", [{text: 'Okay'}])
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
        dispatch(err(false));
        setPassword("");
        setConfirmPassword("");
        setEmail("");
        return;
      }
      dispatch(err(registeredAttempt.error));
    } catch (err) {
      dispatch(err(registeredAttempt.error));
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
    } catch (err) {
      // console.log(err);
      // dispatch(err(err));
    }
  };

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
      error={error}
      loginMode={mode}
      loading={load}
    />
  );
};

export default Auth;
