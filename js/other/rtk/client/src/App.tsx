import Counter from "./features/counter/Counter";
import AddPostForm from "./features/posts/AddPostForm";
import PostsList from "./features/posts/PostsList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SinglePostPage from "./features/posts/SinglePostPage";
import EditPostForm from "./features/posts/EditPostForm";
import { useEffect } from "react";
import { useAppDispatch } from "./store/store";
import { fetchUsers } from "./features/users/usersSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: "hello world",
  },
  {
    path: "/counter",
    element: <Counter />,
  },
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
]);

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  return <RouterProvider router={router} />;
}

export default App;
