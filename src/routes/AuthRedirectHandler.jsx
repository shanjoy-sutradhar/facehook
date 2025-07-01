// components/AuthRedirectHandler.jsx (or directly in App.jsx)
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hoooks/useAuth"; // Adjust path if needed

const AuthRedirectHandler = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if auth.authToken is null/undefined and the user is not already on the login page
    // You might want to refine this condition based on your `auth` state structure
    // For example, if auth is an empty object `{}` when logged out, check that.
    if (!auth.authToken && !auth.user) {
      // Assuming `user` also becomes null/undefined on logout
      // Only navigate if we're not already on the login page to prevent loops
      if (window.location.pathname !== "/login") {
        console.log("No valid auth token/user found. Redirecting to login.");
        navigate("/login", { replace: true });
      }
    }
  }, [auth, navigate]); // Depend on auth state and navigate function

  return null; // This component doesn't render anything visually
};

export default AuthRedirectHandler;
