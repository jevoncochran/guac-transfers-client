import { createSlice } from "@reduxjs/toolkit";
import { Country, DeliveryMethod, TransferStep } from "../../../types";
import { TransferMethod } from "../../../types";

interface Institution {
  id: number | string;
  name: string;
}

export interface TransferState {
  country: Country | null;
  step: TransferStep;
  sendAmount: number | null;
  receiveAmount: number | null;
  thirdPartyCharge: number | null;
  standardFee: number | null;
  transferMethod: TransferMethod;
  deliveryMethod: DeliveryMethod | null;
  institution: Institution | null;
}

const initialState: TransferState = {
  country: null,
  step: 1,
  sendAmount: null,
  receiveAmount: null,
  thirdPartyCharge: null,
  standardFee: 0,
  transferMethod: "card",
  deliveryMethod: null,
  institution: null,
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
    setTransferAmount: (state, action) => {
      state.sendAmount = action.payload.sendAmount;
      state.receiveAmount = action.payload.receiveAmount;
      state.thirdPartyCharge = action.payload.thirdPartyCharge;
    },
    setSendAmount: (state, action) => {
      state.sendAmount = action.payload;
    },
    setReceiveAmount: (state, action) => {
      state.receiveAmount = action.payload;
    },
    clearTransferAmount: (state) => {
      state.sendAmount = null;
      state.receiveAmount = null;
      state.thirdPartyCharge = null;
      state.standardFee = null;
    },
    setTransferMethod: (state, action) => {
      state.transferMethod = action.payload;
    },
    setDeliveryMethod: (state, action) => {
      state.deliveryMethod = action.payload;
    },
    setInstitution: (state, action) => {
      state.institution = action.payload;
    },
  },
});

export const {
  setTransferCountry,
  goToNextTransferStep,
  goToPreviousTransferStep,
  setTransferAmount,
  setSendAmount,
  setReceiveAmount,
  clearTransferAmount,
  setTransferMethod,
  setDeliveryMethod,
  setInstitution,
} = transferSlice.actions;

export default transferSlice.reducer;
