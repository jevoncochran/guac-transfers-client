import Typography from "@mui/material/Typography";
import InputGroup from "../InputGroup";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import {
  goToNextTransferStep,
  setRecipientPhoneNum,
} from "../../redux/features/transfer/transferSlice";
import ContinueButton from "./ContinueButton";
import { useTranslation } from "react-i18next";

const EnterRecipientPhoneNumberStep = () => {
  const dispatch = useAppDispatch();
  const recipientPhoneNum = useAppSelector(
    (state: RootState) => state.transfer.recipient?.phone
  );

  const { t } = useTranslation();

  return (
    <div>
      <Typography variant="mainHeading">
        {t("sendMoney.enterRecipientPhoneNumber.mainHeading")}
      </Typography>
      <Typography variant="subtitle1">
        {t("sendMoney.enterRecipientPhoneNumber.subtitle")}
      </Typography>
      <InputGroup
        inputName="phone"
        label={t("sendMoney.enterRecipientPhoneNumber.inputs.phone.label")}
        value={recipientPhoneNum ?? ""}
        placeholder={t(
          "sendMoney.enterRecipientPhoneNumber.inputs.phone.placeholder"
        )}
        onChange={(e) => dispatch(setRecipientPhoneNum(e.target.value))}
      />
      <ContinueButton continueAction={() => dispatch(goToNextTransferStep())} />
    </div>
  );
};

export default EnterRecipientPhoneNumberStep;
