import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { actions } from "../../actions";
import { usePost } from "../../hoooks/usePost";
import Header from "./Header";
const MainLayout = () => {
  const location = useLocation();
  // CORRECTED LINE: Destructure state and then dispatch from state, or just directly destructure state and then access state.dispatch
  const { dispatch } = usePost(); // This is the correct way to get dispatch

  // Use useEffect to clear postToEdit whenever the route changes
  useEffect(() => {
    // Dispatch action to clear postToEdit state
    dispatch({ type: actions.post.POST_EDIT_CANCELED });
  }, [location.pathname, dispatch]); // Dependency on location.pathname to trigger on route change

  return (
    <>
      <Header />
      <main
        className="mx-auto max-w-[1020px] py-8"
        style={{
          overflowY: "auto",
          maxHeight: "88vh",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          //   background: "linear-gradient(135deg, #1f1f1f, #333333)",
        }}
      >
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default MainLayout;
