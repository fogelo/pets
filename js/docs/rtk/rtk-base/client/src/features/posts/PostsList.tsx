import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import {
  RequestStatus,
  fetchPosts,
  selectPostById,
  selectPostIds,
} from "./postsSlice";
import { useEffect } from "react";

const PostExcerpt = ({ postId }: { postId: string }) => {
  const post = useAppSelector((state) => selectPostById(state, postId));
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
  const orderedPostIds = useAppSelector(selectPostIds);

  const postRequestStatus = useAppSelector((state) => state.posts.status);

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
        orderedPostIds.map((id) => (
          <div key={id}>
            <PostExcerpt postId={id} />
          </div>
        ))
      ) : null}
    </>
  );
};

export default PostsList;
