// PrivateRoutes.jsx
import { Navigate } from "react-router-dom";
import MainLayout from "../components/common/MainLayout";
import { useAuth } from "../hoooks/useAuth";
import PostProvider from "../providers/PostProvider";
import ProfileProvider from "../providers/ProfileProvider";
const PrivateRoutes = () => {
  const { auth } = useAuth();
  return (
    <>
      {auth.authToken ? (
        <>
          <PostProvider>
            <ProfileProvider>
              <MainLayout />
            </ProfileProvider>
          </PostProvider>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default PrivateRoutes;
