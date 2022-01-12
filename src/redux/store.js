import { applyMiddleware, createStore } from "redux";
import reduxThunk from "redux-thunk";
import authReducer from "./auth/reducer";

export default createStore(authReducer, applyMiddleware(reduxThunk));
