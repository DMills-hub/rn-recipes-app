import AllRecipesScreen from "../screens/recipes/AllRecipes";
import StackDefaultOptions from "./StackDefaultOptions";
import CustomHeaderButton from "../components/CustomHeaderButton/CustomHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import React, { ReactElement } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ViewRecipesScreen from "../screens/recipes/ViewRecipe";
import LoadCategoryScreen from "../screens/recipes/LoadCategory";
import { Platform } from "react-native";

export type AllRecipesStackParamList = {
  AllRecipes: undefined,
  Category: {
    category: string,
    name: string
  },
  ViewRecipe: undefined
};

const AllRecipesStackNavigator = createStackNavigator<AllRecipesStackParamList>();

const MyStack: React.FC = (): ReactElement => {
  return (
    <AllRecipesStackNavigator.Navigator screenOptions={StackDefaultOptions}>
      <AllRecipesStackNavigator.Screen
        name="AllRecipes"
        component={AllRecipesScreen}
        options={({ navigation }) => {
          return {
            headerTitle: "All Recipes",
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
      <AllRecipesStackNavigator.Screen
        name="Category"
        component={LoadCategoryScreen}
      />
      <AllRecipesStackNavigator.Screen
        name="ViewRecipe"
        component={ViewRecipesScreen}
      />
    </AllRecipesStackNavigator.Navigator>
  );
};

export default MyStack;
