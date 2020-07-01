import MyRecipesScreen from "../screens/recipes/MyRecipes";
import StackDefaultOptions from "./StackDefaultOptions";
import CustomHeaderButton from "../components/CustomHeaderButton/CustomHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import React, { ReactElement } from "react";
import { Platform } from "react-native";
import AddRecipesScreen from "../screens/recipes/AddRecipe";
import EditRecipesScreen from '../screens/recipes/EditRecipe';
import { createStackNavigator } from "@react-navigation/stack";
import ViewRecipesScreen from "../screens/recipes/ViewRecipe";

interface Instruction {
  id: number | string,
  instruction: string
}

interface Ingredient {
  id: number | string,
  ingredient: string
}

export type MyRecipeStackParamList = {
  MyRecipes: undefined;
  AddRecipe: undefined;
  EditRecipe: {
    recipeId: string | number,
    title: string,
    image: string,
    cooktime: string,
    preptime: string,
    serving: string,
    instructions: Instruction[],
    ingredients: Ingredient[],
    category: string
  };
  ViewRecipe: {
    title: string,
    image: string,
    instructions: Instruction[],
    ingredients: Ingredient[],
    cookTime: string,
    prepTime: string,
    serves: string,
    recipeId: number | string,
    fromMyRecipe: boolean,
    isReviewed: boolean
  }
};

const MyRecipesStack = createStackNavigator<MyRecipeStackParamList>();

const MyStack: React.FC = (): JSX.Element => {
  return (
    <MyRecipesStack.Navigator screenOptions={StackDefaultOptions}>
      <MyRecipesStack.Screen
        name="MyRecipes"
        component={MyRecipesScreen}
        options={({ navigation }) => {
          return {
            headerTitle: "My Recipes",
            headerLeft: () => {
              return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                  <Item
                    title="Menu"
                    onPress={() => navigation.toggleDrawer()}
                    iconName={
                      Platform.OS === "android" ? "md-menu" : "ios-menu"
                    }
                  />
                </HeaderButtons>
              );
            },
          };
        }}
      />
      <MyRecipesStack.Screen name="AddRecipe" component={AddRecipesScreen} />
      <MyRecipesStack.Screen
        name="ViewRecipe"
        component={ViewRecipesScreen}
      />
      <MyRecipesStack.Screen name="EditRecipe" component={EditRecipesScreen} />
    </MyRecipesStack.Navigator>
  );
};

export default MyStack;
