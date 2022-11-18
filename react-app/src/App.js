import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, HashRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import NavBar from "./components/Navbar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import User from "./components/UserComponent";
import { authenticate } from "./store/session";
import ExplorerPosts from "./components/PostsComponent/ExplorerPosts";
import HomePageComponent from "./components/HomePageComponent";
import SignUpUserForm from "./components/SignUpComponent";
import PageNotFound from "./components/PageNotFound";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <HashRouter>
      <NavBar />
      <Switch>
        <Route path="/sign-up">
          <SignUpUserForm />
        </Route>
        <Route exact path="/explore">
          <ExplorerPosts />
        </Route>
        <ProtectedRoute path="/users/:userId">
          <User />
        </ProtectedRoute>
        <Route exact path="/">
          <HomePageComponent />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
