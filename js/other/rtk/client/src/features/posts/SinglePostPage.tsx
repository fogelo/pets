import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import PostAuthor from "./PostAuthor";
import { selectPostById } from "./postsSlice";
import ReactionButtons from "./ReactionButtons";

const SinglePostPage = () => {
  const { postId } = useParams();
  const post = useAppSelector((state) => selectPostById(state, postId));

  if (!post) {
    return <div>Post not found!</div>;
  }

  return (
    <div key={post.id}>
      <Link to={`/editPost/${post.id}`}>Edit Post</Link>
      <h4>Title: {post.title}</h4>
      <div>
        Posted By: <PostAuthor userId={post.userId} />
      </div>
      <div>Content: {post.content}</div>
      <div>
        <ReactionButtons post={post} />
      </div>
    </div>
  );
};

export default SinglePostPage;
