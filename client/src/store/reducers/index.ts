import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import contacts from "./contacts";

export default (history: any) =>
  combineReducers({
    router: connectRouter(history),
    contacts,
  });
