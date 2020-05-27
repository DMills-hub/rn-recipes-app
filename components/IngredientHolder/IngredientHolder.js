import React from "react";
import { StyleSheet, View, Text } from "react-native";
import CustomTextInput from '../CustomTextInput/CustomTextInput';

const IngredientHolder = (props) => {
  return (
    <View style={styles.ingredientHolder}>
      <Text style={styles.ingredientNumber}>{props.number}.</Text>
      <CustomTextInput style={styles.ingredientAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  ingredientHolder: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    padding: 10
  },
  ingredientNumber: {
    fontSize: 16,
    fontWeight: "bold",
    paddingRight: 2,
  },
  ingredientAdd: {
    borderColor: "black",
    borderWidth: 1,
    width: "90%",
    paddingLeft: 5,
  },
});

export default IngredientHolder;
