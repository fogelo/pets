import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import { selectAllUsers } from "./usersSlice";

const UserList = () => {
  const users = useAppSelector(selectAllUsers);
  return (
    <section>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UserList;
