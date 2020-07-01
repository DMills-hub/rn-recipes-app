import React from "react";
import { HeaderButton, HeaderButtonProps } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

const CustomHeaderButton: React.FC<HeaderButtonProps> = (props: HeaderButtonProps): JSX.Element => {
  return (
    <HeaderButton
      {...props}
      iconSize={23}
      color={props.iconName === "ios-heart" || props.iconName === "md-heart" ? "red" : "white"}
      IconComponent={Ionicons}
    />
  );
};

export default CustomHeaderButton;
