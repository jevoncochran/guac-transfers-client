import Typography from "@mui/material/Typography";
import OptionCard from "./OptionCard";
import { useAppDispatch } from "../../redux/hooks";
import {
  goToNextTransferStep,
  setDeliveryMethod,
} from "../../redux/features/transfer/transferSlice";

const SelectDeliveryMethodStep = () => {
  const dispatch = useAppDispatch();

  const onSelect = (value: unknown) => {
    dispatch(setDeliveryMethod(value));
    dispatch(goToNextTransferStep());
  };

  return (
    <div>
      <Typography variant="mainHeading">Delivery Method</Typography>
      <Typography variant="subtitle1">
        How would you like the money delivered?
      </Typography>

      <OptionCard
        label="Bank Deposit"
        handleClick={onSelect}
        value="bankDeposit"
      />
      <OptionCard
        label="Cash Pickup"
        handleClick={onSelect}
        value="cashPickup"
      />
    </div>
  );
};

export default SelectDeliveryMethodStep;
