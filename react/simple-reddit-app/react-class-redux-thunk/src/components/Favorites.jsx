import React from 'react';
import { connect } from 'react-redux';

import * as favoriteActions from '../store/favorites.actions';

import PostItem from '../components/PostItem';

const Favorites = ({ favorites, removeFavorite }) => (
  <section>
    <h3>Favorites</h3>

    { favorites.length ? (
      <ul>
        { favorites.map(post => (
          <PostItem
            post={ post }
            key={ `favorite-${ post.data.id }` }
            isFavorite={ true }
            removeFavorite={ removeFavorite }
          />
        )) }
      </ul>
    ) : (
      <div>No favorites to show.</div>
    ) }
  </section>
);

const mapStateToProps = (state) => ({
  favorites: state.favorites.list,
});

const mapDispatchToProps = (dispatch) => ({
  removeFavorite: (postId) => dispatch(favoriteActions.removeFavorite(postId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
