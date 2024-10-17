import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AuthLayout from "./Layouts/AuthLayout/AuthLayout";
import NotFound from "./Pages/NotFound/NotFound";
import Login from "./Pages/AuthPages/Login/Login";
import Register from "./Pages/AuthPages/Register/Register";
import MasterLayout from "./Layouts/MasterLayout/MasterLayout";
import Home from "./Pages/MasterPages/Home/Home";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./Components/MasterComponents/ProtectedRoute/ProtectedRoute";
import EditeStudent from "./Pages/MasterPages/EditeStudent/EditeStudent";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "edite-student/:id", element: <EditeStudent /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
      <Toaster position="top-center" reverseOrder={true} />
    </>
  );
}

export default App;
