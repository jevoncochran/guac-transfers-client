import { useState } from "react";
import Typography from "@mui/material/Typography";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import {
  setRecipientName,
  setTransferStep,
} from "../../redux/features/transfer/transferSlice";
import ContinueButton from "./ContinueButton";
import { Country, DeliveryMethod, TransferStep } from "../../types";
import InputGroup from "../InputGroup";
import { useTranslation } from "react-i18next";
import { identifyMissingFields } from "../../utils/missingFieldCheck";
import FormErrorAlert from "../FormErrorAlert";

const EnterRecipientNameStep = () => {
  const dispatch = useAppDispatch();

  const deliveryMethod = useAppSelector(
    (state: RootState) => state.transfer.deliveryMethod
  );
  const recipientName = useAppSelector(
    (state: RootState) => state.transfer.recipient?.name
  );
  const transferCountry = useAppSelector(
    (state: RootState) => state.transfer.country
  );

  const [requiredFieldsError, setRequiredFieldsError] = useState("");

  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setRecipientName({
        ...recipientName,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleContinue = (
    deliveryMethod: DeliveryMethod,
    transferCountry: Country
  ) => {
    // Reset errors
    setRequiredFieldsError("");

    // Validate required fields
    if (!recipientName?.firstName || !recipientName.lastName) {
      setRequiredFieldsError("First name and last name is required");
      return;
    }

    let nextStep: TransferStep;

    // For bank deposit transfers, the next step is recipient bank account step
    if (deliveryMethod === "bankDeposit") {
      nextStep = TransferStep.EnterRecipientBankAccount;
    } else {
      // For cash pickup transfers:
      // Right now, we are only doing addresses if the recipient is in Colombia
      if (transferCountry.code === "CO") {
        nextStep = TransferStep.EnterRecipientAddress;
      } else {
        // If recipient is outside of Colombia, next step is recipient phone number step
        nextStep = TransferStep.EnterRecipientPhoneNumber;
      }
    }

    dispatch(setTransferStep(nextStep));
  };

  return (
    // TODO: This should be a form
    <div>
      <Typography variant="mainHeading">
        {t("sendMoney.enterRecipientName.mainHeading")}
      </Typography>
      <Typography variant="subtitle1">
        {deliveryMethod === "bankDeposit"
          ? t("sendMoney.enterRecipientName.subtitle.bank")
          : t("sendMoney.enterRecipientName.subtitle.cash")}
      </Typography>

      <FormErrorAlert error={requiredFieldsError} />

      <InputGroup
        inputName="firstName"
        label={t("sendMoney.enterRecipientName.inputs.firstName.label")}
        value={recipientName?.firstName ?? ""}
        placeholder={
          recipientName?.firstName
            ? ""
            : t("sendMoney.enterRecipientName.inputs.firstName.placeholder")
        }
        onChange={handleChange}
        error={identifyMissingFields(
          requiredFieldsError,
          recipientName?.firstName ?? ""
        )}
      />
      <InputGroup
        inputName="middleName"
        label={t("sendMoney.enterRecipientName.inputs.middleName.label")}
        value={recipientName?.middleName ?? ""}
        placeholder={
          recipientName?.middleName
            ? ""
            : t("sendMoney.enterRecipientName.inputs.middleName.placeholder")
        }
        onChange={handleChange}
        error=""
      />
      <InputGroup
        inputName="lastName"
        label={t("sendMoney.enterRecipientName.inputs.lastName.label")}
        value={recipientName?.lastName ?? ""}
        placeholder={
          recipientName?.lastName
            ? ""
            : t("sendMoney.enterRecipientName.inputs.lastName.placeholder")
        }
        onChange={handleChange}
        error={identifyMissingFields(
          requiredFieldsError,
          recipientName?.lastName ?? ""
        )}
      />
      <ContinueButton
        continueAction={() =>
          handleContinue(
            deliveryMethod as DeliveryMethod,
            transferCountry as Country
          )
        }
      />
    </div>
  );
};

export default EnterRecipientNameStep;
