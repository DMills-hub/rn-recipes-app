import React from "react";
import { TextInput } from "react-native";

const CustomTextInput: React.FC<any> = (props): JSX.Element => {
  return (
    <TextInput {...props} />
  );
};



export default CustomTextInput;
