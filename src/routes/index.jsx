import { Route } from "react-router-dom";
import React, { lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";

const AdminTemplateLazy = lazy(() => import("./../pages/AdminTemplate"));

const AdminGuard = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <ProtectedRoute requiredRole="ADMIN">
        <AdminTemplateLazy />
      </ProtectedRoute>
    </React.Suspense>
  );
};

const routes = [
  {
    path: "",
    element: lazy(() => import("./../pages/HomeTemplate")),
    nested: [
      {
        path: "",
        element: lazy(() => import("./../pages/HomeTemplate/Home")),
      },
      {
        path: "list-room",
        element: lazy(() => import("./../pages/HomeTemplate/RoomList")),
      },
      {
        path: "booked-room",
        element: lazy(() => import("./../pages/HomeTemplate/BookedRoom")),
      },
      {
        path: "detail-room/:id",
        element: lazy(() => import("./../pages/HomeTemplate/DetailRoom")),
      },
    ],
  },
  {
    path: "admin",
    element: AdminGuard,
    nested: [
      {
        path: "",
        element: lazy(() => import("./../pages/AdminTemplate/Dashboard")),
      },
      {
        path: "room-management",
        element: lazy(() => import("./../pages/AdminTemplate/RoomManagement")),
      },
      {
        path: "user-management",
        element: lazy(() => import("./../pages/AdminTemplate/UserManagement")),
      },
    ],
  },
  {
    path: "*",
    element: lazy(() => import("./../pages/PageNotFound")),
  },
  {
    path: "auth",
    element: lazy(() => import("./../pages/Auth/AuthTemplate")),
    nested: [
      {
        path: "login",
        element: lazy(() => import("./../pages/Auth/LoginPage")),
      },
      {
        path: "register",
        element: lazy(() => import("./../pages/Auth/RegisterPage")),
      },
    ],
  },
];

const renderRoutes = () => {
  return routes.map((route) => {
    if (route.nested) {
      return (
        <Route
          key={route.path}
          path={route.path}
          element={<route.element></route.element>}
        >
          {route.nested.map((nestRoute) => (
            <Route
              key={nestRoute.path}
              path={nestRoute.path}
              element={<nestRoute.element></nestRoute.element>}
            ></Route>
          ))}
        </Route>
      );
    } else {
      return (
        <Route
          key={route.path}
          path={route.path}
          element={<route.element></route.element>}
        ></Route>
      );
    }
  });
};
export default renderRoutes;
