import SelectAmountStep from "../components/send-money/SelectAmountStep";
import SelectDeliveryMethodStep from "../components/send-money/SelectDeliveryMethodStep";
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
  }
};

export default useGetTransferStep;
