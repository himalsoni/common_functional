/** @format */
import { applyMiddleware, compose } from "redux";
import { legacy_createStore as createStore } from 'redux';
import ReduxThunk from "redux-thunk";
import reducers from "@redux";

const middleware = [
  ReduxThunk,
  // logger
  // more middleware
];

const configureStore = () => {
  return createStore(reducers, undefined, compose(applyMiddleware(...middleware)));
};
// const configureStore = () => {
//   return createStore(reducers, // your reducers
//     compose(
//       applyMiddleware(thunk)
//     )
//   )
// };

export default configureStore();
