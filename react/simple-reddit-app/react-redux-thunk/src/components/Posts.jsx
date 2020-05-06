import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as favoriteActions from '../store/favorites.actions';
import { fetchPosts } from '../store/posts.actions';
import PostItem from '../components/PostItem';

const Posts = () => {
  const sortOptions = ['hot', 'ascending', 'descending'];

  const [sort, setSort] = useState(sortOptions[0]);
  const [subreddit, setSubreddit] = useState('');
  const [subredditInput, setSubredditInput] = useState('');
  const [posts, isFetching, isSubredditErr] = useSelector(state => [
    state.posts.list,
    state.posts.isFetching,
    state.posts.isSubredditErr,
  ]);

  const [favorites, historyPos, historyLength] = useSelector(state => [
    state.favorites.list,
    state.favorites.historyPos,
    state.favorites.history.length,
  ]);

  const dispatch = useDispatch();

  // Listen to changes to sort or subreddit to fetch new data
  useEffect(() => {
    dispatch(fetchPosts(subreddit, sort));
  }, [subreddit, sort, dispatch]);

  const handleSubredditInput = (event) => {
    setSubredditInput(event.target.value.replace(' ', ''));
  };

  const handleSubredditSubmit = (event) => {
    event.preventDefault();
    setSubreddit(subredditInput);
  };

  const handleAddFavorite = (post) => {
    dispatch(favoriteActions.addFavorite(post));
  };

  const handleRemoveFavorite = (postId) => {
    dispatch(favoriteActions.removeFavorite(postId));
  };

  let PostsOutput = () => (
    <>
      <div>
        <label>Sort By:</label>
        <select value={ sort } onChange={ (event) => setSort(event.target.value) }>
          { sortOptions.map(sortOption => (
            <option key={ sortOption }>{ sortOption }</option>
          )) }
        </select>
      </div>

      <ul>
        { posts.map(post => (
          <PostItem
            post={ post }
            key={ `post-${ post.data.id }` }
            isFavorite={ favorites.find(favorite =>
              favorite.data.id === post.data.id) }
            addFavorite={ handleAddFavorite }
            removeFavorite={ handleRemoveFavorite }
          />
        )) }
      </ul>
    </>
  );

  if (isFetching) {
    PostsOutput = () => <div>Loading posts...</div>;
  } else if (!isFetching && isSubredditErr) {
    PostsOutput = () => <div>Invalid Subreddit.</div>;
  } else if (!isFetching && !isSubredditErr && !posts.length) {
    PostsOutput = () => <div>No posts to show.</div>;
  }

  return (
    <section>
      <h1>Posts { subreddit ? `in /r/${ subreddit }` : '' }</h1>

      <div>
        <label>Favorite Action History:</label>
        <button
          type='button'
          onClick={ () => dispatch(favoriteActions.undoFavorite()) }
          disabled={ historyPos === 0 ? true : false }
        >
          &lsaquo; Undo
        </button>
        <button
          type='button'
          onClick={ () => dispatch(favoriteActions.redoFavorite()) }
          disabled={ historyPos === historyLength - 1 ? true : false }
        >
          Redo &rsaquo;
        </button>
      </div>

      <form onSubmit={ handleSubredditSubmit }>
        <label>Go to Subreddit:</label>
        <input value={ subredditInput } onChange={ handleSubredditInput } />
        <button type='submit'>Go</button>
      </form>

      <PostsOutput />
    </section>
  );
};

export default Posts;
