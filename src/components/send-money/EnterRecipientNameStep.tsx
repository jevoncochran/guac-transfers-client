import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";

import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import {
  setRecipientName,
  setTransferStep,
} from "../../redux/features/transfer/transferSlice";
import ContinueButton from "./ContinueButton";
import { TransferStep } from "../../types";

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
      <Box>
        <InputLabel>First Name</InputLabel>
        <TextField
          name="firstName"
          value={recipientName?.firstName ?? ""}
          variant="outlined"
          fullWidth
          InputLabelProps={{ shrink: false }}
          placeholder={
            recipientName?.firstName ? "" : "Please enter first name"
          }
          onChange={handleChange}
        />
      </Box>
      <Box>
        <InputLabel>Middle Name</InputLabel>
        <TextField
          name="middleName"
          value={recipientName?.middleName ?? ""}
          variant="outlined"
          fullWidth
          InputLabelProps={{ shrink: false }}
          placeholder={
            recipientName?.middleName
              ? ""
              : "Please enter middle name (optional)"
          }
          onChange={handleChange}
        />
      </Box>
      <Box>
        <InputLabel>Last Name</InputLabel>
        <TextField
          name="lastName"
          value={recipientName?.lastName ?? ""}
          variant="outlined"
          fullWidth
          InputLabelProps={{ shrink: false }}
          placeholder={recipientName?.lastName ? "" : "Please enter last name"}
          onChange={handleChange}
        />
      </Box>
      <ContinueButton continueAction={handleContinue} />
    </div>
  );
};

export default EnterRecipientNameStep;
