import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import MainAppDrawer from "./MainAppDrawerNavigator";
import AuthStack from "./AuthStackNavigator";
import { useSelector } from "react-redux";
import StartUpScreen from '../screens/startup/StartUp';


const MyNavigator = () => {
  const token = useSelector((state) => state.auth.token);
  const didTryLogin = useSelector(state =>  state.auth.didTryLogin);

  return (
    <NavigationContainer>
      {!token && !didTryLogin ? <StartUpScreen /> : null}
      {token ? <MainAppDrawer /> : null}
      {!token && didTryLogin ? <AuthStack /> : null}
    </NavigationContainer>
  );
};

export default MyNavigator;
