import AllRecipesScreen from "../screens/recipes/AllRecipes";
import StackDefaultOptions from "./StackDefaultOptions";
import CustomHeaderButton from "../components/CustomHeaderButton/CustomHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ViewRecipesScreen from "../screens/recipes/ViewRecipe";
import LoadCategoryScreen from "../screens/recipes/LoadCategory";
import { Platform } from "react-native";

const AllRecipesStackNavigator = createStackNavigator();

const MyStack = () => {
  return (
    <AllRecipesStackNavigator.Navigator screenOptions={StackDefaultOptions}>
      <AllRecipesStackNavigator.Screen
        name="All Recipes"
        component={AllRecipesScreen}
        options={({ navigation }) => {
          return {
            headerTitle: "All Recipes",
            headerLeft: () => {
              return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                  <Item
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
      <AllRecipesStackNavigator.Screen
        name="Category"
        component={LoadCategoryScreen}
      />
      <AllRecipesStackNavigator.Screen
        name="View Recipe"
        component={ViewRecipesScreen}
      />
    </AllRecipesStackNavigator.Navigator>
  );
};

export default MyStack;
