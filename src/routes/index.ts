import { Route } from "@/lib/router";

import HomePage from "@/pages/home";
import PostPage from "@/pages/post";

export const routes: Route[] = [
  {
    path: "/",
    element: HomePage,
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
