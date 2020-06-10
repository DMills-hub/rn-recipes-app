import React, { useState, useCallback } from "react";
import { StyleSheet, Text, View, Alert, AsyncStorage } from "react-native";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import Colors from "../../constants/Colors";
import { useFocusEffect } from "@react-navigation/native";
import ENVS from "../../env";
import Spinner from "../../components/Spinner/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { loading, err } from "../../store/actions/auth";
import onClearAuthError from '../../helpers/onClearAuthError';

const Account = (props) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const isLoading = useSelector((state) => state.auth.loading);
  const myError = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      const getAccountDetails = async () => {
        try {
          const userId = await AsyncStorage.getItem("userId");
          const token = await AsyncStorage.getItem("token");
          const getUserData = await fetch(
            `${ENVS.url}/auth/account/${userId}`,
            {
              headers: {
                "Content-Type": "application/json",
                "Authorization": token,
              },
            }
          );
          const userData = await getUserData.json();
          setUsername(userData.username);
          setEmail(userData.email);
        } catch (error) {
          if (error) dispatch(err("Sorry we couldn't get your account details."))
        }
      };
      getAccountDetails();
    }, [])
  );

  const onChangeNewPasswordHandler = (text) => {
    setNewPassword(text);
  };

  const onChangeConfirmNewPasswordHandler = (text) => {
    setConfirmNewPassword(text);
  };

  const onConfirmPasswordChangeHandler = async () => {
    try {
      if (newPassword.trim() === "" || confirmNewPassword.trim() === "")
        return Alert.alert(
          "No empty values.",
          "Please make sure both passwords are filled out",
          [{ text: "Okay" }]
        );
      if (newPassword !== confirmNewPassword)
        return Alert.alert(
          "Password's don't match.",
          "Please make sure that your passwords match."[{ text: "Okay" }]
        );
      dispatch(loading(true));
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");
      await fetch(`${ENVS.url}/auth/changePassword`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
        method: "POST",
        body: JSON.stringify({ userId: userId, newPassword: newPassword }),
      });
      dispatch(loading(false));
      setNewPassword("");
      setConfirmNewPassword("");
      return Alert.alert(
        "Password changed.",
        "Your password has successfully been changed. This should take effect on next login.",
        [{ text: "Okay" }]
      );
    } catch (error) {
      if (error) {
        dispatch(err("Sorry we couldn't change your password."))
        dispatch(loading(false));
      }
    }
  };

  if (myError) {
    Alert.alert("Error", myError, [{text: 'Okay', onPress: () => onClearAuthError(dispatch)}])
  }

  return (
    <View style={styles.screen}>
      <View style={styles.infoHolder}>
        <Text style={styles.titleHolder}>User: </Text>
        <Text style={styles.textHolder}>
          {username === "" ? <Spinner /> : username}
        </Text>
      </View>
      <View style={styles.infoHolder}>
        <Text style={styles.titleHolder}>Email: </Text>
        <Text style={styles.textHolder}>
          {email === "" ? <Spinner /> : email}
        </Text>
      </View>
      <Text style={styles.generalText}>
        Think somebody knows your password? Reset it below.
      </Text>
      <View style={styles.changePasswordHolder}>
        <View style={styles.controller}>
          <CustomTextInput
            value={newPassword}
            onChangeText={onChangeNewPasswordHandler}
            placeholder="New password..."
            style={styles.textInput}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.controller}>
          <CustomTextInput
            value={confirmNewPassword}
            onChangeText={onChangeConfirmNewPasswordHandler}
            placeholder="Confirm new password..."
            style={styles.textInput}
            secureTextEntry={true}
          />
        </View>
      </View>
      <View style={styles.buttonHolder}>
        {isLoading ? (
          <Spinner />
        ) : (
          <CustomButton
            onPress={onConfirmPasswordChangeHandler}
            textStyle={styles.buttonText}
            touchStyle={styles.touch}
            text="Change Password"
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    flex: 1,
  },
  infoHolder: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
  titleHolder: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textHolder: {
    fontSize: 16,
  },
  generalText: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 5,
  },
  changePasswordHolder: {
    marginVertical: 10,
  },
  controller: {
    marginVertical: 20,
  },
  textInput: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingBottom: 5,
    fontSize: 16,
  },
  touch: {
    backgroundColor: Colors.primary,
    padding: 5,
    width: "60%",
    height: 50,
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonHolder: {
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Account;
