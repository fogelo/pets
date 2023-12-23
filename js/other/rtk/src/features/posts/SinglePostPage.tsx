import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import PostAuthor from "./PostAuthor";

const SinglePostPage = () => {
  const { postId } = useParams();
  const post = useAppSelector((state) =>
    state.posts.find((post) => post.id === postId)
  );

  if (!post) {
    return <div>Post not found!</div>;
  }

  return (
    <div key={post.id}>
      <Link to={`/editPost/${post.id}`}>Edit Post</Link>
      <h4>Title: {post.title}</h4>
      <p>
        Posted By: <PostAuthor userId={post.userId} />
      </p>
      <p>Content: {post.content}</p>
    </div>
  );
};

export default SinglePostPage;
