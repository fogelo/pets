import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store/store";
import {
  fetchNotifications,
  selectAllNotifications,
} from "./features/notificatins/notificationsSlice";

const Navbar = () => {
  const dispath = useAppDispatch();
  const notifications = useAppSelector(selectAllNotifications);
  const notificationCount = notifications.filter(
    (notification) => notification.isNew
  ).length;

  const fetchNewNotifications = () => {
    dispath(fetchNotifications());
  };

  return (
    <ul style={{ display: "flex", gap: 40 }}>
      <li>
        <Link to={"/posts"}>Posts</Link>
      </li>
      <li>
        <Link to={"/users"}>Users</Link>
      </li>
      <li>
        <Link to={"/notifications"}>Notifications ({notificationCount})</Link>
      </li>
      <li>
        <button onClick={fetchNewNotifications}>refresh notifications</button>
      </li>
    </ul>
  );
};

export default Navbar;
