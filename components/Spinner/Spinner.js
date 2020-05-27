import React from "react";
import { ActivityIndicator } from "react-native";
import Colors from "../../constants/Colors";

const Spinner = (props) => {
  return <ActivityIndicator size="large" color={Colors.success} />;
};

export default Spinner;
