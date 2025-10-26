import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userSession: false,
};

const userSessionSlice = createSlice({
  name: "userSession",
  initialState,
  reducers: {
    setSession(state) {
      // Si hay un usuario en sessionStorage, userSession es true
      const user = sessionStorage.getItem("user");
      state.userSession = !!user; // true si existe, false si no
    },
    clearSession(state) {
      // Para cerrar sesión desde Redux
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
      state.userSession = false;
    },
  },
});

export const { setSession, clearSession } = userSessionSlice.actions;
export default userSessionSlice.reducer;
