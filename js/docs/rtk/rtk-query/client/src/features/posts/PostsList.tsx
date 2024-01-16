import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import {
  IPost,
  RequestStatus,
  fetchPosts,
  selectPostById,
  selectPostIds,
} from "./postsSlice";
import { useEffect } from "react";
import { useGetPostsQuery } from "../api/apiSlice";

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
  // Это заменяет собой useDispatch, useSelector, useEffect
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetPostsQuery(null);

  console.log(posts);

  // То есть useGetPostsQuery заменяет все это
  /*   const dispatch = useAppDispatch();
  const postRequestStatus = useAppSelector((state) => state.posts.status);
  const orderedPostIds = useAppSelector(selectPostIds);
  useEffect(() => {
    if (postRequestStatus === RequestStatus.Idle) {
      dispatch(fetchPosts());
    }
  }, [postRequestStatus, dispatch]); */

  return (
    /* Это 
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
    Становится этим:
    */
    <>
      <button onClick={refetch}>refetch</button>
      {isLoading ? (
        <div> Loading...</div>
      ) : isError ? (
        <div>Some Error</div>
      ) : isSuccess ? (
        posts.map((post: IPost) => <PostExcerpt key={post.id} post={post} />)
      ) : null}
    </>
  );
};

export default PostsList;
