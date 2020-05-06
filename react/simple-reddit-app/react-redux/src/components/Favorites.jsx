import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as favoriteActions from '../store/favorites.actions';

import PostItem from '../components/PostItem';

const Favorites = () => {
  const favorites = useSelector(state => state.list);
  const dispatch = useDispatch();

  const handleRemoveFavorite = (postId) => {
    dispatch(favoriteActions.removeFavorite(postId));
  };

  return (
    <section>
      <h3>Favorites</h3>

      { favorites.length ? (
        <ul>
          { favorites.map(post => (
            <PostItem
              post={ post }
              key={ `favorite-${ post.data.id }` }
              isFavorite={ true }
              removeFavorite={ handleRemoveFavorite }
            />
          )) }
        </ul>
      ) : (
        <div>No favorites to show.</div>
      ) }
    </section>
  );
};

export default Favorites;
