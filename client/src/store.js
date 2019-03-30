// entry point to Redux store
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'; // index.js will be automatic here so really: './reducers/index.js';

// sets initial state to empty object
const initialState = {};

// creating a middleware constant , middleware can be added to array
const middleware = [thunk];

// creates the store that can be accessed throughout the app
// const store = createStore(
//         rootReducer,
//         initialState,
//         // must use compose() from 'redux' in order to use middleware like thunk
//         compose(
//                 // use spread operator to apply any middleware to the store
//                 applyMiddleware(...middleware),
//                 // this allows us to use the Redux Devtools
//                 window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//         )
// );
// RECOMMENDED FIX online
const composeEnhancers =
        typeof window === 'object' && window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_
                ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
                : compose;
const composingMiddlewareAndDevTools = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(rootReducer, initialState, composingMiddlewareAndDevTools);

export default store;
