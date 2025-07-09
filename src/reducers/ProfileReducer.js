import { actions } from "../actions";
import { sortPostsLatestFirst } from "../utils";

const initialState = {
  user: null,
  posts: [],
  loading: false,
  error: null,
};

const profileReducer = (state, action) => {
  switch (action.type) {
    case actions.profile.DATA_FETCHING: {
      return {
        ...state,
        loading: true,
      };
    }
    case actions.profile.DATA_FETCHED: {
      return {
        ...state,
        loading: false,
        user: action.data.user,
        posts: sortPostsLatestFirst(action.data.posts),
      };
    }
    case actions.profile.DATA_FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case actions.profile.USER_DATA_EDITED: {
      return {
        ...state,
        loading: false,
        user: action.data,
      };
    }
    case actions.profile.IMAGE_UPDATED: {
      return {
        ...state,
        loading: false,
        user: { ...state.user, avatar: action.data.avatar },
      };
    }

    case actions.profile.POST_CREATED: {
      const newPosts = [action.data, ...state.posts];
      return {
        ...state,
        loading: false,
        posts: sortPostsLatestFirst(newPosts),
      };
    }
    case actions.profile.POST_EDITED: {
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
      };
    }

    case actions.profile.POST_DELETED: {
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post.id !== action.data),
      };
    }

    default: {
      return state;
    }
  }
};

export { initialState, profileReducer };
