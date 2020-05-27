import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from "react-navigation-drawer";
import AllRecipesStackNavigator from "./AllRecipesStackNavigator";
import MyRecipesStackNavigator from "./MyRecipesStackNavigator";
import React from "react";
import { View, SafeAreaView, Button } from "react-native";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/auth";

const MainAppDrawerNavigator = createDrawerNavigator(
  {
    AllRecipes: {
      screen: AllRecipesStackNavigator,
      navigationOptions: {
        title: "All Recipes",
      },
    },
    MyRecipes: {
      screen: MyRecipesStackNavigator,
      navigationOptions: {
        title: "My Recipes",
      },
    },
  },
  {
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerNavigatorItems {...props} />
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={async () => {
                try {
                  await dispatch(logout());
                  props.navigation.navigate("Auth");
                } catch (err) {
                  console.log(err);
                }
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
  }
);

export default MainAppDrawerNavigator;
