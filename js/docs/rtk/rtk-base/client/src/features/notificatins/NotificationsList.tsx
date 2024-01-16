import { formatDistanceToNow } from "date-fns";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { selectAllUsers } from "../users/usersSlice";
import {
  allNotificationsRead,
  selectAllNotifications,
} from "./notificationsSlice";
import { useLayoutEffect } from "react";

const NotificationsList = () => {
  const notifications = useAppSelector(selectAllNotifications);
  const users = useAppSelector(selectAllUsers);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(allNotificationsRead());
    console.log(notifications);
  });

  return (
    <>
      <ul>
        {notifications.map((notification) => {
          const user = users.find((user) => user.id === notification.userId);
          const timeAgo = formatDistanceToNow(notification.date);

          return (
            <li
              key={notification.id}
              style={{
                background: notification.isNew ? "#a1bdff" : "",
                marginBottom: 10,
                padding: 5,
              }}
            >
              <b>{user?.name}</b>: {notification.message}
              <div>
                <i>{timeAgo}</i>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default NotificationsList;
