import { useState } from "react";
import Typography from "@mui/material/Typography";
import InputGroup from "../InputGroup";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import ContinueButton from "./ContinueButton";
import { setUserPhoneNum } from "../../redux/features/auth/authSlice";
import { goToNextTransferStep } from "../../redux/features/transfer/transferSlice";
import axios from "axios";
import { useTranslation } from "react-i18next";
import PhonePrefix from "./PhonePrefix";
import { PHONE_PREFIXES } from "../../constants";
import PhonePrefixMenu from "./PhonePrefixMenu";
import { openSenderPhoneModal } from "../../redux/features/ui/uiSlice";
import FormErrorAlert from "../FormErrorAlert";
import { identifyMissingFields } from "../../utils/missingFieldCheck";

const EnterSenderPhoneNumberStep = () => {
  const dispatch = useAppDispatch();

  const sender = useAppSelector((state: RootState) => state.auth.user);
  const senderPhoneNum = useAppSelector(
    (state: RootState) => state.auth.user?.phone
  );

  const [requiredFieldError, setRequiredFieldError] = useState("");

  const { t } = useTranslation();

  const handleContinue = () => {
    // Reset errors
    setRequiredFieldError("");

    // Validate required fields
    if (!senderPhoneNum?.body) {
      setRequiredFieldError("Please enter your phone number");
      return;
    }

    axios
      .patch(`${import.meta.env.VITE_API_URL}/users/${sender?.id}`, {
        phoneIso: senderPhoneNum?.iso,
        phoneNum: `+${senderPhoneNum?.prefix} ${senderPhoneNum?.body.replace(
          /\s+/g,
          ""
        )}`,
      })
      .then(() => dispatch(goToNextTransferStep()));
  };

  return (
    <div>
      <div>
        <Typography variant="mainHeading">
          {t("sendMoney.enterSenderPhoneNumber.mainHeading")}
        </Typography>

        <FormErrorAlert error={requiredFieldError} />

        <InputGroup
          inputName="phone"
          label={t("sendMoney.enterSenderPhoneNumber.inputs.phone.label")}
          value={senderPhoneNum?.body ?? ""}
          placeholder={t(
            "sendMoney.enterSenderPhoneNumber.inputs.phone.placeholder"
          )}
          startAdornment={
            <PhonePrefix
              iso={senderPhoneNum?.iso ?? (sender?.country?.code as string)}
              code={
                // TODO: This needs to be a utility function
                // This is confusing as hell
                senderPhoneNum?.prefix ??
                PHONE_PREFIXES[sender?.country?.code as string]
              }
              onClick={() => dispatch(openSenderPhoneModal())}
            />
          }
          // TODO: Use a debounce here
          onChange={(e) =>
            dispatch(
              setUserPhoneNum({
                iso: senderPhoneNum?.iso ?? (sender?.country?.code as string),
                prefix:
                  senderPhoneNum?.prefix ??
                  PHONE_PREFIXES[sender?.country?.code as string],
                body: e.target.value,
              })
            )
          }
          error={identifyMissingFields(
            requiredFieldError,
            senderPhoneNum?.body ?? ""
          )}
        />
        <ContinueButton continueAction={handleContinue} />
      </div>
      <PhonePrefixMenu type="sender" />
    </div>
  );
};

export default EnterSenderPhoneNumberStep;
