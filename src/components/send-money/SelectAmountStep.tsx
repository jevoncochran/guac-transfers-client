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
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import axios from "axios";
import debounce from "lodash.debounce";
import { THIRD_PARTY_CHARGES, CURRENCIES } from "../../constants";
import TransferMethodCard from "./TransferMethodCard";
import { calculateConversion } from "../../utils/calculateConversion";
import { goToNextTransferStep } from "../../redux/features/transfer/transferSlice";

export type TransferMethod = "card" | "bankAccount";

const SelectAmountStep = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state: RootState) => state.auth.user);
  const transferCountry = useAppSelector(
    (state: RootState) => state.transfer.country
  );

  const [sendAmount, setSendAmount] = useState<number | null>(null);
  const [receiveAmount, setReceiveAmount] = useState<number | null>(null);
  const [transferMethod, setTransferMethod] = useState<TransferMethod>("card");
  const [rate, setRate] = useState(0);

  const userCurrency = CURRENCIES[user?.country?.code]?.code;
  const transferCurrency = CURRENCIES[transferCountry?.code]?.code;

  const handleAmountChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // If there is no value in the input, set the send and receive amounts to null
    if (!e.target.value) {
      setSendAmount(null);
      setReceiveAmount(null);

      debouncedConversion(undefined, false);
    }

    const newValue = Number(e.target.value);

    // When send input value gets updated
    if (e.target.name === "sendAmount") {
      setSendAmount(newValue);

      // Perform conversion when user finishes typing
      if (newValue > 0) {
        debouncedConversion(newValue, false);
      } else {
        setReceiveAmount(0);
      }
      // When receive input value gets updated
    } else {
      setReceiveAmount(newValue);

      //   Perfom conversion when user finishes typing
      if (newValue > 0) {
        debouncedConversion(newValue, true);
      } else {
        setSendAmount(0);
      }
    }
  };

  const debouncedConversion = useMemo(
    () =>
      debounce((amount, reversed) => {
        if (!amount) return;

        if (!reversed) {
          // Convert from send amount to receive amount
          const conversionMinusCharges = calculateConversion(
            amount,
            rate,
            THIRD_PARTY_CHARGES[transferMethod]
          );
          setReceiveAmount(conversionMinusCharges);
        } else {
          // Convert from receive amount to send amount
          const transferAmountPlusCharges = calculateConversion(
            amount,
            rate,
            THIRD_PARTY_CHARGES[transferMethod],
            true
          );
          setSendAmount(transferAmountPlusCharges);
        }
      }, 500),
    [transferMethod, rate]
  );

  // On initial render and when user changes user country or transfer country, we must:
  useEffect(() => {
    // 1) Get the exchange rate
    axios
      .get(
        `${
          import.meta.env.VITE_API_URL
        }/convert?from=${userCurrency}&to=${transferCurrency}&amount=${1}`
      )
      .then((res) => {
        console.log(res.data);
        setRate(res.data.result);
      });

    // 2) Reset send and receive input values
    setSendAmount(null);
    setReceiveAmount(null);
  }, [userCurrency, transferCurrency]);

  // When user changes transfer method, we must update receive input value
  useEffect(() => {
    if (sendAmount) {
      const conversionMinusCharges = calculateConversion(
        sendAmount,
        rate,
        THIRD_PARTY_CHARGES[transferMethod]
      );
      setReceiveAmount(conversionMinusCharges);
    }
  }, [transferMethod]);

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
            endAdornment: userCurrency,
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
            endAdornment: transferCurrency,
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
        charge={THIRD_PARTY_CHARGES.card}
        rate={rate}
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
        charge={THIRD_PARTY_CHARGES.bankAccount}
        rate={rate}
      />

      <Button
        variant="contained"
        fullWidth
        sx={{ marginTop: "16px", borderRadius: "6px", height: "50px" }}
        onClick={() => dispatch(goToNextTransferStep())}
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
