import React, { useState, ReactElement } from "react";
import { createStore, combineReducers, applyMiddleware, Store } from "redux";
import { Provider } from "react-redux";
import AuthReducer from "./store/reducers/auth";
import RecipesReducer from "./store/reducers/recipe";
import ReduxThunk from "redux-thunk";
import Navigator from "./navigation/Navigator";
import * as Font from "expo-font";
import { AppLoading } from "expo";

const rootReducer = combineReducers({
  auth: AuthReducer,
  recipes: RecipesReducer,
});

export type RootState = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = (): Promise<void> => {
  return Font.loadAsync({
    "lobster": require('./assets/fonts/Lobster-Regular.ttf')
  });
};

const App: React.FC = (): ReactElement => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setFontsLoaded(true)} />
  }

  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

export default App;
