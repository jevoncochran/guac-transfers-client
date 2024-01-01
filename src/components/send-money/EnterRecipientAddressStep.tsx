import Typography from "@mui/material/Typography";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import InputGroup from "../InputGroup";
import {
  goToNextTransferStep,
  setRecipientAddress,
} from "../../redux/features/transfer/transferSlice";
import ContinueButton from "./ContinueButton";
import { useTranslation } from "react-i18next";

const EnterRecipientAddressStep = () => {
  const dispatch = useAppDispatch();

  const recipientAccount = useAppSelector(
    (state: RootState) => state.transfer.recipient?.account
  );
  const recipientAddress = useAppSelector(
    (state: RootState) => state.transfer.recipient?.address
  );

  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setRecipientAddress({
        ...recipientAddress,
        [e.target.name]: e.target.value,
      })
    );
  };

  return (
    <div>
      <Typography variant="mainHeading">
        {t("sendMoney.enterRecipientAddress.mainHeading")}
      </Typography>
      <Typography variant="subtitle1">
        {`${t("sendMoney.enterRecipientAddress.subtitle.substring1")} ${
          recipientAccount?.bank?.name
        } ${t(
          "sendMoney.enterRecipientAddress.subtitle.substring2"
        )} ${recipientAccount?.accountNumber?.slice(-4)}`}
      </Typography>

      <InputGroup
        inputName="streetAddress"
        label={t("sendMoney.enterRecipientAddress.inputs.streetAddress.label")}
        value={recipientAddress?.streetAddress ?? ""}
        placeholder={t(
          "sendMoney.enterRecipientAddress.inputs.streetAddress.placeholder"
        )}
        onChange={handleChange}
      />

      <InputGroup
        inputName="city"
        label={t("sendMoney.enterRecipientAddress.inputs.city.label")}
        value={recipientAddress?.city ?? ""}
        placeholder={t(
          "sendMoney.enterRecipientAddress.inputs.city.placeholder"
        )}
        onChange={handleChange}
      />

      <InputGroup
        inputName="department"
        label="Department"
        value={recipientAddress?.department ?? ""}
        placeholder="Please enter department of recipient"
        onChange={handleChange}
      />

      <ContinueButton continueAction={() => dispatch(goToNextTransferStep())} />
    </div>
  );
};

export default EnterRecipientAddressStep;
