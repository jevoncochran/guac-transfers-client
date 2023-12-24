import Typography from "@mui/material/Typography";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import InputGroup from "../InputGroup";
import {
  goToNextTransferStep,
  setRecipientAddress,
} from "../../redux/features/transfer/transferSlice";
import ContinueButton from "./ContinueButton";

const EnterRecipientAddressStep = () => {
  const dispatch = useAppDispatch();

  const recipientAccount = useAppSelector(
    (state: RootState) => state.transfer.recipient?.account
  );
  const recipientAddress = useAppSelector(
    (state: RootState) => state.transfer.recipient?.address
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setRecipientAddress({
        ...recipientAddress,
        [e.target.name]: e.target.value,
      })
    );
  };

  return (
    <div>
      <Typography variant="transferStepHeading">Recipient Address</Typography>
      <Typography>
        {`Enter the address associated with the ${
          recipientAccount?.bank?.name
        } account ending in ${recipientAccount?.accountNumber?.slice(-4)}`}
      </Typography>

      <InputGroup
        inputName="streetAddress"
        label="Street Address"
        value={recipientAddress?.streetAddress ?? ""}
        placeholder="Please enter street address of recipient"
        onChange={handleChange}
      />

      <InputGroup
        inputName="city"
        label="City"
        value={recipientAddress?.city ?? ""}
        placeholder="Please enter city of recipient"
        onChange={handleChange}
      />

      <InputGroup
        inputName="department"
        label="Department"
        value={recipientAddress?.department ?? ""}
        placeholder="Please enter department of recipient"
        onChange={handleChange}
      />

      <ContinueButton continueAction={() => dispatch(goToNextTransferStep())} />
    </div>
  );
};

export default EnterRecipientAddressStep;
