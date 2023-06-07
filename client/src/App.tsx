import { useState, useEffect, useMemo } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";
import { themeSettings } from "@/theme";
import Scrollbtn from "@/shared/Scrollbtn";
import Footer from "@/scenes/global/Footer";
import Navbar from "@/scenes/global/Navbar";
import Header from "@/scenes/global/Header";
import Home from "@/scenes/home";
import ErrorPage from "@/scenes/errorpage";

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Router>
          <header>
            <Header />
            <Navbar />
          </header>
          <Container
            component="main"
            maxWidth="lg"
            sx={{
              height: "100%",
              bgcolor: themeSettings.palette.background.light,
            }}
          >
            <Routes>
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
          */}
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Container>
        </Router>

        <Scrollbtn />
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
