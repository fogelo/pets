import Counter from "./features/counter/Counter";
import AddPostForm from "./features/posts/AddPostForm";
import PostsList from "./features/posts/PostsList";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import SinglePostPage from "./features/posts/SinglePostPage";
import EditPostForm from "./features/posts/EditPostForm";
import { useEffect } from "react";
import { useAppDispatch } from "./store/store";
import UserList from "./features/users/UsersList";
import UserPage from "./features/users/UserPage";
import { fetchPosts } from "./features/posts/postsSlice";
import Navbar from "./Navbar";
import { fetchNotifications } from "./features/notificatins/notificationsSlice";
import NotificationsList from "./features/notificatins/NotificationsList";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet /> {/* Точка вставки для дочерних роутов */}
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/posts",
        element: (
          <>
            <AddPostForm />
            <PostsList />
          </>
        ),
      },
      {
        path: "/posts/:postId",
        element: <SinglePostPage />,
      },
      {
        path: "/editPost/:postId",
        element: <EditPostForm />,
      },
      {
        path: "/users",
        element: <UserList />,
      },
      {
        path: "/users/:userId",
        element: <UserPage />,
      },
      {
        path: "/notifications",
        element: <NotificationsList />,
      },
    ],
  },
  {
    path: "/counter",
    element: <Counter />,
  },
]);

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    // dispatch(fetchPosts());
    dispatch(fetchNotifications());
  }, [dispatch]);
  return <RouterProvider router={router} />;
}

export default App;
