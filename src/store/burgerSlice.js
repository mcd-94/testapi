//burgerMenuSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const burgerSlice = createSlice({
  name: 'burgerMenu',
  initialState,
  reducers: {
    toggleMenu(state) {
      state.isOpen = !state.isOpen;
    },
    openMenu(state) {
      state.isOpen = true;
    },
    closeMenu(state) {
      state.isOpen = false;
    },
  },
});

export const { toggleMenu, openMenu, closeMenu } = burgerSlice.actions;
export default burgerSlice.reducer;