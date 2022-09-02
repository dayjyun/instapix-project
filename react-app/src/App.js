<<<<<<< HEAD

import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/Navbar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import TestingComponent from "./components/testingstore";
import PostsComments from "./components/CommentComponents/PostsComments";
import EditComment from "./components/EditComment";
import CommentDetails from "./components/CommentComponents/CommentDetails";
import Following from "./components/Following/Following";
// import Following from './components/Following/Following';
import Followers from "./components/Following/Followers";
import PostComponent from "./components/PostsComponent";
import ExplorerPosts from "./components/PostsComponent/ExplorerPosts";
import FollowingPosts from "./components/PostsComponent/FollowingPosts";
=======
import React, { useState, useEffect } from 'react';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Navbar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import TestingComponent from './components/testingstore';
import PostsComments from './components/CommentComponents/PostsComments';
import EditComment from './components/CommentComponents/EditComment';
import CommentDetails from './components/CommentComponents/CommentDetails';
import FollowingModal from './components/FollowModal';
import Following from './components/FollowModal/Following';
import Followers from './components/FollowModal/Followers';
import PostComponent from './components/PostsComponent';
import GetPostModal from './components/GetPostModal';
>>>>>>> skimby


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
<<<<<<< HEAD

        {/*  */}

        <Route exact path ='/posts/explorer'>
          <ExplorerPosts />
        </Route>

        <Route exact path='/posts'>
          <FollowingPosts />
        </Route>


        {/*  */}

        <Route path="/users/:userId/following" exact={true}>
=======
        <ProtectedRoute path='/' exact={true} >
          <div>
            <h1>My Home Page</h1>
            <div className='new-post-button'>
              <GetPostModal />
            </div>
          </div>
        </ProtectedRoute>
        <Route path='/users/:userId/following' exact={true}>
>>>>>>> skimby
          <Following />
        </Route>
        <Route path="/users/:userId/followers" exact={true}>
          <Followers />
        </Route>
<<<<<<< HEAD
        <Route exact path="/posts/:postId">
          <PostComponent />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
=======
        <Route path="/posts/:postId/comments" exact={true}>
          <PostsComments />
        </Route>
        <Route path="/comments/:commentId" exact={true}>
          <CommentDetails />
        </Route>
        <Route path="/comments/:commentId/edit" exact={true}>
          <EditComment />
        </Route>
        <Route exact path='/posts/:postId'>
          <PostComponent />
        </Route>

        <ProtectedRoute path='/users' exact={true} >
>>>>>>> skimby
          <UsersList />

        </ProtectedRoute>
<<<<<<< HEAD
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
        <Route path="/users/:userId/following" exact={true}>
          <Following />
        </Route>
=======
        <ProtectedRoute path='/users/:userId' exact={true} >
          <FollowingModal />
          <User />
        </ProtectedRoute>

>>>>>>> skimby
      </Switch>
    </BrowserRouter>
  );
}

export default App;
