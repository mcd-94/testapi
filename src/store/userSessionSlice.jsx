import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userSession: false,
  user: null,
};

const userSessionSlice = createSlice({
  name: "userSession",
  initialState,
  reducers: {
    setSession(state) {
      const user = sessionStorage.getItem("user");
      if (user) {
        const parsedUser = JSON.parse(user);
        state.user = parsedUser;
        state.userSession = true;
      } else {
        state.user = null;
        state.userSession = false;
      }
    },
    clearSession(state) {
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
      state.user = null;
      state.userSession = false;
    },
  },
});

export const { setSession, clearSession } = userSessionSlice.actions;
export default userSessionSlice.reducer;
