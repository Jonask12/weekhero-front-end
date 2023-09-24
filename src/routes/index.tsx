import { Routes, Route } from "react-router-dom";
import { Login } from "../page/Login";
import { Register } from "../page/Register";
import { Dashboard } from "../page/Dashboard";
import { Schedules } from "../page/Schedules";
import { PrivateRoute } from "./PrivateRoutes";
import { EditProfile } from "../page/EditProfile";

export function RouteApp() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Login />}
      />
      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>}
      />

      <Route
        path="/schedules"
        element={
          <PrivateRoute>
            <Schedules />
          </PrivateRoute>
        }
      />

      <Route
        path="/edit-profile"
        element={
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}