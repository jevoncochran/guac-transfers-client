import Typography from "@mui/material/Typography";
import InputGroup from "../InputGroup";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import {
  goToNextTransferStep,
  setRecipientBankAccount,
} from "../../redux/features/transfer/transferSlice";
import ContinueButton from "./ContinueButton";

const EnterRecipientBankAccountStep = () => {
  const dispatch = useAppDispatch();

  const recipientBankAccount = useAppSelector(
    (state: RootState) => state.transfer.recipient?.account?.accountNumber
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setRecipientBankAccount(e.target.value));
  };
  return (
    <div>
      <Typography variant="transferStepHeading">
        Recipient Bank Account
      </Typography>
      <Typography>Enter your recipient's bank account number</Typography>

      <InputGroup
        inputName="accountNumber"
        label="Account Number"
        value={recipientBankAccount ?? ""}
        placeholder={recipientBankAccount ? "" : "e.g. 123456789"}
        onChange={handleChange}
      />
      <ContinueButton continueAction={() => dispatch(goToNextTransferStep())} />
    </div>
  );
};

export default EnterRecipientBankAccountStep;
