import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Layout from "@/scenes/global/Layout";

//Lazy loading components
const Home = lazy(() => import("@/scenes/home"));
const Movies = lazy(() => import("@/scenes/movies"));
const Movie = lazy(() => import("@/scenes/movie"));
const ErrorPage = lazy(() => import("@/scenes/errorpage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/movies",
        children: [
          { index: true, element: <Movies /> },
          { path: "/movies/:id", element: <Movie /> },
        ],
      },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

{
  /* <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        {/*      <Route path="/movies" element={<Movies />} />
                    <Route path="/movies/:id" element={<Moviepage />} />
                    <Route
                      path="/movies/:id/reviews/all"
                      element={<Reviewspage />}
                    />
                    <Route
                      path="/movies/:id/posts/all"
                      element={<Movieposts />}
                    />
                    <Route
                      path="/movies/:movieid/posts/post/:postid"
                      element={<Postpage />}
                    />
                    <Route
                      path="/watchlist/:username"
                      element={<Watchlistpage />}
                    />
                    <Route path="/news/all" element={<Newspage />} />
                    <Route
                      path="/news/movie/:movieid/:postid"
                      element={<Newspostpage />}
                    />
  
                    <Route
                      path="/signup"
                      element={
                        <PageRedirect>
                          <Signup />
                        </PageRedirect>
                      }
                    />
                    <Route
                      path="/login"
                      element={
                        <PageRedirect>
                          <Login />
                        </PageRedirect>
                      }
                    />
                    <Route
                      path="/reset-password"
                      element={
                        <PageRedirect>
                          <Resetpassword />
                        </PageRedirect>
                      }
                    />
                    <Route path="/profile/:username" element={<Profile />} />
                    <Route
                      path="/profile/edit/info"
                      element={
                        <PageAuth>
                          <Editprofile />
                        </PageAuth>
                      }
                    />
  
                    <Route
                      path="/profile/:username/reviews"
                      element={<Userreviews />}
                    />
  
                    <Route
                      path="/profile/:username/posts"
                      element={<Userposts />}
                    />
  
                    <Route
                      path="/profile/edit/favourites"
                      element={
                        <PageAuth>
                          <Editfavourites />
                        </PageAuth>
                      }
                    />
                    <Route
                      path="/notifications"
                      element={
                        <PageAuth>
                          <Notifications />
                        </PageAuth>
                      }
                    />
                    <Route
                      path="/movies/:id/addreview"
                      element={
                        <PageAuth>
                          <Reviewaddpage />
                        </PageAuth>
                      }
                    />
  
                    <Route
                      path="/movies/:id/addpost"
                      element={
                        <PageAuth>
                          <Postaddpage />
                        </PageAuth>
                      }
                    />
                    <Route
                      path="/admin"
                      element={
                        <PageAdmin>
                          <AdminMenu />
                        </PageAdmin>
                      }
                    />
                    <Route
                      path="/admin/user"
                      element={
                        <PageAdmin>
                          <AdminUser />
                        </PageAdmin>
                      }
                    />
                    <Route
                      path="/admin/movie"
                      element={
                        <PageAdmin>
                          <AdminMovie />
                        </PageAdmin>
                      }
                    />
                    <Route
                      path="/admin/forum"
                      element={
                        <PageAdmin>
                          <AdminForum />
                        </PageAdmin>
                      }
                    />
                    <Route
                      path="/admin/news"
                      element={
                        <PageAdmin>
                          <AdminNews />
                        </PageAdmin>
                      }
                    />
            
        <Route path="*" element={<ErrorPage />} />
      </Route>  */
}

export default function App() {
  return <RouterProvider router={router} />;
}
