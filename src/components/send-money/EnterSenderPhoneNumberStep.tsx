import Typography from "@mui/material/Typography";
import InputGroup from "../InputGroup";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import ContinueButton from "./ContinueButton";
import { setUserPhoneNum } from "../../redux/features/auth/authSlice";
import { goToNextTransferStep } from "../../redux/features/transfer/transferSlice";
import axios from "axios";
import { useTranslation } from "react-i18next";

const EnterSenderPhoneNumberStep = () => {
  const dispatch = useAppDispatch();
  const senderId = useAppSelector((state: RootState) => state.auth.user?.id);
  const senderPhoneNum = useAppSelector(
    (state: RootState) => state.auth.user?.phone
  );

  const { t } = useTranslation();

  return (
    <div>
      <div>
        <Typography variant="mainHeading">
          {t("sendMoney.enterSenderPhoneNumber.mainHeading")}
        </Typography>
        <InputGroup
          inputName="phone"
          label={t("sendMoney.enterSenderPhoneNumber.inputs.phone.label")}
          value={senderPhoneNum ?? ""}
          placeholder={t(
            "sendMoney.enterSenderPhoneNumber.inputs.phone.placeholder"
          )}
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
