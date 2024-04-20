import { useState } from "react";
import Typography from "@mui/material/Typography";
import InputGroup from "../InputGroup";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import {
  setRecipientBankAccount,
  setTransferStep,
} from "../../redux/features/transfer/transferSlice";
import ContinueButton from "./ContinueButton";
import { useTranslation } from "react-i18next";
import { Country, TransferStep } from "../../types";
import FormErrorAlert from "../FormErrorAlert";
import { identifyMissingFields } from "../../utils/missingFieldCheck";

const EnterRecipientBankAccountStep = () => {
  const dispatch = useAppDispatch();

  const recipientBankAccount = useAppSelector(
    (state: RootState) => state.transfer.recipient?.account?.accountNumber
  );
  const transferCountry = useAppSelector(
    (state: RootState) => state.transfer.country
  );

  const [requiredFieldError, setRequiredFieldError] = useState("");

  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setRecipientBankAccount(e.target.value));
  };

  const handleContinue = (transferCountry: Country) => {
    // Reset errors
    setRequiredFieldError("");

    // Validate account number is entered as required
    if (!recipientBankAccount) {
      setRequiredFieldError("Please enter your recipient's bank account number");
      return;
    }

    let nextStep: TransferStep;

    // If recipient country is Colombia, go to recipient address step
    if (transferCountry.code === "CO") {
      nextStep = TransferStep.EnterRecipientAddress;
    } else {
      // If not, go to recipient phone number step
      nextStep = TransferStep.EnterRecipientPhoneNumber;
    }

    dispatch(setTransferStep(nextStep));
  };

  return (
    <div>
      <Typography variant="mainHeading">
        {t("sendMoney.enterRecipientBankAccount.mainHeading")}
      </Typography>
      <Typography variant="subtitle1">
        {t("sendMoney.enterRecipientBankAccount.subtitle")}
      </Typography>

      <FormErrorAlert error={requiredFieldError} />

      <InputGroup
        inputName="accountNumber"
        label={t(
          "sendMoney.enterRecipientBankAccount.inputs.accountNumber.label"
        )}
        value={recipientBankAccount ?? ""}
        placeholder={
          recipientBankAccount
            ? ""
            : t(
                "sendMoney.enterRecipientBankAccount.inputs.accountNumber.placeholder"
              )
        }
        onChange={handleChange}
        error={identifyMissingFields(
          requiredFieldError,
          recipientBankAccount ?? ""
        )}
      />
      <ContinueButton
        continueAction={() => handleContinue(transferCountry as Country)}
      />
    </div>
  );
};

export default EnterRecipientBankAccountStep;
