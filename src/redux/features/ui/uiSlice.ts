import { createSlice } from "@reduxjs/toolkit";

export interface UiState {
  authDialog: {
    isOpen: boolean;
    dialog: "signIn" | "signUp" | null;
  };
}

const initialState: UiState = {
  authDialog: { isOpen: false, dialog: null },
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.authDialog = { isOpen: true, dialog: "signIn" };
    },
    openRegisterModal: (state) => {
      state.authDialog = { isOpen: true, dialog: "signUp" };
    },
    closeAuthModal: (state) => {
      state.authDialog = initialState.authDialog;
    },
  },
});

export const { openLoginModal, openRegisterModal, closeAuthModal } =
  uiSlice.actions;

export default uiSlice.reducer;
