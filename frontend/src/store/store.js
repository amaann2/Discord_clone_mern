import { composeWithDevTools } from "redux-devtools-extension";
import {
  applyMiddleware,
  legacy_createStore as createStore,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";
import alertReducer from "./reducers/alertReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  alert:alertReducer

});
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
