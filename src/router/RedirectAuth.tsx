import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks";

export default function RedirectAuth() {
  const location = useLocation();
  const loggedIn = useAppSelector((s) => s.authReducer.loggedIn);

  return loggedIn ? (
    <Navigate to="/home" state={{ from: location }} />
  ) : (
    <Outlet />
  );
}
