import React from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import CustomTextInput from "../CustomTextInput/CustomTextInput";
import CustomButton from "../CustomButton/CustomButton";
import { Ionicons } from "@expo/vector-icons";

interface IngredientHolderProps {
  customPlaceholder: string,
  onChangeText: (text: string) => void,
  value: string,
  delete: () => void
}

const IngredientHolder: React.FC<IngredientHolderProps> = (props): JSX.Element => {
  return (
    <View style={styles.ingredientHolder}>
      <Text style={styles.ingredientNumber}>-</Text>
      <CustomTextInput
        placeholder={props.customPlaceholder}
        onChangeText={props.onChangeText}
        style={styles.ingredientAdd}
        value={props.value}
        multiline
      />
      <CustomButton
        text={
          <Ionicons
            size={23}
            name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
          />
        }
        onPress={props.delete}
        textStyle={{}}
        touchStyle={{}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ingredientHolder: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  ingredientNumber: {
    fontSize: 16,
    fontWeight: "bold",
    paddingRight: 2,
  },
  ingredientAdd: {
    width: "90%",
    paddingLeft: 5,
  },
});

export default IngredientHolder;
