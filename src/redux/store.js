import { applyMiddleware, combineReducers, createStore } from "redux";
import reduxThunk from "redux-thunk";
import authReducer from "./auth/reducer";
import contactsReducer from "./contacts/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  contacts: contactsReducer,
});
export default createStore(rootReducer, applyMiddleware(reduxThunk));
