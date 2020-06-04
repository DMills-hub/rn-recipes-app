import { createStackNavigator } from "@react-navigation/stack";
import StackDefaultOptions from "./StackDefaultOptions";
import FavouritesScreen from "../screens/recipes/Favourites";
import ViewRecipeScreen from "../screens/recipes/ViewRecipe";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton/CustomHeaderButton';
import React from "react";

const FavouriteRecipesStack = createStackNavigator();

const MyStack = () => {
  return (
    <FavouriteRecipesStack.Navigator screenOptions={StackDefaultOptions}>
      <FavouriteRecipesStack.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={({ navigation }) => {
          return {
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
      <FavouriteRecipesStack.Screen name="View Recipe" component={ViewRecipeScreen} />
    </FavouriteRecipesStack.Navigator>
  );
};

export default MyStack;
