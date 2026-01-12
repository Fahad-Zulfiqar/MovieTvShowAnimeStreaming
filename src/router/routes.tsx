import { lazy } from "react";
const Chat = lazy(() => import("../pages/AI/Chat"));
const Profile = lazy(() => import("../pages/Users/Profile"));
const LoginBoxed = lazy(() => import("../pages/Authentication/LoginBoxed"));
const RegisterBoxed = lazy(
  () => import("../pages/Authentication/RegisterBoxed")
);
const UnlockBox = lazy(() => import("../pages/Authentication/UnlockBox"));

const App = lazy(() => import("../App"));
const Home = lazy(() => import("../pages/Home"));
const MovieDetail = lazy(() => import("../pages/MovieDetail"));
const Movie = lazy(() => import("../pages/Movies"));
const TvShow = lazy(() => import("../pages/TvShow"));
const TvShowDetail = lazy(() => import("../pages/TvShowDetail"));
const Watch = lazy(() => import("../pages/Watch"));

const routes = [
  // dashboard
  {
    path: "/",
    element: <App />,
  },
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/movie",
    element: <Movie />,
  },
  {
    path: "/movie/:id",
    element: <MovieDetail />,
  },
  {
    path: "/tv",
    element: <TvShow />,
  },
  {
    path: "/tv/:id",
    element: <TvShowDetail />,
  },
  {
    path: "/watch/movie/:id",
    element: <Watch />,
  },
  {
    path: "/watch/tv/:id",
    element: <Watch />,
  },
  {
    path: "/watch/tv/:id/:id/:id",
    element: <Watch />,
  },
  // Apps page
  {
    path: "/ai/chat",
    element: <Chat />,
  },
  //Authentication
  {
    path: "/auth/boxed-signin",
    element: <LoginBoxed />,
    layout: "blank",
  },
  {
    path: "/auth/boxed-signup",
    element: <RegisterBoxed />,
    layout: "blank",
  },
  {
    path: "/auth/boxed-lockscreen",
    element: <UnlockBox />,
    layout: "blank",
  },
  // Users page
  {
    path: "/users/profile",
    element: <Profile />,
  },
];

export { routes };
