// NewPost.jsx

import { useEffect, useState } from "react";
import { actions } from "../../actions";
import { useAuth } from "../../hoooks/useAuth";
import { usePost } from "../../hoooks/usePost";
import { useProfile } from "../../hoooks/useProfile";
import PostEntry from "./PostEntry";
const NewPost = () => {
  const [showPostEntry, setShowPostEntry] = useState(false);
  // const { showPostEntry, setShowPostEntry } = usePost();
  const { auth } = useAuth();
  const { state: porfile } = useProfile();
  const user = porfile?.user ?? auth?.user;

  const { state, dispatch } = usePost(); // Get state and dispatch from PostContext
  const { postToEdit } = state; // Destructure postToEdit

  // Effect to automatically open PostEntry when postToEdit changes
  useEffect(() => {
    if (postToEdit) {
      setShowPostEntry(true);
    } else {
      // Only close if it's explicitly cleared (e.g., after successful post or cancel)
      // If we are showing the textarea for new post, it might already be false
      if (!postToEdit) {
        setShowPostEntry(false);
      }
    }
  }, [postToEdit]);

  // Handle the close action for PostEntry, dispatching action to clear postToEdit
  const handleClosePostEntry = () => {
    dispatch({ type: actions.post.POST_EDIT_CANCELED }); // Clear postToEdit in context
    setShowPostEntry(false); // Close the local state for PostEntry visibility
  };
  return (
    <>
      {showPostEntry ? (
        <PostEntry
          post={postToEdit}
          onCreateEditShowHide={handleClosePostEntry}
        />
      ) : (
        // <PostEntry />
        <div className="card">
          <div className="flex-center mb-3 gap-2 lg:gap-4">
            <img
              className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`}
              alt="avatar"
            />

            <div className="flex-1">
              <textarea
                className="h-16 w-full rounded-md bg-lighterDark p-3 focus:outline-none sm:h-20 sm:p-6"
                name="post"
                id="post"
                placeholder="What's on your mind?"
                onClick={() => setShowPostEntry(true)}
              ></textarea>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default NewPost;
