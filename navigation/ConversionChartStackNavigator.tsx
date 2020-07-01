import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StackDefault from "./StackDefaultOptions";
import ConversionChart from "../screens/recipes/ConversionChart";
import CustomHeaderButton from '../components/CustomHeaderButton/CustomHeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

const ConversionChartStack = createStackNavigator();

const MyStack = () => {
  return (
    <ConversionChartStack.Navigator screenOptions={StackDefault}>
      <ConversionChartStack.Screen
        name="Conversion Chart"
        component={ConversionChart}
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
    </ConversionChartStack.Navigator>
  );
};

export default MyStack;
