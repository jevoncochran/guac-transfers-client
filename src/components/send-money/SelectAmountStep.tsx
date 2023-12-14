import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import axios from "axios";
import debounce from "lodash.debounce";

const SelectAmountStep = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const [sendAmount, setSendAmount] = useState<number | null>(null);
  const [receiveAmount, setReceiveAmount] = useState<number | null>(null);

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
        debouncedConversion(newValue, "USD", "COP", false);
      } else {
        setReceiveAmount(0);
      }
    } else {
      setReceiveAmount(newValue);

      //   Do conversion
      if (newValue > 0) {
        debouncedConversion(newValue, "COP", "USD", true);
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

  return (
    <>
      <Box>
        <InputLabel>You send</InputLabel>
        <TextField
          name="sendAmount"
          value={sendAmount?.toString()}
          variant="outlined"
          fullWidth
          InputLabelProps={{ shrink: false }}
          InputProps={{
            startAdornment: (
              <img
                src={`https://flagsapi.com/${user?.country?.code}/flat/32.png`}
              />
            ),
            endAdornment: "USD",
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
          value={receiveAmount?.toString()}
          variant="outlined"
          fullWidth
          InputLabelProps={{ shrink: false }}
          InputProps={{
            startAdornment: (
              <img src={`https://flagsapi.com/${`CO`}/flat/32.png`} />
            ),
            endAdornment: "COP",
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
    </>
  );
};

export default SelectAmountStep;
