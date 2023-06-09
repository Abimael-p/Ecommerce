import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRouter = ({ children }) => {
  const isLogged = useSelector((store) => store.auth.isLoggedIn);
  const location = useLocation();

  if (!isLogged)
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  else return <>{children}</>;
};

export default ProtectedRouter;
