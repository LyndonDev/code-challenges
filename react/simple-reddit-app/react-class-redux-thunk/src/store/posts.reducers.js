import {
  SET_IS_FETCHING_POSTS,
  SET_IS_SUBREDDIT_ERR,
  SET_POSTS,
} from './posts.actions';

const initialState = {
  list: [],
  isFetching: false,
  isSubredditErr: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_FETCHING_POSTS:
      return {
        ...state,
        isFetching: action.isFetching,
      };

    case SET_IS_SUBREDDIT_ERR:
      return {
        ...state,
        isSubredditErr: action.isErr,
      };

    case SET_POSTS:
      return {
        ...state,
        list: action.posts,
      };

    default:
      return state;
  }
};
