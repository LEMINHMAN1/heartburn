import QuestionPage from 'modules/page/question';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import rootReducer from "reducers";
import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from 'redux-thunk';
import PrivateRoute from './PrivateRoute';

function configureStore(initialState = {}) {
  const enhancer = compose(applyMiddleware(thunkMiddleware))
  
  const store = createStore(rootReducer, initialState, enhancer);
  return store;
}

const store = configureStore({})

export const RouteContext = React.createContext([{}, () => { }]);

export default () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <PrivateRoute exact path='/' component={QuestionPage}/>
        </Switch>
      </Router>
    </Provider>
  );
}