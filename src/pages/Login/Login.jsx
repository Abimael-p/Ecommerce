import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../../components/Login/LoginForm";
import { startSessionThunk } from "../../store/slices/authSlice";
import { Navigate, useLocation } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const isLogged = useSelector((store) => store.auth.isLoggedIn);
  const dispatch = useDispatch();
  const location = useLocation();
  const from = location.state?.from;

  const handleLogin = (LoginData) => {
    dispatch(startSessionThunk(LoginData));
  };
  return (
    <div className="container__form__user">
      <section className="container__data">
        <p className="welcome__user">
          Welcome! Enter your email and password to continue
        </p>
        <section>
          <ul className="container__session">
            <h3 className="data__tittle">Test data</h3>
            <li>
              <em>Email</em>: pachecoabimael360@gmail.com
            </li>
            <li>
              <em>Password</em>: Pacheco
            </li>
          </ul>
        </section>
        <LoginForm onLogin={handleLogin} />
      </section>

      {isLogged && <Navigate to={from ?? "/"} />}
    </div>
  );
};

export default Login;
