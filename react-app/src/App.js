import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import NavBar from "./components/Navbar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/UserComponent";
import { authenticate } from "./store/session";
import PostsComments from "./components/CommentComponents/PostsComments";
import EditComment from "./components/CommentComponents/EditComment";
import CommentDetails from "./components/CommentComponents/CommentDetails";
import PostComponent from "./components/PostsComponent";
import ExplorerPosts from "./components/PostsComponent/ExplorerPosts";
import FollowingPosts from "./components/PostsComponent/FollowingPosts";
import HomePageComponent from "./components/HomePageComponent";
import SignUpUserForm from "./components/SignUpComponent";

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
    <BrowserRouter>
      <NavBar />
      <Switch>

        <Route path="/sign-up" exact={true}>
          <SignUpUserForm />
        </Route>
        <Route exact path="/explore">
          <ExplorerPosts />
        </Route>
        <Route exact path="/posts">
          <FollowingPosts />
        </Route>
        <Route exact path="/">
          <HomePageComponent />
        </Route>
        <Route exact path="/posts/:postId">
          <PostComponent />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <Route path="/posts/:postId/comments" exact={true}>
          <PostsComments />
        </Route>
        <Route path="/comments/:commentId" exact={true}>
          <CommentDetails />
        </Route>

        <Route path="/comments/:commentId/edit" exact={true}>
          <EditComment />
        </Route>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
