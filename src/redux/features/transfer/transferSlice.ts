import { createSlice } from "@reduxjs/toolkit";
import { Country, TransferStep } from "../../../types";

export interface TransferState {
  country: Country | null;
  step: TransferStep;
}
const initialState: TransferState = {
  country: null,
  step: 1,
};

export const transferSlice = createSlice({
  name: "transfer",
  initialState,
  reducers: {
    setTransferCountry: (state, action) => {
      state.country = action.payload;
    },
    goToNextTransferStep: (state) => {
      state.step += 1;
    },
    goToPreviousTransferStep: (state) => {
      state.step -= 1;
    },
  },
});

export const {
  setTransferCountry,
  goToNextTransferStep,
  goToPreviousTransferStep,
} = transferSlice.actions;

export default transferSlice.reducer;
