import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks";

export default function RedirectAuth() {
  const location = useLocation();
  const { user } = useAppSelector((s) => s.authReducer);

  return user !== undefined ? (
    <Navigate to="/home" state={{ from: location }} />
  ) : (
    <Outlet />
  );
}
