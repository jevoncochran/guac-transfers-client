import Typography from "@mui/material/Typography";
import OptionCard from "./OptionCard";
import { useAppDispatch } from "../../redux/hooks";
import { goToNextTransferStep } from "../../redux/features/transfer/transferSlice";

const SelectPaymentMethodStep = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <Typography variant="transferStepHeading">Payment Method</Typography>
      <OptionCard
        label="Add New Card"
        value={undefined}
        handleClick={() => dispatch(goToNextTransferStep())}
      />
    </div>
  );
};

export default SelectPaymentMethodStep;
