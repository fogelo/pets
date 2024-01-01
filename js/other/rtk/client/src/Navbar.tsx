import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <ul style={{ display: "flex", gap: 40 }}>
      <li>
        <Link to={"/posts"}>Posts</Link>
      </li>
      <li>
        <Link to={"/users"}>Users</Link>
      </li>
    </ul>
  );
};

export default Navbar;
