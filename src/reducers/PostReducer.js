// postReducer.js
import { actions } from "../actions";
import { sortPostsLatestFirst } from "../utils";

const initialState = {
  posts: [],
  loading: false,
  error: null,
  postToEdit: null, // Add new state for the post being edited
};
const postReducer = (state, action) => {
  // console.log(action.data);
  switch (action.type) {
    case actions.post.DATA_FETCHING: {
      return {
        ...state,
        loading: true,
        error: null, // Clear any previous errors when fetching starts
      };
    }
    case actions.post.DATA_FETCHED: {
      return {
        ...state,
        loading: false,
        posts: sortPostsLatestFirst(action.data),
      };
    }

    case actions.post.DATA_FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    case actions.post.DATA_CREATED: {
      const newPosts = [...state.posts, action.data];
      return {
        ...state,
        loading: false,
        posts: sortPostsLatestFirst(newPosts),
      };
    }
    case actions.post.DATA_EDITED: {
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) => {
          if (post.id == action.data.id) {
            return action.data;
          } else {
            return post;
          }
        }),
        postToEdit: null,
      };
    }
    case actions.post.DATA_DELETED: {
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post.id !== action.data),
        postToEdit: null,
      };
    }
    // New actions for managing postToEdit
    case actions.post.POST_TO_EDITED: {
      // This action is for setting the post to be edited
      return {
        ...state,
        postToEdit: action.data,
      };
    }
    case actions.post.POST_EDIT_CANCELED: {
      // This action is for clearing the postToEdit
      return {
        ...state,
        postToEdit: null,
      };
    }

    default: {
      return state;
    }
  }
};

export { initialState, postReducer };
