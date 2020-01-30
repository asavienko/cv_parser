import { combineReducers } from "redux";
import cvReducer from "./cvReducer";
import userReducer from "./userReducer";

export default combineReducers({ cvReducer, userReducer });
