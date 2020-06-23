import { createStackNavigator } from '@react-navigation/stack';
import FaqScreen from '../screens/recipes/Faq';
import StackDefault from './StackDefaultOptions';
import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton/CustomHeaderButton';

const FaqStackNavigator = createStackNavigator();

const MyStack = () => {
    return (
        <FaqStackNavigator.Navigator screenOptions={StackDefault} >
            <FaqStackNavigator.Screen component={FaqScreen} name="Faq" options={({ navigation }) => {
          return {
            headerTitle: "FAQ",
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
        </FaqStackNavigator.Navigator>
    )
}

export default MyStack;