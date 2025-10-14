import {
  USER_POSTS_FETCH_REQUESTED,
  USER_POSTS_FETCH_SUCCEEDED,
  USER_POSTS_FETCH_FAILED,
} from "./actions";

const reducer = (state = { posts: [] }, action: any) => {
  switch (action.type) {
    case USER_POSTS_FETCH_REQUESTED:
      return { ...state, posts: action.payload.data };
    case USER_POSTS_FETCH_SUCCEEDED:
      return { ...state, posts: action.payload.data };
    case USER_POSTS_FETCH_FAILED:
      return { ...state, posts: action.payload.data };
  }
  return state;
};

export default reducer;
