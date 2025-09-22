import { Link, Outlet } from "react-router";

const CustomHooks: React.FC = () => {
  return (
    <div>
      <nav>
        <Link to="/custom-hooks/posts">Posts</Link>
        <Link to="/custom-hooks/some">Some</Link>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default CustomHooks;
