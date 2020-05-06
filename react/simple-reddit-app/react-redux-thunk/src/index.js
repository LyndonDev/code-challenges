import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './store/root.reducer';

import Posts from './components/Posts';
import Favorites from './components/Favorites';

import './style.css';

const middlewares = [thunk];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares),
);

const App = () => {
  return (
    <Provider store={ store }>
      <Posts />
      <Favorites />
    </Provider>
  );
};

render(<App />, document.getElementById('root'));
