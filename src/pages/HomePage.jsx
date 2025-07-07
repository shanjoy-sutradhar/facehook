import { useAuth } from "../hoooks/useAuth";

import { useEffect, useReducer } from "react";
import { actions } from "../actions";
import PostList from "../components/posts/PostList";
import useAxios from "../hoooks/useAxios";
import { postReducer } from "../reducers/PostReducer";
const HomePage = () => {
  const { auth } = useAuth();
  const [state, dispatch] = useReducer(postReducer);

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
      {/* <p>Home Page</p>
      <Link to="/me">Go to Profile Page</Link> */}
      {/* <p p className="text-center font-bold">
        {" "}
        {auth.user}{" "}
      </p> */}
      <PostList posts={state?.posts} />
    </div>
  );
};

export default HomePage;
