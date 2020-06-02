import MyRecipesScreen from "../screens/recipes/MyRecipes";
import StackDefaultOptions from "./StackDefaultOptions";
import CustomHeaderButton from "../components/CustomHeaderButton/CustomHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import React from "react";
import { Platform } from "react-native";
import AddRecipesScreen from "../screens/recipes/AddRecipe";
import { createStackNavigator } from "@react-navigation/stack";

const MyRecipesStack = createStackNavigator();

const MyStack = () => {
  return (
    <MyRecipesStack.Navigator screenOptions={StackDefaultOptions}>
      <MyRecipesStack.Screen
        name="My Recipes"
        component={MyRecipesScreen}
        options={({ navigation }) => {
          return {
            headerTitle: "My Recipes",
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
            headerRight: () => {
              return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                  <Item
                    iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
                    onPress={() => navigation.navigate("Add Recipe")}
                  />
                </HeaderButtons>
              );
            },
          };
        }}
      />
      <MyRecipesStack.Screen name="Add Recipe" component={AddRecipesScreen} />
    </MyRecipesStack.Navigator>
  );
};

export default MyStack;
