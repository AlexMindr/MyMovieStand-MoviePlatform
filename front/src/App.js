import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
//import {Navbar} from './components';
import {
  Footer,
  Home,
  Movies,
  Errorpage,
  Moviepage,
  Login,
  Signup,
  Watchlistpage,
  Profile,
  Editprofile,
  Editfavourites,
  Reviewaddpage,
  Reviewspage,
  Userreviews,
  Postaddpage,
  Postpage,
  Movieposts,
  Userposts,
  AdminUser,
  AdminMenu,
  AdminMovie,
  AdminForum,
  Resetpassword,
  Notifications,
  Navbar,
  Newspage,
} from "./containers";
import CssBaseline from "@mui/material/CssBaseline";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { actionVerify } from "./store/userSlice";
import { actionGetWl } from "./store/watchlistSlice";
import { actionGetRevAndLikes } from "./store/reviewSlice";
import { actionGetNotif } from "./store/notificationSlice";
import PageAuth from "./auxcomponents/routerchecks/PageAuth";
import PageRedirect from "./auxcomponents/routerchecks/PageRedirect";
import PageAdmin from "./auxcomponents/routerchecks/PageAdmin";

//TODO switch countries with auto-complete countries from mui autocomplete

export default function App() {
  const dispatch = useDispatch();
  const { user, verifiedThisSession } = useSelector((state) => state.user);
  const { fetchedThisSessionWl } = useSelector((state) => state.watchlist);
  const { fetchedThisSessionRev } = useSelector((state) => state.review);
  const { fetchedThisSessionNotif } = useSelector((state) => state.notification);

  useEffect(() => {
    if (user && verifiedThisSession === false) {
      dispatch(actionVerify());
    }
  }, [dispatch, user, verifiedThisSession]);

  useEffect(() => {
    if (
      user &&
      verifiedThisSession === true &&
      fetchedThisSessionWl === false
    ) {
      dispatch(actionGetWl());
    }
  }, [user, verifiedThisSession, fetchedThisSessionWl, dispatch]);

  useEffect(() => {
    if (
      user &&
      verifiedThisSession === true &&
      fetchedThisSessionRev === false
    ) {
      dispatch(actionGetRevAndLikes());
    }
  }, [user, verifiedThisSession, fetchedThisSessionRev, dispatch]);

  useEffect(() => {
    if (
      user &&
      verifiedThisSession === true &&
      fetchedThisSessionNotif === false
    ) {
      dispatch(actionGetNotif());
    }
  }, [user, verifiedThisSession, fetchedThisSessionNotif, dispatch]);

  return (
    <>
      <CssBaseline />
      <Router>
        <div className="app__container">
          <Navbar />
          <StyledEngineProvider injectFirst>
            <div className="app__content">
              <Container component="div" >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/movies" element={<Movies />} />
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
                  <Route
                    path="/news/all"
                    element={<Newspage />}
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
                  <Route
                    path="/profile/:username"
                    element={
                        <Profile />
                    }
                  />
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
                    element={
                        <Userreviews />
                    }
                  />

                  <Route
                    path="/profile/:username/posts"
                    element={
                        <Userposts />
                    }
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
                  <Route path="*" element={<Errorpage />} />
                </Routes>
              </Container>
            </div>
          </StyledEngineProvider>
          <Footer />
        </div>
      </Router>
    </>
  );
}
