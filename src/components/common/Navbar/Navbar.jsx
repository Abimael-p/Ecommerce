import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { reset } from "../../../store/slices/authSlice";
import "./Navbar.css";

const Navbar = ({ updateCartVisible }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogged = useSelector((store) => store.auth.isLoggedIn);

  const userTo = isLogged ? "/profile" : "/login";

  const logOut = () => {
    dispatch(reset());
    navigate("/login");
  };

  const getClass = ({ isActive }) => {
    if (isActive) return "header__nav__link header__nav_link--active";
    else return "header__nav__link";
  };

  const handleCartClick = () => {
    if (isLogged) updateCartVisible();
    else navigate("/login");
  };

  return (
    <header className="container__header__principal">
      <Link className="link__loading">
        <h1 className="tittle__name__app">Ecommerce</h1>
      </Link>
      <nav className="header__container">
        <ul className="container__list">
          <li>
            <NavLink to={userTo} className={getClass}>
              <i className="bx bx-user"></i>
            </NavLink>
          </li>
          <li>
            <NavLink to="/purchases" className={getClass}>
              <i className="bx bx-box"></i>
            </NavLink>
          </li>
          <li>
            <button className="btn__Cart__click" onClick={handleCartClick}>
              <i className="bx bx-cart-alt"></i>
            </button>
          </li>
        </ul>
        {isLogged && (
          <button className="btn__reset__user" onClick={logOut}>
            log Out
          </button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
