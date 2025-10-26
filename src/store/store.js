import { configureStore } from "@reduxjs/toolkit";
import startMenuReducer from "@/store/startMenuSlice";
import loginModalReducer from "@/store/loginModalSlice";
import themeReducer from "@/store/themeSlice";
import userSessionReducer from "@/store/userSessionSlice";

export const store = configureStore({
  reducer: {
    startMenu: startMenuReducer,
    theme: themeReducer, // <- ahora sí el slice del tema forma parte del store
    loginModal: loginModalReducer,
    userSession: userSessionReducer,
  },
});
