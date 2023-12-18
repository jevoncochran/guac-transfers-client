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
  SelectInstitutionStep = 4,
  EnterRecipientNameStep = 5
}

export type TransferMethod = "card" | "bankAccount";

export type DeliveryMethod = "bankDeposit" | "cashPickup";
