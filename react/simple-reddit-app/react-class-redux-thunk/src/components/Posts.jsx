import React from 'react';
import { connect } from 'react-redux';

import * as favoriteActions from '../store/favorites.actions';
import { fetchPosts } from '../store/posts.actions';
import PostItem from '../components/PostItem';

const sortOptions = ['hot', 'ascending', 'descending'];

class Posts extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      sort: sortOptions[0],
      subreddit: '',
      subredditInput: '',
    };
  }

  componentDidMount () {
    this.props.startFetchPosts(this.state.subreddit, this.state.sort);
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.sort !== this.state.sort ||
      prevState.subreddit !== this.state.subreddit) {
      this.props.startFetchPosts(this.state.subreddit, this.state.sort);
    }
  }

  handleSubredditInput = (event) => {
    this.setState({ subredditInput: event.target.value.replace(' ', '') });
  }

  handleSubredditSubmit = (event) => {
    event.preventDefault();
    this.setState({ subreddit: this.state.subredditInput });
  }

  render () {
    const {
      posts,
      isFetching,
      isSubredditErr,
      favorites,
      historyPos,
      historyLength,
    } = this.props;

    const { subreddit, sort, subredditInput } = this.state;

    return (
      <section>
        <h1>Posts { subreddit ? `in /r/${ subreddit }` : '' }</h1>

        <div>
          <label>Favorite Action History:</label>
          <button
            type='button'
            onClick={ this.props.undoFavorite }
            disabled={ historyPos === 0 ? true : false }
          >
            &lsaquo; Undo
          </button>
          <button
            type='button'
            onClick={ this.props.redoFavorite }
            disabled={ historyPos === historyLength - 1 ? true : false }
          >
            Redo &rsaquo;
          </button>
        </div>

        <form onSubmit={ this.handleSubredditSubmit }>
          <label>Go to Subreddit:</label>
          <input value={ subredditInput } onChange={ this.handleSubredditInput } />
          <button type='submit'>Go</button>
        </form>

        { isFetching ? (
          <div>Loading posts...</div>
        ) : !isFetching && isSubredditErr ? (
          <div>Invalid Subreddit.</div>
        ) : !isFetching && !isSubredditErr && !posts.length ? (
          <div>No posts to show.</div>
        ) : (
          <>
            <div>
              <label>Sort By:</label>
              <select
                value={ sort }
                onChange={ event =>
                  this.setState({ sort: event.target.value })
                }
              >
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
                  addFavorite={ this.props.addFavorite }
                  removeFavorite={ this.props.removeFavorite }
                />
              )) }
            </ul>
          </>
        ) }
      </section>
    );
  };
};

const mapStateToProps = (state) => ({
  posts: state.posts.list,
  isFetching: state.posts.isFetching,
  isSubredditErr: state.posts.isSubredditErr,
  favorites: state.favorites.list,
  historyPos: state.favorites.historyPos,
  historyLength: state.favorites.history.length,
});

const mapDispatchToProps = (dispatch) => ({
  startFetchPosts: (subreddit, sort) => dispatch(fetchPosts(subreddit, sort)),
  undoFavorite: () => dispatch(favoriteActions.undoFavorite()),
  redoFavorite: () => dispatch(favoriteActions.redoFavorite()),
  addFavorite: (post) => dispatch(favoriteActions.addFavorite(post)),
  removeFavorite: (postId) => dispatch(favoriteActions.removeFavorite(postId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
