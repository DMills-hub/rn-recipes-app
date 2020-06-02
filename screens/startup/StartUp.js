import React, { useEffect } from "react";
import Spinner from "../../components/Spinner/Spinner";
import { View, StyleSheet, AsyncStorage } from "react-native";
import { useDispatch } from "react-redux";
import { autoLogin, err } from "../../store/actions/auth";

const StartUp = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getUser = async () => {
      try {
        await dispatch(autoLogin());
      } catch (err) {
        dispatch(err(err));
      }
    };
    getUser();
  }, [AsyncStorage]);

  return (
    <View style={styles.screen}>
      <Spinner />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default StartUp;
