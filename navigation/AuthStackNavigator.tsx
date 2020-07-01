import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from "../screens/auth/Auth";
import React, { ReactElement } from "react";
import StackDefaultOptions from "./StackDefaultOptions";

export type AuthStackRouteParamList = {
  Auth: undefined,
}

const AuthStack = createStackNavigator<AuthStackRouteParamList>();

const MyStack: React.FC = (): ReactElement => {
  return (
    <AuthStack.Navigator screenOptions={StackDefaultOptions}>
      <AuthStack.Screen
        name="Auth"
        component={AuthScreen}
        options={{
          headerTitle: "Recipe & Me"
        }}
      />
    </AuthStack.Navigator>
  );
};

export default MyStack;
