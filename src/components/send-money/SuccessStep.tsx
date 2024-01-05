import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ContinueButton from "./ContinueButton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { clearTransfer } from "../../redux/features/transfer/transferSlice";
import { RootState } from "../../redux/store";
import { getCurrencyCode } from "../../utils/getCurrencyCode";
import { DeliveryMethod, Institution } from "../../types";
import { formatAmount } from "../../utils/formatAmount";
import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

const SuccessStep = () => {
  const theme = useTheme();

  const dispatch = useAppDispatch();

  const transfer = useAppSelector((state: RootState) => state.transfer);

  const { t } = useTranslation();

  const parseConfirmationMessage = (
    deliveryMethod: DeliveryMethod,
    institution: Institution
  ) => {
    if (deliveryMethod === "bankDeposit") {
      return `${t("sendMoney.success.confirmation.bankDeposit.line1")} ${
        institution.name
      } ${t("sendMoney.success.confirmation.bankDeposit.line2")} `;
    } else {
      if (institution.id !== 0) {
        return `${t("sendMoney.success.confirmation.cash.line1")} ${
          institution.name
        }. `;
      } else {
        return `${t("sendMoney.success.confirmation.cash.line1")} ${t(
          "sendMoney.success.confirmation.cash.line2"
        )} ${institution.name}. `;
      }
    }
  };

  return (
    <div>
      <Typography variant="mainHeading">
        {t("sendMoney.success.mainHeading")}
      </Typography>
      <Box sx={{ marginBottom: "16px" }}>
        <Typography color={theme.palette.primary.main}>{`${formatAmount(
          transfer.receiveAmount
        )} ${getCurrencyCode(transfer.country?.code as string)}`}</Typography>
        <Typography>{`${t("sendMoney.success.received")} ${
          transfer.recipient?.name?.firstName
        } ${transfer.recipient?.name?.lastName}`}</Typography>
      </Box>

      <Typography>
        <span style={{ fontWeight: "bold" }}>
          {parseConfirmationMessage(
            transfer.deliveryMethod as DeliveryMethod,
            transfer.institution as Institution
          )}
        </span>
        {t("sendMoney.success.confirmation.complete")}
      </Typography>
      <ContinueButton
        text="New Transfer"
        continueAction={() => dispatch(clearTransfer())}
      />
    </div>
  );
};

export default SuccessStep;
