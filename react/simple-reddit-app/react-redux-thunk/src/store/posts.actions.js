export const SET_IS_FETCHING_POSTS = 'SET_IS_FETCHING_POSTS';
export const SET_IS_SUBREDDIT_ERR = 'SET_IS_SUBREDDIT_ERR';
export const SET_POSTS = 'SET_POSTS';

// For offline dev purposes
const devData = require('../dev-data.json');
const isLive = true;

export const setIsFetchingPosts = (isFetching) => {
  return {
    type: SET_IS_FETCHING_POSTS,
    isFetching,
  };
};

export const setIsSubredditErr = (isErr) => {
  return {
    type: SET_IS_SUBREDDIT_ERR,
    isErr,
  };
};

export const setPosts = (posts) => {
  return {
    type: SET_POSTS,
    posts,
  };
};

const sortPosts = (postData, sort) => {
  if (sort === 'ascending') {
    postData.sort((a, b) => a.data.ups > b.data.ups ? 1 : -1);
  } else if (sort === 'descending') {
    postData.sort((a, b) => a.data.ups < b.data.ups ? 1 : -1);
  }
  return postData;
};

export const fetchPosts = (subreddit, sort) => {
  return (dispatch) => {
    if (isLive) {
      let postsUri = `https://www.reddit.com/.json`;
      if (subreddit) {
        postsUri = `https://www.reddit.com/r/${ subreddit }.json`;
      }

      dispatch(setIsSubredditErr(false));
      dispatch(setIsFetchingPosts(true));

      fetch(postsUri)
        .then((response) => response.json())
        .then((data) => {
          // Apply sorting before updating posts variable
          const postData = sortPosts(data.data.children, sort);

          dispatch(setIsFetchingPosts(false));
          dispatch(setPosts(postData));
        })
        .catch(err => {
          // Invalid subreddit fetch will incur a CORS error
          dispatch(setIsFetchingPosts(false));
          dispatch(setIsSubredditErr(true));
        });
    } else {
      dispatch(setIsSubredditErr(false));
      dispatch(setIsFetchingPosts(true));

      const postData = sortPosts(devData.data.children, sort);

      // Simulate load time
      setTimeout(() => {
        dispatch(setPosts(postData));
        dispatch(setIsFetchingPosts(false));
      }, 1000);
    }
  };
};
