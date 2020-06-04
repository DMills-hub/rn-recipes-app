import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import AllRecipesStack from "./AllRecipesStackNavigator";
import MyRecipesStack from "./MyRecipesStackNavigator";
import FavouritesStack from './FavouriteRecipesStackNavigator';
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/auth";
import { reset } from "../store/actions/recipe";
import Colors from "../constants/Colors";
import React from "react";

const MainAppDrawer = createDrawerNavigator();

const MyStack = () => {
  const dispatch = useDispatch();
  return (
    <MainAppDrawer.Navigator
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              style={{
                flex: 1,
                backgroundColor: Colors.primary,
                alignItems: "center",
                justifyContent: "center",
              }}
              label="Logout"
              labelStyle={{
                fontWeight: "bold",
                color: "white",
                padding: 20,
              }}
              onPress={() => {
                dispatch(logout());
                dispatch(reset());
              }}
            />
          </DrawerContentScrollView>
        );
      }}
    >
      <MainAppDrawer.Screen component={AllRecipesStack} name="All Recipes" />
      <MainAppDrawer.Screen component={MyRecipesStack} name="My Recipes" />
      <MainAppDrawer.Screen component={FavouritesStack} name="Favourites" />
    </MainAppDrawer.Navigator>
  );
};

export default MyStack;
