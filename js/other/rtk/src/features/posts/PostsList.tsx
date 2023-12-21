import { useAppSelector } from "../../store/store";

const PostsList = () => {
  const posts = useAppSelector((state) => state.posts);
  return (
    <>
      {posts.map((post) => (
        <div key={post.id}>
          <h4>{post.title}</h4>
          <p>{post.content}</p>
        </div>
      ))}
    </>
  );
};

export default PostsList;
