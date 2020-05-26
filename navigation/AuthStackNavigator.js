import { createStackNavigator } from 'react-navigation-stack';
import StackDefaultOptions from './StackDefaultOptions';
import AuthScreen from '../screens/auth/Auth';

const AuthStackNavigator = createStackNavigator({
  Auth: {
    screen: AuthScreen
  }
}, {
  defaultNavigationOptions: StackDefaultOptions
})

export default AuthStackNavigator;