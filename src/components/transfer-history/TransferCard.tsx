import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Transfer } from "../../types";
import { getCurrencyCode } from "../../utils/getCurrencyCode";
import { useTheme } from "@mui/material";
import { formatAmount } from "../../utils/formatAmount";

interface Props {
  transfer: Transfer;
}

const TransferCard = ({ transfer }: Props) => {
  const theme = useTheme();

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
        <Typography>{`${transfer.recipientFirstName} ${transfer.recipientLastName}`}</Typography>
        <Box>
          <Typography>{`${formatAmount(transfer.sendAmount)} ${getCurrencyCode(
            transfer.senderCountry
          )}`}</Typography>
          <Typography>{`${formatAmount(
            transfer.receiveAmount
          )} ${getCurrencyCode(transfer.transferCountry)}`}</Typography>
        </Box>
      </Box>
      <Typography>SENT ON DEC 22, 2023</Typography>
    </Card>
  );
};

export default TransferCard;
