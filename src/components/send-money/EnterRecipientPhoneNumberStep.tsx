import { useState } from "react";
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
import { identifyMissingFields } from "../../utils/missingFieldCheck";
import FormErrorAlert from "../FormErrorAlert";

const EnterRecipientPhoneNumberStep = () => {
  const dispatch = useAppDispatch();
  const transferCountry = useAppSelector(
    (state: RootState) => state.transfer.country
  );
  const recipientPhoneNum = useAppSelector(
    (state: RootState) => state.transfer.recipient?.phone
  );

  const [requiredFieldError, setRequiredFieldError] = useState("");

  const { t } = useTranslation();

  const handleContinue = () => {
    // Reset errors
    setRequiredFieldError("");

    // Validate required fields
    if (!recipientPhoneNum?.body) {
      setRequiredFieldError("Please enter your recipient's phone number");
      return;
    }

    dispatch(goToNextTransferStep());
  };

  return (
    <div>
      <div>
        <Typography variant="mainHeading">
          {t("sendMoney.enterRecipientPhoneNumber.mainHeading")}
        </Typography>
        <Typography variant="subtitle1">
          {t("sendMoney.enterRecipientPhoneNumber.subtitle")}
        </Typography>

        <FormErrorAlert error={requiredFieldError} />

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
          error={identifyMissingFields(
            requiredFieldError,
            recipientPhoneNum?.body ?? ""
          )}
        />
        <ContinueButton continueAction={handleContinue} />
      </div>
      <PhonePrefixMenu type="recipient" />
    </div>
  );
};

export default EnterRecipientPhoneNumberStep;
