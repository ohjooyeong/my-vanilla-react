import { Route } from "@/lib/router";
import NotFoundPage from "@/not-found";
import HomePage from "@/pages/home";
import PostPage from "@/pages/post";

export const routes: Route[] = [
  {
    path: "/",
    element: HomePage,
    errorElement: NotFoundPage,
    children: [
      {
        path: "post",
        children: [
          {
            path: ":id",
            element: PostPage,
          },
        ],
      },
    ],
  },
];
