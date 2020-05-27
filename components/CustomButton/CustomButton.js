import React from "react";
import { TouchableOpacity, Text } from "react-native";

const CustomButton = (props) => {
  return (
    <TouchableOpacity style={props.touchStyle} onPress={props.onPress}>
      <Text style={props.textStyle} >{props.text}</Text>
    </TouchableOpacity>
  )
};

export default CustomButton;
