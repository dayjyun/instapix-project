import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import likesReducer from './likes';
import hashtagReducer from './hashtags'
import posts from './posts'
import comments from './comments'
import followReducer from './follow';

const rootReducer = combineReducers({
  session,
  likes: likesReducer,
  hashtags: hashtagReducer,
  comments,
  posts,
  follow: followReducer
}


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
