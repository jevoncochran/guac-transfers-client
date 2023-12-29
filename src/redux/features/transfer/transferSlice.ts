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
    selectPreviousRecipient: (state, action) => {
      // Previous delivery method to recipient
      state.deliveryMethod = action.payload.deliveryMethod;
      state.recipient = {
        ...state.recipient,
        // ID of previous recipient
        id: action.payload.id,
        // Name of previous recipient
        name: {
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
        },
        // If the previous delivery method was bank deposit or cash pickup via bank, set the relevant bank
        // Otherwise, leave the bank info undefined
        account:
          action.payload.delivery === "bankDeposit" ||
          action.payload.institutionId !== 0
            ? {
                bank: {
                  id: action.payload.institutionId,
                  name: action.payload.institution,
                },
                accountNumber: action.payload.accountNumber,
              }
            : undefined,
        // Address of previous recipient
        address: {
          streetAddress: action.payload.streetAddress,
          city: action.payload.city,
          department: action.payload.state,
        },
        phone: action.payload.phone,
      };
      // Institution of previous recipient (i.e. bank or various cash pickup locations)
      state.institution = {
        id: action.payload.institutionId,
        name: action.payload.institution,
      };
    },
    clearTransfer: (state) => {
      state.step = 1;
      state.sendAmount = null;
      state.receiveAmount = null;
      state.thirdPartyCharge = null;
      state.standardFee = null;
      state.transferMethod = "card";
      state.deliveryMethod = null;
      state.paymentMethod = null;
      state.institution = null;
      state.recipient = null;
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
  selectPreviousRecipient,
  clearTransfer,
} = transferSlice.actions;

export default transferSlice.reducer;
