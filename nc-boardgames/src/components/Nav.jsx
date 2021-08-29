import { Link } from "react-router-dom";
import logo from "../images/ncbg_logo.png";

const Nav = () => {
  return (
    <section>
      <div className="site__header-bar"></div>
      <div className="site__header-container">
        <Link to="/">
          <img src={logo} alt="NC Board Games" className="header__logo" />
        </Link>
        <nav className="nav__bar">
          <ul>
            <Link to="/reviews" className="nav__item">
              <li className="nav__item-text">Reviews</li>
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
    </section>
  );
};

export default Nav;
