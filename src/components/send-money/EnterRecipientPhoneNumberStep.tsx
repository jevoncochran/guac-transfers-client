import Typography from "@mui/material/Typography";
import InputGroup from "../InputGroup";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import {
  goToNextTransferStep,
  setRecipientPhoneNum,
} from "../../redux/features/transfer/transferSlice";
import ContinueButton from "./ContinueButton";

const EnterRecipientPhoneNumberStep = () => {
  const dispatch = useAppDispatch();
  const recipientPhoneNum = useAppSelector(
    (state: RootState) => state.transfer.recipient?.phone
  );

  return (
    <div>
      <Typography variant="transferStepHeading">
        Recipient Phone Number
      </Typography>
      <Typography variant="subtitle1">
        Enter your recipient's phone numnber if you would like us to text them
        transfer updates
      </Typography>
      <InputGroup
        inputName="phone"
        label="Recipient Mobile Number (optional)"
        value={recipientPhoneNum ?? ""}
        placeholder="Please enter your recpient's phone number"
        onChange={(e) => dispatch(setRecipientPhoneNum(e.target.value))}
      />
      <ContinueButton continueAction={() => dispatch(goToNextTransferStep())} />
    </div>
  );
};

export default EnterRecipientPhoneNumberStep;
