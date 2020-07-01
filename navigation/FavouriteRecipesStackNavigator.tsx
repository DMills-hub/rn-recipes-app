import { createStackNavigator } from "@react-navigation/stack";
import StackDefaultOptions from "./StackDefaultOptions";
import FavouritesScreen from "../screens/recipes/Favourites";
import ViewRecipeScreen from "../screens/recipes/ViewRecipe";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton/CustomHeaderButton';
import React from "react";
import { Platform } from 'react-native';

export type FavouriteRecipesRouteParamList = {
  Favourites: undefined,
  ViewRecipe: undefined
}

const FavouriteRecipesStack = createStackNavigator<FavouriteRecipesRouteParamList>();

const MyStack: React.FC = (): JSX.Element => {
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
      <FavouriteRecipesStack.Screen name="ViewRecipe" component={ViewRecipeScreen} />
    </FavouriteRecipesStack.Navigator>
  );
};

export default MyStack;
