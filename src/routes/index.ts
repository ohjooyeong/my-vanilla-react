import { Route } from "@/lib/router";
import NotFoundPage from "@/not-found";
import HomePage from "@/pages/home";
import PostPage from "@/pages/post";
import InsangPage from "@/pages/insang";

export const routes: Route[] = [
  {
    path: "/",
    element: HomePage,
    errorElement: NotFoundPage,
    children: [
      {
        path: "insang",
        element: InsangPage,
      },
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
