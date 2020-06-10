import ENVS from "../../env";
import { LOGIN, LOADING, ERROR, LOGOUT, AUTO_LOGIN, CLEAR_ERR } from "../types/auth";
import { AsyncStorage } from "react-native";

export const autoLogin = () => {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");
      const username = await AsyncStorage.getItem("username");
      if (!token || !userId || !username)
        return dispatch({
          type: AUTO_LOGIN,
          success: false,
        });

      dispatch({
        type: AUTO_LOGIN,
        success: true,
        userData: {
          token: token,
          userId: userId,
          username: username,
        },
      });
    } catch (err) {
      if (err)
      dispatch({
        type: ERROR,
        message: "Sorry we couldn't auto log you in.",
      });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("userId");
      await AsyncStorage.removeItem("username");
      dispatch({
        type: LOGOUT,
      });
    } catch (err) {
      if (err)
      dispatch({
        type: ERROR,
        message: err,
      });
    }
  };
};

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
      await AsyncStorage.setItem("userId", attemptedLogin.userId.toString());
      dispatch({
        type: LOGIN,
        userData: {
          userId: attemptedLogin.userId,
          username: attemptedLogin.username,
          token: attemptedLogin.token,
        },
      });
    } catch (err) {
      if (err)
      dispatch({
        type: ERROR,
        message: "Sorry we couldn't log you in.",
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
  return {
    type: ERROR,
    message: err,
  };
};

export const clearErr = () => {
  return {
    type: CLEAR_ERR
  }
}
