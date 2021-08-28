import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <section>
      <div className="site__header-bar"></div>
      <div className="site__header">
        <Link to="/">
          <h1>NC Board Games</h1>
        </Link>
      </div>
      <nav className="nav__bar">
        <ul>
          <Link to="/reviews" className="nav__item">
            <li>Reviews</li>
          </Link>
          <Link to="/categories" className="nav__item">
            <li>Categories</li>
          </Link>
          <Link to="/users" className="nav__item">
            <li>Users</li>
          </Link>
        </ul>
      </nav>
    </section>
  );
};

export default Nav;
