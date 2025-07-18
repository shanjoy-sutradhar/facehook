import PostAction from "./PostAction";
import PostBody from "./PostBody";
import PostComments from "./PostComments";
import PostHeader from "./PostHeader";

const PostCard = ({ post }) => {
  return (
    <article className="card mt-6 lg:mt-8 text-amber-50">
      <PostHeader post={post} />
      <PostBody poster={post?.image} content={post?.content} />
      <PostAction post={post} commentCount={post?.comments?.length} />
      <PostComments post={post} />
    </article>
  );
};

export default PostCard;
