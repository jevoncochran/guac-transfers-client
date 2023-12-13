import { createSlice } from "@reduxjs/toolkit";
import { Country } from "../../../types";

export interface TransferState {
  country: Country | null;
}
const initialState: TransferState = {
  country: null,
};

export const transferSlice = createSlice({
  name: "transfer",
  initialState,
  reducers: {
    setTransferCountry: (state, action) => {
      state.country = action.payload;
    },
  },
});

export const { setTransferCountry } = transferSlice.actions;

export default transferSlice.reducer;
