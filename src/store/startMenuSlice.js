//burgerMenuSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const startMenuSlice = createSlice({
  name: 'startMenu',
  initialState,
  reducers: {
    toggleStartMenu(state) {
      state.isOpen = !state.isOpen;
    },
    openStartMenu(state) {
      state.isOpen = true;
    },
    closeStartMenu(state) {
      state.isOpen = false;
    },
  },
});

export const { toggleStartMenu, openStartMenu, closeStartMenu } = startMenuSlice.actions;
export default startMenuSlice.reducer;
