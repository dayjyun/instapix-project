import React, { useState, useEffect } from 'react';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Following from './components/Following/Following';
import Followers from './components/Following/Followers';
import PostsComments from './components/CommentComponents/PostsComments';
import CommentDetails from './components/CommentComponents/CommentDetails';
import EditComment from './components/CommentComponents/EditComment';

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
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
          <NavLink to='/post-comment-modal-test' exact={true}>post comment modal test</NavLink>
        </ProtectedRoute>
        <Route path='/users/:userId/following' exact={true}>
          <Following />
        </Route>
        <Route path='/users/:userId/followers' exact={true}>
          <Followers />
        </Route>
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
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
