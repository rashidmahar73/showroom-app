import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { pagination } from "./reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig: any = {
  key: "root",
  version: 1,
  storage,
  whitelist: ['paginationReducer'], // Only persist this reducer
  timeout: 100, // Adjust this value as necessary
};
const reducer = combineReducers({
  paginationReducer: pagination.reducer,
});
const persistReducerr = persistReducer(persistConfig, reducer);
export default configureStore({
  reducer:persistReducerr,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable checks if needed
    }),
//   reducer: {
//     pagination: pagination.reducer,
//   },
});
