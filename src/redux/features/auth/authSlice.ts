import { createSlice } from "@reduxjs/toolkit";
import { Language, Country } from "../../../types";

export interface AuthState {
  user: {
    id?: number;
    email?: string;
    language?: Language;
    country?: Country;
  } | null;
}

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    retrieveUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    updateLanguage: (state, action) => {
      state.user = {
        ...state.user,
        language: action.payload,
      };
    },
    updateCountry: (state, action) => {
      state.user = {
        ...state.user,
        country: action.payload,
      };
    },
  },
});

export const { retrieveUser, logout, updateLanguage, updateCountry } =
  authSlice.actions;

export default authSlice.reducer;
