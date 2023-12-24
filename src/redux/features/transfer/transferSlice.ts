import { createSlice } from "@reduxjs/toolkit";
import {
  Country,
  DeliveryMethod,
  Institution,
  TransferMethod,
  PaymentMethod,
  Recipient,
  TransferStep,
} from "../../../types";

export interface TransferState {
  country: Country | null;
  step: TransferStep;
  sendAmount: number | null;
  receiveAmount: number | null;
  thirdPartyCharge: number | null;
  standardFee: number | null;
  transferMethod: TransferMethod;
  deliveryMethod: DeliveryMethod | null;
  paymentMethod: PaymentMethod | null;
  institution: Institution | null;
  recipient: Recipient | null;
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
  paymentMethod: null,
  institution: null,
  recipient: null,
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
    setTransferStep: (state, action) => {
      state.step = action.payload;
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
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    setInstitution: (state, action) => {
      state.institution = action.payload;
      if (state.deliveryMethod === "bankDeposit") {
        state.recipient = {
          ...state.recipient,
          account: {
            ...state.recipient?.account,
            bank: action.payload,
          },
        };
      }
    },
    setRecipientName: (state, action) => {
      state.recipient = {
        ...state.recipient,
        name: action.payload,
      };
    },
    setRecipientBankAccount: (state, action) => {
      if (state.recipient) {
        state.recipient.account = {
          ...state.recipient?.account,
          accountNumber: action.payload,
        };
      }
    },
    setRecipientAddress: (state, action) => {
      if (state.recipient) {
        state.recipient.address = action.payload;
      }
    },
    setRecipientPhoneNum: (state, action) => {
      if (state.recipient) {
        state.recipient.phone = action.payload;
      }
    },
  },
});

export const {
  setTransferCountry,
  goToNextTransferStep,
  goToPreviousTransferStep,
  setTransferStep,
  setTransferAmount,
  setSendAmount,
  setReceiveAmount,
  clearTransferAmount,
  setTransferMethod,
  setDeliveryMethod,
  setPaymentMethod,
  setInstitution,
  setRecipientName,
  setRecipientBankAccount,
  setRecipientAddress,
  setRecipientPhoneNum,
} = transferSlice.actions;

export default transferSlice.reducer;
