import { combineReducers } from 'redux';

import postsReducer from './posts.reducers';
import favoritesReducer from './favorites.reducers';

export default combineReducers({
  posts: postsReducer,
  favorites: favoritesReducer,
});
