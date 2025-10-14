import "./App.css";
import { Generator } from "./components/generator";
import { useDispatch } from "react-redux";
import { USER_POSTS_FETCH_REQUESTED } from "./store/actions";

function App() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({ type: USER_POSTS_FETCH_REQUESTED, payload: { userId: 1 } });
  };
  return (
    <>
      {/* <Generator /> */}
      <button onClick={handleClick}>Fetch Posts</button>
    </>
  );
}

export default App;
