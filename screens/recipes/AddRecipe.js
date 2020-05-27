import React from "react";
import { StyleSheet, View, Text, Platform, FlatList } from "react-native";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import Colors from "../../constants/Colors";
import IngredientHolder from "../../components/IngredientHolder/IngredientHolder";
import { useSelector, useDispatch } from "react-redux";
import { addIngredient } from "../../store/actions/recipe";

const AddRecipe = (props) => {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.recipes.ingredients);

  const onAddIngredientHandler = () => {
    if (ingredients.length > 0 && ingredients[ingredients.length - 1].ing === "") return console.log('cant do that')
    dispatch(addIngredient());
  };

  return (
    <View style={styles.screen}>
      
        <View style={styles.title}>
          <Text style={styles.titleText}>Title</Text>
          <CustomTextInput />
        </View>
        <View style={styles.button}>
          <View style={styles.btnContainer}>
            <CustomButton
              touchStyle={styles.touch}
              text="Take Picture"
              textStyle={styles.btnText}
            />
          </View>
          <View style={styles.btnContainer}>
            <CustomButton
              touchStyle={styles.touch}
              text="Choose from Gallery"
              textStyle={styles.btnText}
            />
          </View>
        </View>
        <View style={styles.ingredientAddContainer}>
          <CustomButton
            touchStyle={{ ...styles.touch, ...{ marginBottom: 10 } }}
            text="Add Ingredient"
            textStyle={styles.btnText}
            onPress={onAddIngredientHandler}
          />
          <FlatList keyExtractor={item => item.number} data={ingredients} renderItem={({item}) => <IngredientHolder number={item.number} />} />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  addRecipeContainer: {
    height: "100%",
    alignItems: "center",
  },
  title: {
    justifyContent: "center",
    width: "60%",
    paddingTop: 15,
    paddingBottom: 15,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 17,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnContainer: {
    width: "40%",
    paddingLeft: 10,
    paddingRight: 10,
  },
  btn: {
    fontSize: 5,
  },
  btnText: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
    color: Platform.OS === "android" ? "white" : Colors.primary,
  },
  touch: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "white",
    padding: 5,
    width: "100%",
    height: 50,
    justifyContent: "center",
  },
  ingredientAddContainer: {
    width: "80%",
    padding: 10,
    height: 500
  },
});

export default AddRecipe;
