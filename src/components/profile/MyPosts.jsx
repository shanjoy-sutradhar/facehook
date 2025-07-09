import { useProfile } from "../../hoooks/useProfile";
import NewPost from "../posts/NewPost";
import PostList from "../posts/PostList";
const MyPosts = () => {
  const { state } = useProfile();
  const posts = state?.posts;
  return (
    // <>
    //   <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Posts</h4>
    //   <NewPost />
    //   <PostList posts={posts} />
    // </>
    <>
      <section className="mt-6 rounded-xl bg-gradient-to-br from-[#1f2937] to-[#111827] p-4 shadow-lg lg:mt-8 lg:p-6">
        <h4 className="mb-4 text-xl font-bold text-white lg:text-2xl">
          ✨ Your Posts
        </h4>

        {/* New Post Card */}
        <div className="mb-6 rounded-lg border border-gray-700 bg-[#1a1a1a] p-1 shadow-inner transition-all hover:shadow-xl">
          <NewPost />
        </div>

        {/* Post List */}
        <div className="space-y-6">
          <PostList posts={posts} />
        </div>
      </section>
    </>
  );
};

export default MyPosts;
