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
  EnterSenderPhoneNumber = 9,
  SelectPaymentMethod = 10,
  EnterCardDetails = 11,
  ConfirmTransfer = 12,
  Success = 13,
}

export type TransferMethod = "card" | "bankAccount";

export type DeliveryMethod = "bankDeposit" | "cashPickup";

export interface PaymentMethod {
  type: TransferMethod;
  method: Card | BankAccount;
}

export interface Institution {
  id: number | string;
  name: string;
}

export interface Phone {
  iso: string;
  prefix: string;
  body: string;
}

export interface Recipient {
  id?: number;
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
  phone?: Phone;
}

export interface PreviousTransferRecipient {
  id: number;
  senderId: number;
  firstName: string;
  lastName: string;
  deliveryMethod: DeliveryMethod;
  institutionId: number;
  institution: string;
  accountNumber?: string;
  phone: Phone;
  streetAddress: string;
  city: string;
  state: string;
}

export interface Address {
  streetAddress: string;
  city: string;
  department: string;
}

interface Card {
  stripeId: string;
  type: CardType;
  brand: CardBrand;
  last4: string;
}

interface BankAccount {
  stripeId: string;
  type: BankAccountType;
  last4: string;
}

type CardBrand = "visa" | "mastercard";

type CardType = "debit" | "credit";

type BankAccountType = "checking" | "savings";

export interface Transfer {
  id: number;
  sent: Date;
  senderId: number;
  senderCountry: string;
  paymentMethod: TransferMethod;
  paymentMethodStripeId: string;
  deliveryMethod: DeliveryMethod;
  institutionId: number;
  institution: string;
  recipientFirstName: string;
  recipientLastName: string;
  transferCountry: string;
  recipientPhone: string;
  recipientStreetAddress: string;
  recipientCity: string;
  recipientState: string;
  recipientAccountNumber: string;
  sendAmount: number;
  standardFee: number;
  thirdPartyCharge: number;
  receiveAmount: number;
}
