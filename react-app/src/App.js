import React, { useState, useEffect } from "react";
import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/Navbar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/UserComponent";
import { authenticate } from "./store/session";
import TestingComponent from "./components/testingstore";
import PostsComments from "./components/CommentComponents/PostsComments";
import EditComment from "./components/CommentComponents/EditComment";
import CommentDetails from "./components/CommentComponents/CommentDetails";
import FollowModal from "./components/FollowModal";
import PostComponent from "./components/PostsComponent";
import GetPostModal from "./components/GetPostModal";
import ExplorerPosts from "./components/PostsComponent/ExplorerPosts";
import FollowingPosts from "./components/PostsComponent/FollowingPosts";

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
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/testingroute">
          <TestingComponent />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>

        <Route exact path="/posts/explorer">
          <ExplorerPosts />
        </Route>

        <Route exact path="/posts">
          <FollowingPosts />
        </Route>

        <ProtectedRoute path="/" exact={true}>
          <div>
            <h1>My Home Page</h1>
            <div className="new-post-button">
              <GetPostModal />
            </div>
          </div>
        </ProtectedRoute>

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

        {/* EDIT COMMENT BROKEN */}
        <Route path="/comments/:commentId/edit" exact={true}>
          <EditComment />
        </Route>

        <ProtectedRoute path="/users/:userId" exact={true}>
          {/* <FollowingModal /> */}
          <User />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
