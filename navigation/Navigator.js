import { createAppContainer, createSwitchNavigator } from "react-navigation";
import MainAppDrawerNavigator from "./MainAppDrawerNavigator";
import AuthStackNavigator from "./AuthStackNavigator";
import StartUpScreen from '../screens/startup/StartUp';

const SwitchNavigator = createSwitchNavigator({
  StartUp: {
    screen: StartUpScreen
  },
  Auth: {
    screen: AuthStackNavigator,
  },
  Recipes: {
    screen: MainAppDrawerNavigator,
  },
});

export default createAppContainer(SwitchNavigator);
