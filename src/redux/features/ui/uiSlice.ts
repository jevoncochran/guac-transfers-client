import { createSlice } from "@reduxjs/toolkit";

export interface UiState {
  authDialog: {
    isOpen: boolean;
    dialog: "signIn" | "signUp" | null;
  };
  phoneDialog: { isOpen: boolean; dialog: "sender" | "recipient" | null };
}

const initialState: UiState = {
  authDialog: { isOpen: false, dialog: null },
  phoneDialog: { isOpen: false, dialog: null },
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
    openSenderPhoneModal: (state) => {
      state.phoneDialog = { isOpen: true, dialog: "sender" };
    },
    openRecipientPhoneModal: (state) => {
      state.phoneDialog = { isOpen: true, dialog: "recipient" };
    },
    closePhoneModal: (state) => {
      state.phoneDialog = initialState.phoneDialog;
    },
  },
});

export const {
  openLoginModal,
  openRegisterModal,
  closeAuthModal,
  openSenderPhoneModal,
  openRecipientPhoneModal,
  closePhoneModal,
} = uiSlice.actions;

export default uiSlice.reducer;
