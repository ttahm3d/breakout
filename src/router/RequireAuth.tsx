import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks";

export default function RequireAuth() {
  const location = useLocation();
  const loggedIn = useAppSelector((s) => s.authReducer.loggedIn);

  return loggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/signin" state={{ from: location }} replace />
  );
}
