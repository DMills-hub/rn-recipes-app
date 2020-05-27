import React, { useEffect } from "react";
import Spinner from "../../components/Spinner/Spinner";
import { View, StyleSheet, AsyncStorage } from "react-native";

const StartUp = (props) => {
  useEffect(() => {
    const getUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const id = await AsyncStorage.getItem("userId");
        const username = await AsyncStorage.getItem("username");
        if (!token || !id || !username) return props.navigation.navigate("Auth");
        props.navigation.navigate("Recipes", {
          userId: id,
          token: token,
          username: username,
        });
      } catch (err) {
        props.navigation.navigate("Auth");
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
