import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import eventReducer from "./events";
import gamesReducer from "./games";
import locationsReducer from "./locations";
import rsvpReducer from "./rsvp";
import loginUserReducer from "./session";


const rootReducer = combineReducers({
  // add reducer functions here
  session: loginUserReducer,
  events: eventReducer,
  rsvps: rsvpReducer,
  locations: locationsReducer,
  games: gamesReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
