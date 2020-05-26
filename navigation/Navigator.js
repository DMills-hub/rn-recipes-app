import { createAppContainer, createSwitchNavigator } from "react-navigation";
import MainAppDrawerNavigator from "./MainAppDrawerNavigator";
import AuthStackNavigator from "./AuthStackNavigator";

const SwitchNavigator = createSwitchNavigator({
  Auth: {
    screen: AuthStackNavigator,
  },
  Recipes: {
    screen: MainAppDrawerNavigator,
  },
});

export default createAppContainer(SwitchNavigator);
