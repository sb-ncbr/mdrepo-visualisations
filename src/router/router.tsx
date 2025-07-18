import App from "@/App";
import ErrorPage from "@/pages/ErrorPage";
import LandingPage from "@/pages/LandingPage";
import ProjectsPage from "@/pages/ProjectsPage";
import ProjectDetailPage from "@/pages/ProjectDetailPage";
import { createBrowserRouter, type RouteObject } from "react-router";
import PlaygroundPage from "@/pages/PlaygroundPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/projects",
        element: <ProjectsPage />,
      },
      {
        path: "/projects/:projectId",
        element: <ProjectDetailPage />,
      },
      {
        path: "/playground",
        element: <PlaygroundPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
