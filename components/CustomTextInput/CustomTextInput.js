import React from "react";
import { StyleSheet, TextInput } from "react-native";

const CustomTextInput = (props) => {
  return (
    <TextInput {...props} style={{ ...props.style, ...styles.textInput }} />
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
});

export default CustomTextInput;
