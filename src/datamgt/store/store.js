import { combineReducers, configureStore } from "@reduxjs/toolkit";

import companyReducer from "../reducer/companySlice";

const reducer = combineReducers({
  // USER
  companyState: companyReducer,
});

export const store = configureStore({
  reducer,
});
