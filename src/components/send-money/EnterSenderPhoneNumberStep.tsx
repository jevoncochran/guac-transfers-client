import Typography from "@mui/material/Typography";
import InputGroup from "../InputGroup";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import ContinueButton from "./ContinueButton";
import { setUserPhoneNum } from "../../redux/features/auth/authSlice";
import { goToNextTransferStep } from "../../redux/features/transfer/transferSlice";
import axios from "axios";

const EnterSenderPhoneNumberStep = () => {
  const dispatch = useAppDispatch();
  const senderId = useAppSelector((state: RootState) => state.auth.user?.id);
  const senderPhoneNum = useAppSelector(
    (state: RootState) => state.auth.user?.phone
  );

  return (
    <div>
      <div>
        <Typography variant="transferStepHeading">Your Phone Number</Typography>
        <InputGroup
          inputName="phone"
          label="Your Mobile Number"
          value={senderPhoneNum ?? ""}
          placeholder="Please enter your phone number"
          onChange={(e) => dispatch(setUserPhoneNum(e.target.value))}
        />
        <ContinueButton
          continueAction={() => {
            axios
              .patch(`${import.meta.env.VITE_API_URL}/users/${senderId}`, {
                phone: senderPhoneNum,
              })
              .then(() => dispatch(goToNextTransferStep()));
          }}
        />
      </div>
    </div>
  );
};

export default EnterSenderPhoneNumberStep;
