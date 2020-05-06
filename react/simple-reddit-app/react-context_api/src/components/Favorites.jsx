import React, { useContext } from 'react';

import FavoritesContext from '../context/FavoritesContext';

import * as favoritesActions from '../store/favorites.actions';

import PostItem from '../components/PostItem';

const Favorites = () => {
  const [favorites, dispatch] = useContext(FavoritesContext);

  const handleRemoveFavorite = (postId) => {
    dispatch(favoritesActions.removeFavorite(postId));
  };

  return (
    <section>
      <h3>Favorites</h3>

      { favorites.list.length ? (
        <ul>
          { favorites.list.map(post => (
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
