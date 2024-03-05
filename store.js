import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import { authReducer } from "./reducers/AuthReducers";
import { thunk } from "redux-thunk";

const reducers = combineReducers({
  auth: authReducer,
});

const middleware = [thunk]

const initState = {}

const store = createStore(reducers, initState, applyMiddleware(...middleware));

export default store;