import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "../components/Loader/Loader";

const Feed = lazy(() => import("../pages/feed/Feed"));
const LandingPage = lazy(() => import("../pages/homepage/Homepage"));
const Profile = lazy(() => import("../pages/profile/Profile"));

export default function Router(): JSX.Element {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Suspense>
  );
}
