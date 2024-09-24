import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { Home, Leadstable } from "./pages/pageIndex";
import { useEffect } from "react";

function App() {
  const Layout = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return <Outlet />;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/leads/:mainchart/:drilldown",
          element: <Leadstable />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
