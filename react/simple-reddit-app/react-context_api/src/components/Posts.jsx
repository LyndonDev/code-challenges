import React, { useContext, useEffect, useState } from 'react';

import FavoritesContext from '../context/FavoritesContext';
import * as favoritesActions from '../store/favorites.actions';

import PostItem from '../components/PostItem';

// For offline dev purposes
const devData = require('../dev-data.json');
const isLive = true;

const Posts = () => {
  const sortOptions = ['hot', 'ascending', 'descending'];

  const [favorites, dispatch] = useContext(FavoritesContext);

  const [sort, setSort] = useState(sortOptions[0]);
  const [subreddit, setSubreddit] = useState('');
  const [subredditInput, setSubredditInput] = useState('');
  const [isSubredditErr, setIsSubredditErr] = useState(false);
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    // Clear warning if user enters an invalid subreddit
    setIsSubredditErr(false);

    if (isLive) {
      let postsUri = `https://www.reddit.com/.json`;
      if (subreddit !== '') {
        postsUri = `https://www.reddit.com/r/${ subreddit }.json`;
      }
      fetch(postsUri)
        .then(response => response.json())
        .then(data => {
          // Apply sorting before updating posts variable
          let postData = data.data.children;
          if (sort === 'ascending') {
            postData.sort((a, b) => (a.data.ups > b.data.ups ? 1 : -1));
          } else if (sort === 'descending') {
            postData.sort((a, b) => (a.data.ups < b.data.ups ? 1 : -1));
          }
          setPosts(postData);
        })
        .catch(err => {
          // Invalid subreddit fetch will incur a CORS error
          setIsSubredditErr(true);
        });
    } else {
      setPosts(devData.data.children);
    }
  };

  // Listen to changes to sort or subreddit to fetch new data
  useEffect(() => {
    fetchPosts();
  }, [sort, subreddit]);

  const handleSubredditInput = (event) => {
    setSubredditInput(event.target.value.replace(' ', ''));
  };

  const handleSubredditSubmit = (event) => {
    event.preventDefault();
    setSubreddit(subredditInput);
  };

  const handleAddFavorite = (post) => {
    dispatch(favoritesActions.addFavorite(post));
  };

  const handleRemoveFavorite = (postId) => {
    dispatch(favoritesActions.removeFavorite(postId));
  };

  let PostsOutput = () => (
    <>
      <div>
        <label>Sort By:</label>
        <select value={ sort } onChange={ event => setSort(event.target.value) }>
          { sortOptions.map((sortOption) => (
            <option key={ sortOption }>{ sortOption }</option>
          )) }
        </select>
      </div>

      <ul>
        { posts.map(post => (
          <PostItem
            post={ post }
            key={ `post-${ post.data.id }` }
            isFavorite={ favorites.list.find(favorite =>
              favorite.data.id === post.data.id) }
            addFavorite={ handleAddFavorite }
            removeFavorite={ handleRemoveFavorite }
          />
        )) }
      </ul>
    </>
  );

  if (isSubredditErr) {
    PostsOutput = () => <div>Invalid Subreddit.</div>;
  } else if (!posts.length && !isSubredditErr) {
    PostsOutput = () => <div>No posts to show.</div>;
  }

  return (
    <section>
      <h1>Posts { subreddit ? `in /r/${ subreddit }` : '' }</h1>

      <div>
        <label>Favorite Action History:</label>
        <button
          type='button'
          onClick={ () => dispatch(favoritesActions.undoFavorite()) }
          disabled={ favorites.historyPos === 0 ? true : false }
        >
          &lsaquo; Undo
        </button>
        <button
          type='button'
          onClick={ () => dispatch(favoritesActions.redoFavorite()) }
          disabled={ favorites.historyPos === favorites.history.length - 1
            ? true : false }
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
