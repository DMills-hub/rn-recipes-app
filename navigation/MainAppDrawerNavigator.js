import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import AllRecipesStack from "./AllRecipesStackNavigator";
import MyRecipesStack from "./MyRecipesStackNavigator";
import FavouritesStack from "./FavouriteRecipesStackNavigator";
import AccountStack from "./AccountStackNavigator";
import ConversionChartStack from "./ConversionChartStackNavigator";
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/auth";
import { reset } from "../store/actions/recipe";
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
              icon={() => <Ionicons name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"} size={23} />}
              style={{
                alignItems: "left",
                justifyContent: "center",
              }}
              label="Logout"
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
      <MainAppDrawer.Screen
        component={AccountStack}
        name="Account"
        options={() => {
          return {
            drawerIcon: () => (
              <Ionicons
                name={Platform.OS === "android" ? "md-person" : "ios-person"}
                size={23}
              />
            ),
          };
        }}
      />
      <MainAppDrawer.Screen
        component={ConversionChartStack}
        name="Conversion Chart"
        options={() => {
          return {
            drawerIcon: () => (
              <Ionicons
                size={23}
                name={
                  Platform.OS === "android"
                    ? "md-information-circle"
                    : "ios-information-circle"
                }
              />
            ),
          };
        }}
      />
    </MainAppDrawer.Navigator>
  );
};

export default MyStack;
