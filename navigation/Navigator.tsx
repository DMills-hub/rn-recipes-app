import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import MainAppDrawer from "./MainAppDrawerNavigator";
import AuthStack from "./AuthStackNavigator";
import { useSelector } from "react-redux";
import StartUpScreen from '../screens/startup/StartUp';
import { RootState } from '../App';

const MyNavigator: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const didTryLogin = useSelector((state: RootState) =>  state.auth.didTryLogin);

  return (
    <NavigationContainer>
      {!token && !didTryLogin ? <StartUpScreen /> : null}
      {token ? <MainAppDrawer /> : null}
      {!token && didTryLogin ? <AuthStack /> : null}
    </NavigationContainer>
  );
};

export default MyNavigator;
