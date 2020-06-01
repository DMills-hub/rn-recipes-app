import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Recipe = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.6} style={styles.recipeHolder}>
      <View style={styles.imageHolder}>
        <Image style={styles.image} source={{ uri: props.imageUri }} />
      </View>
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  recipeHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10
  },
  imageHolder: {
    width: 60,
    height: 60,
    overflow: "hidden",
    borderRadius: 30,
    marginRight: 10
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18
  }
});

export default Recipe;
