import { createStackNavigator } from "react-navigation-stack";
import MyRecipesScreen from "../screens/recipes/MyRecipes";
import StackDefaultOptions from "./StackDefaultOptions";
import CustomHeaderButton from "../components/CustomHeaderButton/CustomHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import React from "react";
import { Platform } from "react-native";
import AddRecipesScreen from '../screens/recipes/AddRecipe';

const MyRecipesStackNavigator = createStackNavigator(
  {
    MyRecipes: {
      screen: MyRecipesScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: "My Recipes",
          headerLeft: () => {
            return (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  onPress={() => navigation.toggleDrawer()}
                  iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                />
              </HeaderButtons>
            );
          },
          headerRight: () => {
            return (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
                  onPress={() => navigation.navigate("AddRecipe")}
                />
              </HeaderButtons>
            );
          },
        };
      },
    },
    AddRecipe: {
      screen: AddRecipesScreen,
      navigationOptions: () => {
        return {
          headerTitle: "Add Recipe"
        }
      }
    }
  },
  {
    defaultNavigationOptions: StackDefaultOptions,
  }
);

export default MyRecipesStackNavigator;
