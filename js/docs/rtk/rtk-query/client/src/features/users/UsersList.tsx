import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import { selectAllUsers } from "./usersSlice";
import { useGetUsersQuery } from "../api/usersSlice";

const UserList = () => {
  // const users = useAppSelector(selectAllUsers);
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetUsersQuery(null);

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
