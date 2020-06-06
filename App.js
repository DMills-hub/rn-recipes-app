import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider, useDispatch } from "react-redux";
import AuthReducer from "./store/reducers/auth";
import RecipesReducer from "./store/reducers/recipe";
import ReduxThunk from "redux-thunk";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import AllRecipesStack from "./navigation/AllRecipesStackNavigator";
import MyRecipesStack from "./navigation/MyRecipesStackNavigator";
import Colors from "./constants/Colors";
import { logout } from "./store/actions/auth";
import Navigator from './navigation/Navigator';


const rootReducer = combineReducers({
  auth: AuthReducer,
  recipes: RecipesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));


const App = () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

export default App;
