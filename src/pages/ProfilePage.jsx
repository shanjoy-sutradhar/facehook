import { useAuth } from "../hoooks/useAuth";

import { useEffect } from "react";
import { actions } from "../actions";
import MyPosts from "../components/profile/MyPosts";
import ProfileInfo from "../components/profile/ProfileInfo";
import useAxios from "../hoooks/useAxios";
import { useProfile } from "../hoooks/useProfile";
const ProfilePage = () => {
  // const [user, setUser] = useState(null);
  // const [posts, setPosts] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const { state, dispatch } = useProfile();
  const { api } = useAxios();
  const { auth } = useAuth();

  useEffect(() => {
    // setLoading(true);
    dispatch({ type: actions.profile.DATA_FETCHING });

    const fetchProfile = async () => {
      try {
        const response = await api.get(
          // `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
          `http://localhost:3000/profile/${auth?.user?.id}`
        );
        // setUser(response?.data?.user);
        // setPosts(response?.data?.posts);
        if (response.status === 200) {
          dispatch({ type: actions.profile.DATA_FETCHED, data: response.data });
          console.log(state.loading);
        }
      } catch (error) {
        // setError(error);
        dispatch({
          type: actions.profile.DATA_FETCH_ERROR,
          error: error.message,
        });
      }
    };
    fetchProfile();
  }, []);

  if (state?.loading) {
    return <div> Fatching your profile data....</div>;
  }
  return (
    <>
      <ProfileInfo />
      <MyPosts />
    </>
  );
};

export default ProfilePage;
