import { useMemo, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import BoltIcon from "@mui/icons-material/Bolt";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import axios from "axios";
import debounce from "lodash.debounce";
import { CURRENCIES } from "../../constants";
import TransferMethodCard from "./TransferMethodCard";

export type TransferMethod = "card" | "bankAccount";

const SelectAmountStep = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const transferCountry = useAppSelector(
    (state: RootState) => state.transfer.country
  );

  const [sendAmount, setSendAmount] = useState<number | null>(null);
  const [receiveAmount, setReceiveAmount] = useState<number | null>(null);
  const [transferMethod, setTransferMethod] = useState<TransferMethod>("card");

  const fromCurrency = CURRENCIES[user?.country?.code]?.code;
  const toCurrency = CURRENCIES[transferCountry?.code]?.code;

  const handleAmountChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!e.target.value) {
      setSendAmount(null);
      setReceiveAmount(null);

      debouncedConversion(undefined, "USD", "COP", false);
    }

    const newValue = Number(e.target.value);

    if (e.target.name === "sendAmount") {
      setSendAmount(newValue);

      // Do conversion
      if (newValue > 0) {
        debouncedConversion(newValue, fromCurrency, toCurrency, false);
      } else {
        setReceiveAmount(0);
      }
    } else {
      setReceiveAmount(newValue);

      //   Do conversion
      if (newValue > 0) {
        debouncedConversion(newValue, toCurrency, fromCurrency, true);
      } else {
        setSendAmount(0);
      }
    }
  };

  const debouncedConversion = useMemo(
    () =>
      debounce((amount, fromCurrency, toCurrency, reversed) => {
        if (!amount) return;
        axios
          .get(
            `${
              import.meta.env.VITE_API_URL
            }/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
          )
          .then((res) => {
            if (!reversed) {
              setReceiveAmount(res.data.result);
            } else {
              setSendAmount(res.data.result);
            }
          });
      }, 500),
    []
  );

  useEffect(() => {
    setSendAmount(null);
    setReceiveAmount(null);
  }, [user?.country, transferCountry]);

  return transferCountry ? (
    <>
      <Box>
        <InputLabel>You send</InputLabel>
        <TextField
          name="sendAmount"
          value={sendAmount?.toString() ?? ""}
          type="number"
          variant="outlined"
          fullWidth
          InputLabelProps={{ shrink: false }}
          InputProps={{
            startAdornment: (
              <img
                src={`https://flagsapi.com/${user?.country?.code}/flat/32.png`}
              />
            ),
            endAdornment: fromCurrency,
          }}
          sx={{
            img: { marginRight: "16px" },
            "& input[type=number]": {
              "-moz-appearance": "textfield",
            },
            "& input[type=number]::-webkit-outer-spin-button": {
              "-webkit-appearance": "none",
              margin: 0,
            },
            "& input[type=number]::-webkit-inner-spin-button": {
              "-webkit-appearance": "none",
              margin: 0,
            },
          }}
          placeholder={sendAmount ? "" : "0.00"}
          onChange={handleAmountChange}
        />
      </Box>

      <Box>
        <InputLabel>They receive</InputLabel>
        <TextField
          name="receiveAmount"
          value={receiveAmount?.toString() ?? ""}
          type="number"
          variant="outlined"
          fullWidth
          InputLabelProps={{ shrink: false }}
          InputProps={{
            startAdornment: (
              <img
                src={`https://flagsapi.com/${transferCountry?.code}/flat/32.png`}
              />
            ),
            endAdornment: toCurrency,
          }}
          sx={{
            img: { marginRight: "16px" },
            "& input[type=number]": {
              "-moz-appearance": "textfield",
            },
            "& input[type=number]::-webkit-outer-spin-button": {
              "-webkit-appearance": "none",
              margin: 0,
            },
            "& input[type=number]::-webkit-inner-spin-button": {
              "-webkit-appearance": "none",
              margin: 0,
            },
          }}
          placeholder={receiveAmount ? "" : "0.00"}
          onChange={handleAmountChange}
        />
      </Box>

      <Typography variant="h5" sx={{ marginBottom: "16px" }}>
        Delivery Speed
      </Typography>

      <TransferMethodCard
        label="Express"
        method="card"
        transferMethod={transferMethod}
        setTransferMethod={setTransferMethod}
        speedIcon={<BoltIcon />}
        speed="minutes"
        paymentIcon={<CreditCardIcon />}
        payment="debit/credit card"
        rate={0.97}
      />

      <TransferMethodCard
        label="Economy"
        method="bankAccount"
        transferMethod={transferMethod}
        setTransferMethod={setTransferMethod}
        speedIcon={<AccessTimeIcon />}
        speed="3-5 days"
        paymentIcon={<AccountBalanceIcon />}
        payment="bank account"
        rate={1}
      />

      <Button
        variant="contained"
        fullWidth
        sx={{ marginTop: "16px", borderRadius: "6px", height: "50px" }}
      >
        Continue
      </Button>
    </>
  ) : (
    <Typography variant="h5">
      Please select a country to transfer money to.
    </Typography>
  );
};

export default SelectAmountStep;
