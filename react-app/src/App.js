import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import TestingComponent from "./components/testingstore";
import PostsComments from "./components/CommentComponents/PostsComments";
import EditComment from "./components/CommentComponents/EditComment";
import CommentDetails from "./components/CommentComponents/CommentDetails";
import Following from "./components/Following/Following";

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
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true}>
          <h1>My Home Page</h1>
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
        <Route>
          <Following path="/users/:userId/following" exact={true} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
