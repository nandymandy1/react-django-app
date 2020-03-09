import { combineReducers } from "redux";
import leads from "../Leads/Reducer";
import auth from "../Auth/Reducer";

export default combineReducers({
  leads,
  auth
});
