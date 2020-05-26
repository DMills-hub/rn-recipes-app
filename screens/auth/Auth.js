import React, { useState } from "react";
import Authenticate from "../../components/Authenticate/Authenticate";
import ENVS from "../../env";

const Auth = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({
    error: false,
    message: "",
  });
  const [mode, setMode] = useState(true);

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

  const onRegisterHandler = async () => {
    if (
      username.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    )
      return setError({ error: true, message: "No blank values." });
    if (password !== confirmPassword)
      return setError({ error: true, message: `Password's don't match.` });
    try {
      const result = await fetch(`${ENVS.url}/auth/register`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
          confirmPassword: confirmPassword,
        }),
      });
      const registeredAttempt = await result.json();
      if (registeredAttempt.success) {
        setMode(true);
        setError({
          error: false,
          message: "",
        });
        setPassword("");
        setConfirmPassword("");
        return;
      }
      setError({
        error: true,
        message: registeredAttempt.error,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onLoginHandler = () => {};

  return (
    <Authenticate
      onUsernameChange={onUsernameChangeHandler}
      onPasswordChange={onPasswordChangeHandler}
      onConfirmPasswordChange={onConfirmPasswordChangeHandler}
      onSubmit={mode ? () => console.log("Login") : onRegisterHandler}
      username={username}
      password={password}
      confirmPassword={confirmPassword}
      error={error}
      loginMode={mode}
      changeMode={changeModeHandler}
    />
  );
};

export default Auth;
