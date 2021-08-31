import { Link } from "react-router-dom";
import logo from "../images/ncbg_logo.png";
import UserProfile from "./UserProfile";

const Nav = ({ setFilters, user, setUser }) => {
  const defaultFilters = {
    category: null,
    sort_by: null,
    order: null,
    p: 1,
    limit: 10,
  };

  return (
    <section>
      <div className="site__header-bar"></div>
      <div className="site__header-container">
        <Link to="/">
          <img src={logo} alt="NC Board Games" className="header__logo" />
        </Link>

        <div className="nav__main-container">
          <UserProfile user={user} setUser={setUser} />
          <nav className="nav__bar">
            <ul>
              <Link to="/reviews" className="nav__item">
                <li
                  className="nav__item-text"
                  onClick={() => {
                    setFilters(defaultFilters);
                  }}
                >
                  Reviews
                </li>
              </Link>
              <Link to="/categories" className="nav__item">
                <li className="nav__item-text">Categories</li>
              </Link>
              <Link to="/users" className="nav__item">
                <li className="nav__item-text">Users</li>
              </Link>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Nav;
