import { createBrowserRouter, Navigate, Outlet } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ServiceForm from "./pages/ServiceForm";
import NotFound from "./pages/NotFound";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("consulateAuth");
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Root layout component
const RootLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "service/:serviceId",
        element: (
          <ProtectedRoute>
            <ServiceForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
