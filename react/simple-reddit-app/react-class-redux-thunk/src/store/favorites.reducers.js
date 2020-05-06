import {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  UNDO_FAVORITE,
  REDO_FAVORITE,
} from './favorites.actions';

/*
  Each time favorites is changed we store a snapshot of it in the
  history array.

  historyPos is used to navigate backward/forward in the history.
*/
const initialState = {
  list: [],
  history: [[]],
  historyPos: 0,
};

export default (state = initialState, action) => {
  let newFavorites;
  let newHistory;
  let newHistoryPos;

  switch (action.type) {
    case ADD_FAVORITE:
      newFavorites = [...state.list, action.post];
      newHistory = state.history.slice(0, state.historyPos + 1);
      newHistory.push(newFavorites);
      return {
        ...state,
        list: newFavorites,
        history: newHistory,
        historyPos: newHistory.length - 1,
      };

    case REMOVE_FAVORITE:
      newFavorites = state.list.slice();
      for (let i = 0; i < newFavorites.length; i++) {
        if (newFavorites[i].data.id === action.postId) {
          newFavorites.splice(i, 1);
          break;
        }
      }
      newHistory = state.history.slice(0, state.historyPos + 1);
      newHistory.push(newFavorites);
      return {
        ...state,
        list: newFavorites,
        history: newHistory,
        historyPos: newHistory.length - 1,
      };

    case UNDO_FAVORITE:
      if (state.historyPos > 0) {
        newHistoryPos = state.historyPos - 1;
        newFavorites = state.history[newHistoryPos];
        return {
          ...state,
          list: newFavorites,
          historyPos: newHistoryPos,
        };
      } else {
        return state;
      }

    case REDO_FAVORITE:
      if (state.historyPos < state.history.length - 1) {
        newHistoryPos = state.historyPos + 1;
        newFavorites = state.history[newHistoryPos];
        return {
          ...state,
          list: newFavorites,
          historyPos: newHistoryPos,
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};
