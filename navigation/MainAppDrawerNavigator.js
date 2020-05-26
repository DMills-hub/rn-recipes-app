import { createDrawerNavigator } from 'react-navigation-drawer';
import AllRecipesStackNavigator from './AllRecipesStackNavigator';
import MyRecipesStackNavigator from './MyRecipesStackNavigator';

const MainAppDrawerNavigator = createDrawerNavigator({
  AllRecipes: {
    screen: AllRecipesStackNavigator,
    navigationOptions: {
      title: "All Recipes"
    }
  },
  MyRecipes: {
    screen: MyRecipesStackNavigator,
    navigationOptions: {
      title: "My Recipes"
    }
  }
})

export default MainAppDrawerNavigator;