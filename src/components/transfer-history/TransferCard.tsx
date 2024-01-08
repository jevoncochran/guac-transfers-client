import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Transfer } from "../../types";
import { getCurrencyCode } from "../../utils/getCurrencyCode";
import { useTheme } from "@mui/material";
import useFormatAmount from "../../hooks/useFormatAmout";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import { formatDate } from "../../utils/formatDate";

interface Props {
  transfer: Transfer;
}

const TransferCard = ({ transfer }: Props) => {
  const theme = useTheme();

  const { t } = useTranslation();

  const { formatAmount } = useFormatAmount();

  return (
    <Card
      sx={{
        padding: "16px",
        width: "500px",
        height: "132px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
        "&:hover": { backgroundColor: theme.palette.primary.light },
        "&:not(:last-of-type)": { marginBottom: "16px" },
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Typography variant="cardLabel">{`${transfer.recipientFirstName} ${transfer.recipientLastName}`}</Typography>
        <Box display="flex" flexDirection="column" alignItems="flex-end">
          <Typography variant="cardSent">{`${formatAmount(
            transfer.sendAmount
          )} ${getCurrencyCode(transfer.senderCountry)}`}</Typography>
          <Typography variant="cardReceived">{`${formatAmount(
            transfer.receiveAmount
          )} ${getCurrencyCode(transfer.transferCountry)}`}</Typography>
        </Box>
      </Box>
      <Typography variant="cardDate">{`${t(
        "transferHistory.transferCard.sent"
      )} ${formatDate(transfer.sent, i18n.language)}`}</Typography>
    </Card>
  );
};

export default TransferCard;
