import { formatDistanceToNow } from "date-fns";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { selectAllUsers } from "../users/usersSlice";
import {
  allNotificationsRead,
  selectAllNotifications,
} from "./notificationsSlice";
import { useLayoutEffect } from "react";
import { useGetUsersQuery } from "../api/usersSlice";

const NotificationsList = () => {
  const notifications = useAppSelector(selectAllNotifications);
  const dispatch = useAppDispatch();

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetUsersQuery(null);

  useLayoutEffect(() => {
    dispatch(allNotificationsRead());
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
