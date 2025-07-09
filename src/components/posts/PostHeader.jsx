// PostHeader.jsx
import { useState } from "react";

import { actions } from "../../actions";
import TreeDotsIcon from "../../assets/icons/3dots.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import EditIcon from "../../assets/icons/edit.svg";
import TimeIcon from "../../assets/icons/time.svg";
import { useAuth } from "../../hoooks/useAuth";
import { useAvatar } from "../../hoooks/useAvatar";
import useAxios from "../../hoooks/useAxios";
import { usePost } from "../../hoooks/usePost";
import { useProfile } from "../../hoooks/useProfile";
import { getDateDifferenceFromNow } from "../../utils";

const PostHeader = ({ post }) => {
  const [showActions, setShowActions] = useState(false);
  const { avatarURL } = useAvatar(post);
  const { dispatch } = usePost();
  const { dispatch: profileDispatch } = useProfile();
  const { auth } = useAuth();
  const { api } = useAxios();
  const isMe = post?.author?.id === auth?.user?.id;
  function toggleAction() {
    setShowActions(!showActions);
  }
  function handlePostEdit() {
    dispatch({ type: actions.post.POST_TO_EDITED, data: post }); // Dispatch action to set postToEdit
    setShowActions(false); // Close the dropdown after clicking edit
  }

  const handleDeletePost = async () => {
    dispatch({ type: actions.post.DATA_FETCHING }); // For global post state
    profileDispatch({ type: actions.profile.DATA_FETCHING }); // For profile post state
    try {
      const response = await api.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}`
      );
      if (response.status === 200) {
        dispatch({ type: actions.post.DATA_DELETED, data: post.id }); // For global post state
        profileDispatch({ type: actions.profile.POST_DELETED, data: post.id }); // For profile post state
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: actions.post.DATA_FETCH_ERROR, error: error.message });
      profileDispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };
  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <img
          className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
          src={avatarURL}
          alt="avatar"
        />
        <div>
          <h6 className="text-lg lg:text-xl">{post?.author?.name}</h6>
          <div className="flex items-center gap-1.5">
            <img src={TimeIcon} alt="time" />
            <span className="text-sm text-gray-400 lg:text-base">
              {`${getDateDifferenceFromNow(post?.createAt)} ago`}
            </span>
          </div>
        </div>
      </div>
      <div className="relative">
        {isMe && (
          <button onClick={toggleAction}>
            <img src={TreeDotsIcon} alt="3dots of Action" />
          </button>
        )}
        {showActions && (
          <div className="action-modal-container bg-black">
            <button
              className="action-menu-item hover:text-green-500"
              onClick={handlePostEdit}
            >
              <img src={EditIcon} alt="Edit" />
              Edit
            </button>
            <button
              className="action-menu-item hover:text-red-500 pr-4"
              onClick={handleDeletePost}
            >
              <img src={DeleteIcon} alt="Delete" />
              Delete
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default PostHeader;
