import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { IPost, RequestStatus, fetchPosts, selectAllPosts } from "./postsSlice";
import { useEffect } from "react";

const PostExcerpt = ({ post }: { post: IPost }) => {
  return (
    <>
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
    </>
  );
};

const PostsList = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectAllPosts);
  const postRequestStatus = useAppSelector((state) => state.posts.status);
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  useEffect(() => {
    if (postRequestStatus === RequestStatus.Idle) {
      dispatch(fetchPosts());
    }
  }, [postRequestStatus, dispatch]);

  return (
    <>
      {postRequestStatus === RequestStatus.Loading ? (
        <div> Loading...</div>
      ) : postRequestStatus === RequestStatus.Failed ? (
        <div>Some Error</div>
      ) : postRequestStatus === RequestStatus.Succeeded ? (
        orderedPosts.map((post) => (
          <div key={post.id}>
            <PostExcerpt post={post} />
          </div>
        ))
      ) : null}
    </>
  );
};

export default PostsList;
