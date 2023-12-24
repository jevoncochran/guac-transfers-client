import { createSlice } from "@reduxjs/toolkit";
import { Language, Country } from "../../../types";

export interface AuthState {
  user: {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    language?: Language;
    country?: Country;
    stripeCustomerId?: string;
    phone?: string;
  } | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    retrieveUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
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
    setUserPhoneNum: (state, action) => {
      state.user = {
        ...state.user,
        phone: action.payload,
      };
    },
  },
});

export const {
  retrieveUser,
  logout,
  updateLanguage,
  updateCountry,
  setUserPhoneNum,
} = authSlice.actions;

export default authSlice.reducer;
