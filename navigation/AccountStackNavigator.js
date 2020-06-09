import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StackDefault from "./StackDefaultOptions";
import AccountScreen from "../screens/auth/Account";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton/CustomHeaderButton';

const AccountStack = createStackNavigator();

const MyStack = () => {
  return (
    <AccountStack.Navigator screenOptions={StackDefault}>
      <AccountStack.Screen component={AccountScreen} name="Account" options={({ navigation }) => {
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
        }} />
    </AccountStack.Navigator>
  );
};

export default MyStack;
