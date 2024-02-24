import Typography from "@mui/material/Typography";
import OptionCard from "./OptionCard";
import { useAppDispatch } from "../../redux/hooks";
import {
  goToNextTransferStep,
  setDeliveryMethod,
} from "../../redux/features/transfer/transferSlice";
import { useTranslation } from "react-i18next";

const SelectDeliveryMethodStep = () => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const onSelect = (value: unknown) => {
    dispatch(setDeliveryMethod(value));
    dispatch(goToNextTransferStep());
  };

  return (
    <div>
      <Typography variant="mainHeading">
        {t("sendMoney.selectDeliveryMethod.mainHeading")}
      </Typography>
      <Typography variant="subtitle1">
        {t("sendMoney.selectDeliveryMethod.subtitle")}
      </Typography>

      <OptionCard
        label={t("sendMoney.selectDeliveryMethod.methods.bankDeposit")}
        handleClick={onSelect}
        value="bankDeposit"
      />
      <OptionCard
        label={t("sendMoney.selectDeliveryMethod.methods.cashPickup")}
        handleClick={onSelect}
        value="cashPickup"
      />
    </div>
  );
};

export default SelectDeliveryMethodStep;
