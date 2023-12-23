export interface Language {
  code: string;
  name: string;
}

export interface Country {
  code: string;
  name: string;
}

export interface MenuItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
  onSelect?: () => void;
}

export enum TransferStep {
  SelectRecipient = 1,
  SelectAmount = 2,
  SelectDeliveryMethod = 3,
  SelectInstitution = 4,
  EnterRecipientName = 5,
  EnterRecipientBankAccount = 6,
  EnterRecipientAddress = 7,
  EnterRecipientPhoneNumber = 8,
  SelectPaymentMethod = 9,
  EnterCardDetails = 10,
  ConfirmTransfer = 11,
}

export type TransferMethod = "card" | "bankAccount";

export type DeliveryMethod = "bankDeposit" | "cashPickup";

export interface PaymentMethod {
  type: TransferMethod;
  stripeId: string;
}

export interface Institution {
  id: number | string;
  name: string;
}

export interface Recipient {
  name?: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  account?: {
    bank?: Institution;
    accountNumber?: string;
  };
  address?: Address;
  phone?: string;
}

export interface Address {
  streetAddress: string;
  city: string;
  department: string;
}
