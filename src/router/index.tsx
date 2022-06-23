import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "../components/Loader/Loader";
import RenderWithMenu from "./RenderWithMenu";

const LandingPage = lazy(() => import("../pages/landingpage/LandingPage"));
const Home = lazy(() => import("../pages/home/Home"));
const Explore = lazy(() => import("../pages/explore/Explore"));
const Discover = lazy(() => import("../pages/discover/Discover"));
const Bookmarks = lazy(() => import("../pages/bookmarks/Bookmarks"));
const Profile = lazy(() => import("../pages/profile/Profile"));

export default function Router(): JSX.Element {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<RenderWithMenu />}>
          <Route path="/home" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
