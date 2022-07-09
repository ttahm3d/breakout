import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks";

export default function RequireAuth() {
  const location = useLocation();
  const { user } = useAppSelector((s) => s.authReducer);
  const uid = localStorage.getItem("breakout/user-id");

  return uid || user !== undefined ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/signin" state={{ from: location }} replace />
  );
}
