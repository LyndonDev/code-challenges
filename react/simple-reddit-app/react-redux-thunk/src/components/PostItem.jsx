import React from 'react';

const PostItem = ({ post, isFavorite, addFavorite, removeFavorite }) => (
  <li>
    <a href={ post.data.url } target='_blank' rel='noopener noreferrer'>
      { post.data.title }
    </a>
    { ' | ' }
    { post.data.ups } upvotes
    { ' | ' }
    { isFavorite ? (
      <span onClick={ () => removeFavorite(post.data.id) }>X</span>
    ) : (
      <span onClick={ () => addFavorite(post) }>★</span>
    ) }
  </li>
);

export default PostItem;
