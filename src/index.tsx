import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import Book from "./pages/Book";
import Login from "./pages/Login";
import ZodForm from "./components/organisms/forms/Zod";
import { Users } from "./pages/Users";
import { UserPage } from "./pages/User";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/book",
    element: <Book />,
  },
  {
    path: "/login",
    element: <Login />,
    // errorElement: ErrorBoundary(),
  },
  {
    path: "/zod",
    element: <ZodForm />,
    // errorElement: ErrorBoundary(),
  },
  {
    path: "/users",
    element: <Users />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/users/:userid",
    element: <UserPage />,
  },
]);

function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);

  return <div>Oops!</div>;
}

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
