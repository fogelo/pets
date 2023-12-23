import Counter from "./features/counter/Counter";
import AddPostForm from "./features/posts/AddPostForm";
import PostsList from "./features/posts/PostsList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SinglePostPage from "./features/posts/SinglePostPage";
import EditPostForm from "./features/posts/EditPostForm";

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
  return <RouterProvider router={router} />;
}

export default App;
