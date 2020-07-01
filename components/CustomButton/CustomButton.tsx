import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Icon } from "react-native-elements";

interface CustomButtonProps {
  touchStyle: Object | undefined,
  onPress: () => void,
  textStyle: Object | undefined,
  text: any
}

const CustomButton: React.FC<CustomButtonProps> = (props): JSX.Element => {
  return (
    <TouchableOpacity style={props.touchStyle} onPress={props.onPress}>
      <Text style={props.textStyle} >{props.text}</Text>
    </TouchableOpacity>
  )
};

export default CustomButton;
