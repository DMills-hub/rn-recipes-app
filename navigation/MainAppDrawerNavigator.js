import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import AllRecipesStack from "./AllRecipesStackNavigator";
import MyRecipesStack from "./MyRecipesStackNavigator";
import FavouritesStack from "./FavouriteRecipesStackNavigator";
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/auth";
import { reset } from "../store/actions/recipe";
import Colors from "../constants/Colors";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

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
      <MainAppDrawer.Screen
        component={AllRecipesStack}
        name="All Recipes"
        options={() => {
          return {
            drawerIcon: () => (
              <Ionicons
                name={Platform.OS === "android" ? "md-book" : "ios-book"}
                size={23}
              />
            ),
          };
        }}
      />
      <MainAppDrawer.Screen
        component={MyRecipesStack}
        name="My Recipes"
        options={() => {
          return {
            drawerIcon: () => (
              <Ionicons
                name={Platform.OS === "android" ? "md-albums" : "ios-albums"}
                size={23}
              />
            ),
          };
        }}
      />
      <MainAppDrawer.Screen
        component={FavouritesStack}
        name="Favourites"
        options={() => {
          return {
            drawerIcon: () => (
              <Ionicons
                name={Platform.OS === "android" ? "md-heart" : "ios-heart"}
                size={23}
              />
            ),
          };
        }}
      />
    </MainAppDrawer.Navigator>
  );
};

export default MyStack;
