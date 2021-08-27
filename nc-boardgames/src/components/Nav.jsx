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
            <li>
              <a href="reviews">Reviews</a>
            </li>
          </Link>
          <Link to="/categories">
            <li>
              <a href="categories">Categories</a>
            </li>
          </Link>
          <Link to="/users">
            <li>
              <a href="users">Users</a>
            </li>
          </Link>
        </ul>
      </nav>
    </section>
  );
};

export default Nav;
