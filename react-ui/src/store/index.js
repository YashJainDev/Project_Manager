// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slice/authSlice";
import { projectAPI } from "../Slice/projectSlice";
import { taskAPI } from "../Slice/taskSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    devTools: true,
    [projectAPI.reducerPath] : projectAPI.reducer,
    [taskAPI.reducerPath] : taskAPI.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(projectAPI.middleware,taskAPI.middleware)
});

export default store;
