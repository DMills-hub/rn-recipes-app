import { createStackNavigator } from "react-navigation-stack";
import AllRecipesScreen from "../screens/AllRecipes";
import Colors from "../constants/Colors";
import { Platform } from "react-native";
import CustomHeaderButton from "../components/CustomHeaderButton/CustomHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import React from 'react';

const MainAppDefaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "white",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const MainAppStackNavigator = createStackNavigator(
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
    defaultNavigationOptions: MainAppDefaultNavOptions,
  }
);

export default MainAppStackNavigator;
