import { Home, About, Service, Profile, LoginPage, Posts, ErrorPage , Blog, PostItem } from "@pages";

const router = [
  {
    path: "/",
    element: <Home />,
    content:"Home",
  },
  {
    path: "/about",
    element: <About />,
    content:"About",
  },
  {
    path: "/service",
    element: <Service />,
    content:"Service"
  },
  {
    path: "/profile",
    element: <Profile />,
    content:"Service"
  },
  {
    path: "/signin",
    element: <LoginPage />,
    content:"Signin"
  },
  {
    path: "/posts",
    element: <Posts />,
    content:"Posts"
  },
  {
    path: "/posts/:id",
    element: <PostItem />,
    content:"Posts"
  },
  {
    path: "/blog",
    element: <Blog/>,
    content:"Blog"
  },
  {
    path: "*",
    element: <ErrorPage />
  }
];

export default router;
