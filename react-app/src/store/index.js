import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import likesReducer from "./likes";
import hashtagReducer from "./hashtags";
import comments from "./comments";
import followReducer from "./follow";
import postsReducer from "./posts";
import userReducer from "./users";
import allUsersReducer from "./allUsers";

const rootReducer = combineReducers({
  session,
  comments,
  users: userReducer,
  posts: postsReducer,
  likes: likesReducer,
  hashtags: hashtagReducer,
  follow: followReducer,
  allUsers: allUsersReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  // enhancer = applyMiddleware(thunk);
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
} else {
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
