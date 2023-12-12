import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  user: {
    id: number;
    email: string;
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
  },
});

export const { retrieveUser, logout } = authSlice.actions;

export default authSlice.reducer;
