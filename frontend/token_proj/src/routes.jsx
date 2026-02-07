import { createBrowserRouter } from "react-router";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { ServiceForm } from "./pages/ServiceForm";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/home",
    Component: Home,
  },
  {
    path: "/service/:serviceId",
    Component: ServiceForm,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);