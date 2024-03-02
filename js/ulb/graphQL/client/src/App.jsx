import { useState } from "react";
import "./App.css";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "./query/user";

function App() {
  const [users, setUsers] = useState(null);
  const { data, loading, error } = useQuery(GET_USERS);
  console.log(data, loading, error);
  return <></>;
}

export default App;
