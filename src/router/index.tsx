import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import App from "../App";
import { Home, About, ProductDetail, Service, SubCategory, LoginPage, Profile, SignUp, Posts, ErrorPage, PostItem, Stock } from "@pages";



const index = () => {



  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<SignUp />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/home/*" element={<Home />}>
          <Route path="about" element={<About />} />
          <Route path="about/:id" element={<ProductDetail />} />
          <Route path="service" element={<Service />} />
          <Route path="service/:id" element={<SubCategory />} />
          <Route path="profile" element={<Profile />} />
          <Route path="stock" element={<Stock />} />
          <Route path="posts" element={<Posts />} />
          <Route path="posts/:id" element={<PostItem />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default index;
