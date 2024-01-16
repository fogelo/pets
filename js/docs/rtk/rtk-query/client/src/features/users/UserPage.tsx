import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import { selectAllPosts } from "../posts/postsSlice";
import { selectUserById } from "./usersSlice";

const UserPage = () => {
  const posts = useAppSelector(selectAllPosts);
  const { userId } = useParams();
  const user = useAppSelector((state) => selectUserById(state, userId));
  const userPosts = posts.filter((post) => post.userId === userId);
  return (
    <section>
      <h2>{user?.name}</h2>
      <ul>
        {userPosts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UserPage;
