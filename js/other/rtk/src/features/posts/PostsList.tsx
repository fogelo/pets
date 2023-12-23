import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const PostsList = () => {
  const posts = useAppSelector((state) => state.posts);
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      {orderedPosts.map((post) => (
        <div key={post.id}>
          <h4>{post.title}</h4>
          <div>
            Posted By: <PostAuthor userId={post.userId} />
          </div>
          <div>
            When: <TimeAgo timestamp={post.date} />
          </div>
          <div>Content: {post.content}</div>
          <div>
            <ReactionButtons post={post} />
          </div>
          <Link to={`/posts/${post.id}`}>View Post</Link>
        </div>
      ))}
    </>
  );
};

export default PostsList;
