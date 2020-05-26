import { createStackNavigator } from 'react-navigation-stack';
import AllRecipesScreen from '../screens/AllRecipes';

const MainAppStackNavigator = createStackNavigator({
  AllRecipes: {
    screen: AllRecipesScreen
  }
})

export default MainAppStackNavigator;