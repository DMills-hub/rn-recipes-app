import { createStackNavigator } from "react-navigation-stack";
import AllRecipesScreen from "../screens/recipes/AllRecipes";
import StackDefaultOptions from './StackDefaultOptions';
import CustomHeaderButton from "../components/CustomHeaderButton/CustomHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import React from 'react';

const AllRecipesStackNavigator = createStackNavigator(
  {
    AllRecipes: {
      screen: AllRecipesScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: "All Recipes",
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
        };
      },
    },
  },
  {
    defaultNavigationOptions: StackDefaultOptions,
  }
);

export default AllRecipesStackNavigator;
