import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
<<<<<<< HEAD
import likesReducer from './likes';
import hashtagReducer from './hashtags'

const rootReducer = combineReducers({
  session,
  likes: likesReducer,
  hashtags: hashtagReducer
=======
import comments from './comments'
import posts from './posts'

const rootReducer = combineReducers({
  session,
  comments,
  posts
>>>>>>> jan-store
});


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
