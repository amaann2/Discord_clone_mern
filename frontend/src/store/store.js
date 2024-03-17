import { composeWithDevTools } from "redux-devtools-extension";
import {
  applyMiddleware,
  legacy_createStore as createStore,
  combineReducers,
} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";
import alertReducer from "./reducers/alertReducer";
import friendsReducer from "./reducers/friendsReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  friends: friendsReducer,
});
const middleware = [thunk, logger];
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
