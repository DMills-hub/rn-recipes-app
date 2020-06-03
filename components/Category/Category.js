import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Text,
} from "react-native";

const Category = (props) => {
  return (
    <TouchableOpacity style={styles.touch} onPress={props.onPress}>
      <ImageBackground source={props.source} style={styles.imgBackground}>
        <Text style={styles.text}>{props.text}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touch: { padding: 20 },
  imgBackground: {
    width: "100%",
    height: 180,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    overflow: "hidden",
    borderColor: "black",
    borderWidth: 2,
  },
  text: {
    fontWeight: "bold",
    fontSize: 40,
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10,
  },
});

export default Category;
