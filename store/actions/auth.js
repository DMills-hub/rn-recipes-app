import ENVS from "../../env";
import { LOGIN, LOADING, ERROR } from "../types/auth";
import { AsyncStorage } from "react-native";

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const result = await fetch(`${ENVS.url}/auth/login`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ username: username, password: password }),
      });
      const attemptedLogin = await result.json();
      if (!attemptedLogin.success) {
        dispatch({
          type: ERROR,
          message: attemptedLogin.error,
        });
        return;
      }
      await AsyncStorage.setItem("token", attemptedLogin.token);
      await AsyncStorage.setItem("username", attemptedLogin.username);
      await AsyncStorage.setItem("userId", attemptedLogin.userId.toString())
      dispatch({
        type: LOGIN,
        userData: {
          userId: attemptedLogin.userId,
          username: attemptedLogin.username,
          token: attemptedLogin.token,
        },
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        message: err,
      });
    }
  };
};

export const loading = (load) => {
  return {
    type: LOADING,
    loading: load,
  };
};

export const err = (err) => {
  console.log(err);
  return {
    type: ERROR,
    message: err,
  };
};
