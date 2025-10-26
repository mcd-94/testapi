//loginModalSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const loginModalSlice = createSlice({
  name: "loginModal",
  initialState,
  reducers: {
    toggleLoginModal(state) {
      state.isOpen = !state.isOpen;
    },
    openLoginModal(state) {
      state.isOpen = true;
    },
    closeLoginModal(state) {
      state.isOpen = false;
    },
  },
});

export const { toggleLoginModal, openLoginModal, closeLoginModal } =
  loginModalSlice.actions;
export default loginModalSlice.reducer;
