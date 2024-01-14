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
import PhonePrefix from "./PhonePrefix";
import { PHONE_PREFIXES } from "../../constants";
import { openRecipientPhoneModal } from "../../redux/features/ui/uiSlice";
import PhonePrefixMenu from "./PhonePrefixMenu";

const EnterRecipientPhoneNumberStep = () => {
  const dispatch = useAppDispatch();
  const transferCountry = useAppSelector(
    (state: RootState) => state.transfer.country
  );
  const recipientPhoneNum = useAppSelector(
    (state: RootState) => state.transfer.recipient?.phone
  );

  const { t } = useTranslation();

  return (
    <div>
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
          value={recipientPhoneNum?.body ?? ""}
          placeholder={t(
            "sendMoney.enterRecipientPhoneNumber.inputs.phone.placeholder"
          )}
          startAdornment={
            <PhonePrefix
              iso={recipientPhoneNum?.iso ?? (transferCountry?.code as string)}
              code={
                recipientPhoneNum?.prefix?.replace("+", "") ??
                PHONE_PREFIXES[transferCountry?.code as string]
              }
              onClick={() => dispatch(openRecipientPhoneModal())}
            />
          }
          onChange={(e) =>
            dispatch(
              setRecipientPhoneNum({
                iso: recipientPhoneNum?.iso,
                prefix: recipientPhoneNum?.prefix,
                body: e.target.value,
              })
            )
          }
        />
        <ContinueButton
          continueAction={() => dispatch(goToNextTransferStep())}
        />
      </div>
      <PhonePrefixMenu type="recipient" />
    </div>
  );
};

export default EnterRecipientPhoneNumberStep;
