import SelectAmountStep from "../components/send-money/SelectAmountStep";
import SelectRecipientStep from "../components/send-money/SelectRecipientStep";
import { TransferStep } from "../types";

const useGetTransferStep = (step: TransferStep) => {
  switch (step) {
    case TransferStep.SelectRecipient:
      return { component: <SelectRecipientStep /> };
    case TransferStep.SelectAmount:
      return { component: <SelectAmountStep /> };
  }
};

export default useGetTransferStep;
