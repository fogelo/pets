import { useContext } from "react";
import { StoreContext } from "../store/Provider";

const Users = () => {
  const store = useContext(StoreContext);
  console.log(store);

  return <div>Hello</div>;
};

export default Users;
