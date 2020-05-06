import React, { useReducer } from 'react';
import { render } from 'react-dom';

import FavoritesContext from './context/FavoritesContext';
import reducer, { initialState } from './store/favorites.reducers';
import Posts from './components/Posts';
import Favorites from './components/Favorites';

import './style.css';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FavoritesContext.Provider value={ [state, dispatch] }>
      <Posts />
      <Favorites />
    </FavoritesContext.Provider>
  );
};

render(<App />, document.getElementById('root'));
