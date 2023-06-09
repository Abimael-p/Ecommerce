import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import Purchases from "../pages/Purchases/Purchases";
import ProtectedRouter from "../components/common/ProtectedRouter/ProtectedRouter";
import Profile from "../pages/Profile/Profile";
import Home from "../pages/Home/Home";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import { HomeLoader } from "./loaders/HomeLoader";
import App from "../App";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "/",
        loader: HomeLoader,
        element: <Home />,
      },
      {
        path: "/purchases",
        element: (
          <ProtectedRouter>
            <Purchases />
          </ProtectedRouter>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRouter>
            <Profile />
          </ProtectedRouter>
        ),
      },
      {
        path: "/product/:productId",
        element: <ProductDetail />,
      },
    ],
  },
  {
    path: "*",
    element: <p>page was not founded 404</p>,
  },
]);
