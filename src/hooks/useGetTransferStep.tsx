import EnterCardDetailsStep from "../components/send-money/EnterCardDetailsStep";
import EnterRecipientAddressStep from "../components/send-money/EnterRecipientAddressStep";
import EnterRecipientBankAccountStep from "../components/send-money/EnterRecipientBankAccountStep";
import EnterRecipientNameStep from "../components/send-money/EnterRecipientNameStep";
import EnterRecipientPhoneNumberStep from "../components/send-money/EnterRecipientPhoneNumberStep";
import SelectAmountStep from "../components/send-money/SelectAmountStep";
import SelectDeliveryMethodStep from "../components/send-money/SelectDeliveryMethodStep";
import SelectInstitutionStep from "../components/send-money/SelectInstitutionStep";
import SelectPaymentMethodStep from "../components/send-money/SelectPaymentMethodStep";
import SelectRecipientStep from "../components/send-money/SelectRecipientStep";
import { TransferStep } from "../types";

const useGetTransferStep = (step: TransferStep) => {
  switch (step) {
    case TransferStep.SelectRecipient:
      return { component: <SelectRecipientStep /> };
    case TransferStep.SelectAmount:
      return { component: <SelectAmountStep /> };
    case TransferStep.SelectDeliveryMethod:
      return { component: <SelectDeliveryMethodStep /> };
    case TransferStep.SelectInstitution:
      return { component: <SelectInstitutionStep /> };
    case TransferStep.EnterRecipientName:
      return { component: <EnterRecipientNameStep /> };
    case TransferStep.EnterRecipientBankAccount:
      return { component: <EnterRecipientBankAccountStep /> };
    case TransferStep.EnterRecipientAddress:
      return { component: <EnterRecipientAddressStep /> };
    case TransferStep.EnterRecipientPhoneNumber:
      return { component: <EnterRecipientPhoneNumberStep /> };
    case TransferStep.SelectPaymentMethod:
      return { component: <SelectPaymentMethodStep /> };
    case TransferStep.EnterCardDetails:
      return { component: <EnterCardDetailsStep /> };
  }
};

export default useGetTransferStep;
