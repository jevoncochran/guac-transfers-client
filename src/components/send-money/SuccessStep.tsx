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

const SuccessStep = () => {
  const theme = useTheme();

  const dispatch = useAppDispatch();

  const transfer = useAppSelector((state: RootState) => state.transfer);

  const parseConfirmationMessage = (
    deliveryMethod: DeliveryMethod,
    institution: Institution
  ) => {
    if (deliveryMethod === "bankDeposit") {
      return `We have confirmed your funds were deposited to your recipient's ${institution.name} account. `;
    } else {
      if (institution.id !== 0) {
        return `We have confirmed your funds are available for cash pickup at ${institution.name}. `;
      } else {
        return `We have confirmed your funds are available for cash pickup at the following locations: ${institution.name}. `;
      }
    }
  };

  return (
    <div>
      <Typography variant="mainHeading">Successful Transfer</Typography>
      <Box sx={{ marginBottom: "16px" }}>
        <Typography color={theme.palette.primary.main}>{`${formatAmount(
          transfer.receiveAmount
        )} ${getCurrencyCode(transfer.country?.code as string)}`}</Typography>
        <Typography>{`Received by ${transfer.recipient?.name?.firstName} ${transfer.recipient?.name?.lastName}`}</Typography>
      </Box>

      <Typography>
        <span style={{ fontWeight: "bold" }}>
          {parseConfirmationMessage(
            transfer.deliveryMethod as DeliveryMethod,
            transfer.institution as Institution
          )}
        </span>
        Your transaction is complete and we hope to see you again.
      </Typography>
      <ContinueButton
        text="New Transfer"
        continueAction={() => dispatch(clearTransfer())}
      />
    </div>
  );
};

export default SuccessStep;
