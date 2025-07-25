import { useState } from "react";
import { useAuth } from "../../hoooks/useAuth";
import useAxios from "../../hoooks/useAxios";
import PostCommentList from "./PostCommentList";
const PostComments = ({ post }) => {
  // const { avatarURL } = useAvatar(post);
  const { auth } = useAuth();
  const { api } = useAxios();
  const [showCommentList, SetShowCommentList] = useState(false);
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");

  const handleCommentKeyDown = async (event) => {
    const keyCode = event.keyCode;
    if (keyCode === 13) {
      try {
        const response = await api.patch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}/comment`,
          { comment }
        );
        if (response.status === 200) {
          setComments([...response.data.comments]);
          setComment("");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <div>
      <div className="flex-center mb-3 gap-2 lg:gap-4">
        <img
          className="max-w-7 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
          src={`${import.meta.env.VITE_SERVER_BASE_URL}/${auth?.user?.avatar}`}
          alt="avatar"
        />

        <div className="flex-1">
          <input
            type="text"
            className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
            name="post"
            id="post"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleCommentKeyDown}
            placeholder="What's on your mind?"
          />
        </div>
      </div>

      <div className="mt-4">
        <button
          className="text-gray-300 max-md:text-sm"
          onClick={() => SetShowCommentList(!showCommentList)}
        >
          All Comment ▾
        </button>
      </div>
      {showCommentList && <PostCommentList comments={comments} />}
    </div>
  );
};

export default PostComments;
