import { createBrowserRouter } from "react-router-dom";

import DefaultLayout from "../components/layouts/DefaultLayout";
import { routes } from "./routes";
import BlankLayout from "../components/layouts/BlankLayout";

const finalRoutes = routes.map((route) => {
  return {
    ...route,
    element:
      route.layout === "blank" ? (
        <BlankLayout>{route.element}</BlankLayout>
      ) : (
        <DefaultLayout>{route.element}</DefaultLayout>
      ),
  };
});

const router = createBrowserRouter(finalRoutes);

export default router;
