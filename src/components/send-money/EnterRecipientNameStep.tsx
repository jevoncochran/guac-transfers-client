import Typography from "@mui/material/Typography";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import {
  setRecipientName,
  setTransferStep,
} from "../../redux/features/transfer/transferSlice";
import ContinueButton from "./ContinueButton";
import { TransferStep } from "../../types";
import InputGroup from "../InputGroup";

const EnterRecipientNameStep = () => {
  const dispatch = useAppDispatch();

  const deliveryMethod = useAppSelector(
    (state: RootState) => state.transfer.deliveryMethod
  );

  const recipientName = useAppSelector(
    (state: RootState) => state.transfer.recipient?.name
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setRecipientName({
        ...recipientName,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleContinue = () => {
    const nextStep =
      deliveryMethod === "bankDeposit"
        ? TransferStep.EnterRecipientBankAccount
        : TransferStep.EnterRecipientAddress;

    dispatch(setTransferStep(nextStep));
  };

  return (
    <div>
      <Typography variant="transferStepHeading">Recipient Name</Typography>
      <Typography variant="subtitle1">
        {`This information should match the name on your recipient's ${
          deliveryMethod === "bankDeposit"
            ? "bank account"
            : "government-issued ID"
        }`}
      </Typography>
      <InputGroup
        inputName="firstName"
        label="First Name"
        value={recipientName?.firstName ?? ""}
        placeholder={recipientName?.firstName ? "" : "Please enter first name"}
        onChange={handleChange}
      />
      <InputGroup
        inputName="middleName"
        label="Middle Name"
        value={recipientName?.middleName ?? ""}
        placeholder={
          recipientName?.middleName ? "" : "Please enter middle name (optional)"
        }
        onChange={handleChange}
      />
      <InputGroup
        inputName="lastName"
        label="Last Name"
        value={recipientName?.lastName ?? ""}
        placeholder={recipientName?.lastName ? "" : "Please enter last name"}
        onChange={handleChange}
      />
      <ContinueButton continueAction={handleContinue} />
    </div>
  );
};

export default EnterRecipientNameStep;
