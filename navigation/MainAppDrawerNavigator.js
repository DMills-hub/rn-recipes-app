import { createDrawerNavigator } from 'react-navigation-drawer';
import AllRecipesScreen from '../screens/AllRecipes';
import MainAppStackNavigator from './MainAppStackNavigator';

const MainAppDrawerNavigator = createDrawerNavigator({
  MainAppStack: {
    screen: MainAppStackNavigator
  }
})

export default MainAppDrawerNavigator;