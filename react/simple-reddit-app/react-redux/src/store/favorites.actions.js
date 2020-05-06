export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
export const UNDO_FAVORITE = 'UNDO_FAVORITE';
export const REDO_FAVORITE = 'REDO_FAVORITE';

export const addFavorite = (post) => {
  return {
    type: ADD_FAVORITE,
    post,
  };
};

export const removeFavorite = (postId) => {
  return {
    type: REMOVE_FAVORITE,
    postId,
  };
};

export const undoFavorite = () => {
  return {
    type: UNDO_FAVORITE,
  };
};

export const redoFavorite = () => {
  return {
    type: REDO_FAVORITE,
  };
};
