// HomePage.jsx

import { useEffect } from "react";
import { actions } from "../actions";
import NewPost from "../components/posts/NewPost";
import PostList from "../components/posts/PostList";
import { useAuth } from "../hoooks/useAuth";
import useAxios from "../hoooks/useAxios";
import { usePost } from "../hoooks/usePost";
const HomePage = () => {
  const { auth } = useAuth();
  // const [state, dispatch] = useReducer(postReducer);
  const { state, dispatch } = usePost();
  const { api } = useAxios();

  useEffect(() => {
    dispatch({ type: actions.post.DATA_FETCHING });
    const fetchPost = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts`
        );
        if (response.status === 200) {
          dispatch({ type: actions.post.DATA_FETCHED, data: response.data });
        }
      } catch (error) {
        dispatch({ type: actions.post.DATA_FETCH_ERROR, error: error.message });
      }
    };
    fetchPost();
  }, []);

  if (state?.loading) {
    return <div>We are working...</div>;
  }
  if (state?.error) {
    return <div>Error in fetching posts {state?.error?.message}</div>;
  }

  return (
    <div>
      <NewPost />
      <PostList posts={state?.posts} />
    </div>
  );
};

export default HomePage;
