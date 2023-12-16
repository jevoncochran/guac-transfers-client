import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
import { TransferMethod } from "./SelectAmountStep";
import { useTheme } from "@mui/material";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { CURRENCIES } from "../../constants";
import { calculateConversion } from "../../utils/calculateConversion";

interface Props {
  label: string;
  method: TransferMethod;
  transferMethod: TransferMethod;
  setTransferMethod: React.Dispatch<React.SetStateAction<TransferMethod>>;
  speedIcon: JSX.Element;
  speed: string;
  paymentIcon: JSX.Element;
  payment: string;
  charge: number;
  rate: number;
}

const TransferMethodCard = ({
  label,
  method,
  transferMethod,
  setTransferMethod,
  speedIcon,
  speed,
  paymentIcon,
  payment,
  charge,
  rate,
}: Props) => {
  const theme = useTheme();

  const userCountry = useAppSelector(
    (state: RootState) => state.auth.user?.country
  );
  const transferCountry = useAppSelector(
    (state: RootState) => state.transfer.country
  );

  const userCurrency = CURRENCIES[userCountry.code].code;
  const transferCurrency = CURRENCIES[transferCountry.code].code;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransferMethod(e.target.value as TransferMethod);
  };

  return (
    <Box
      width="full"
      height="150px"
      border={
        transferMethod === method
          ? `1px solid ${theme.palette.primary.main}`
          : `1px solid black`
      }
      borderRadius="6px"
      display="flex"
      sx={{
        backgroundColor:
          transferMethod === method
            ? theme.palette.primary.light
            : "transparent",
        "&:not(:last-of-type)": { marginBottom: "12px" },
      }}
    >
      <Box
        width="42px"
        height="100%"
        borderRight={
          transferMethod === "card"
            ? `1px solid ${theme.palette.primary.main}`
            : `1px solid black`
        }
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Radio
          checked={transferMethod === method}
          value={method}
          onChange={handleChange}
        />
      </Box>
      <Box padding="16px">
        <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: "4px" }}>
          {label}
        </Typography>
        <Box display="flex" sx={{ marginBottom: "4px" }}>
          <Box sx={{ marginRight: "6px" }}>{speedIcon}</Box>
          <Typography>Money delivered in {` ${speed}`}</Typography>
        </Box>
        <Box display="flex" sx={{ marginBottom: "4px" }}>
          <Box sx={{ marginRight: "6px" }}>{paymentIcon}</Box>
          <Typography>{`Pay with ${payment}`}</Typography>
        </Box>
        <Typography fontSize="18px">
          <span
            style={{ color: theme.palette.primary.main }}
          >{`1 ${userCurrency} =`}</span>
          <span
            style={{ color: theme.palette.primary.main, fontWeight: "bold" }}
          >
            {" "}
            {calculateConversion(1, rate, charge).toLocaleString()}{" "}
            {transferCurrency}
          </span>
        </Typography>
      </Box>
    </Box>
  );
};

export default TransferMethodCard;
