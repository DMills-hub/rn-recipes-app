import React from "react";
import Navigator from "./navigation/Navigator";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import AuthReducer from './store/reducers/auth';
import ReduxThunk from 'redux-thunk';

const rootReducer = combineReducers({
  auth: AuthReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

const App = () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

export default App;
