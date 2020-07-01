import React, { useEffect, ReactElement } from "react";
import Spinner from "../../components/Spinner/Spinner";
import { View, StyleSheet, AsyncStorage } from "react-native";
import { useDispatch } from "react-redux";
import { autoLogin } from "../../store/actions/auth";

const StartUp: React.FC = (): ReactElement => {
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
