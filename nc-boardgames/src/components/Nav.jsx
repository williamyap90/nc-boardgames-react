import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <section>
      <div className="site__header-bar"></div>
      <div className="site__header">
        <Link to="/">
          <h1>NC Board Games API</h1>
        </Link>
      </div>
      <nav id="navbar">
        <ul>
          <Link to="/reviews">
            <li>Reviews</li>
          </Link>
          <Link to="/categories">
            <li>Categories</li>
          </Link>
          <Link to="/users">
            <li>Users</li>
          </Link>
        </ul>
      </nav>
    </section>
  );
};

export default Nav;
