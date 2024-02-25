import { useMemo, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
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
import {
  goToNextTransferStep,
  clearTransferAmount,
  setTransferAmount,
  setSendAmount,
  setReceiveAmount,
  setTransferStep,
} from "../../redux/features/transfer/transferSlice";
import ContinueButton from "./ContinueButton";
import { TransferStep } from "../../types";
import { useTranslation } from "react-i18next";
import useFormatAmount from "../../hooks/useFormatAmout";

export type TransferMethod = "card" | "bankAccount";

type AmountInput = "sendAmount" | "receiveAmount";

const SelectAmountStep = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state: RootState) => state.auth.user);
  const transfer = useAppSelector((state: RootState) => state.transfer);

  const [rate, setRate] = useState(0);
  const [manuallyChangedInput, setManuallyChangedInput] = useState<
    "sendAmount" | "receiveAmount" | null
  >(null);

  const { t } = useTranslation();

  const { formatAmount } = useFormatAmount();

  const userCurrency = CURRENCIES[user?.country?.code as string].code;
  const transferCurrency = CURRENCIES[transfer.country?.code as string].code;

  const handleAmountChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setManuallyChangedInput(e.target.name as AmountInput);
    // If there is no value in the input, set the send and receive amounts to null
    if (!e.target.value) {
      dispatch(clearTransferAmount());

      debouncedConversion(undefined, false);
    }

    // Any commas present must be removed from input values before converting to number
    // Otherwise, newValue could become NAN
    const removeCommas = e.target.value.replace(/,/g, "");
    const newValue = Number(removeCommas);

    // When send input value gets updated
    if (e.target.name === "sendAmount") {
      dispatch(setSendAmount(newValue));

      // Perform conversion when user finishes typing
      if (newValue > 0) {
        debouncedConversion(newValue, false);
      } else {
        dispatch(clearTransferAmount());
      }
      // When receive input value gets updated
    } else {
      dispatch(setReceiveAmount(newValue));

      //   Perfom conversion when user finishes typing
      if (newValue > 0) {
        debouncedConversion(newValue, true);
      } else {
        dispatch(clearTransferAmount());
      }
    }
  };

  const debouncedConversion = useMemo(
    () =>
      debounce((amount, reversed) => {
        if (!amount) return;

        if (!reversed) {
          // Convert from send amount to receive amount
          const conversion = calculateConversion(
            amount,
            rate,
            THIRD_PARTY_CHARGES[transfer.transferMethod],
            0
          );
          dispatch(
            setTransferAmount({
              sendAmount: conversion.sendAmount,
              receiveAmount: conversion.receiveAmount,
              thirdPartyCharge: conversion.thirdPartyCharge,
            })
          );
        } else {
          // Convert from receive amount to send amount
          const reverseConversion = calculateConversion(
            amount,
            rate,
            THIRD_PARTY_CHARGES[transfer.transferMethod],
            0,
            true
          );
          dispatch(
            setTransferAmount({
              sendAmount: reverseConversion.sendAmount,
              receiveAmount: reverseConversion.receiveAmount,
              thirdPartyCharge: reverseConversion.thirdPartyCharge,
            })
          );
        }
      }, 500),
    [dispatch, transfer.transferMethod, rate]
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
        const resultTwoDecimals =
          Math.round((res.data.result + Number.EPSILON) * 100) / 100;
        setRate(resultTwoDecimals);
      });

    // 2) Reset send and receive input values
    dispatch(clearTransferAmount());
  }, [dispatch, userCurrency, transferCurrency]);

  // When user changes transfer method, we must update receive input value
  useEffect(() => {
    if (transfer.sendAmount) {
      const conversion = calculateConversion(
        transfer.sendAmount,
        rate,
        THIRD_PARTY_CHARGES[transfer.transferMethod],
        0
      );
      dispatch(
        setTransferAmount({
          sendAmount: conversion.sendAmount,
          receiveAmount: conversion.receiveAmount,
          thirdPartyCharge: conversion.thirdPartyCharge,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, rate, transfer.transferMethod]);

  return transfer.country ? (
    <>
      <Box sx={{ marginBottom: "16px" }}>
        <InputLabel>{t("sendMoney.selectAmount.send")}</InputLabel>
        <TextField
          name="sendAmount"
          value={
            manuallyChangedInput === "sendAmount"
              ? transfer.sendAmount ?? ""
              : formatAmount(transfer.sendAmount)
          }
          type={manuallyChangedInput === "sendAmount" ? "number" : "text"}
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
          placeholder={transfer.sendAmount ? "" : "0.00"}
          onChange={handleAmountChange}
        />
      </Box>

      <Box sx={{ marginBottom: "16px" }}>
        <InputLabel>{t("sendMoney.selectAmount.receive")}</InputLabel>
        <TextField
          name="receiveAmount"
          value={
            manuallyChangedInput === "receiveAmount"
              ? transfer.receiveAmount ?? ""
              : formatAmount(transfer.receiveAmount)
          }
          type={manuallyChangedInput === "receiveAmount" ? "number" : "text"}
          variant="outlined"
          fullWidth
          InputLabelProps={{ shrink: false }}
          InputProps={{
            startAdornment: (
              <img
                src={`https://flagsapi.com/${transfer.country?.code}/flat/32.png`}
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
          placeholder={transfer.receiveAmount ? "" : "0.00"}
          onChange={handleAmountChange}
        />
      </Box>

      <Typography variant="mainHeading">
        {t("sendMoney.selectAmount.mainHeading")}
      </Typography>

      <TransferMethodCard
        label={t("sendMoney.selectAmount.transferMethod.card.label")}
        method="card"
        speedIcon={<BoltIcon />}
        speed={t("sendMoney.selectAmount.transferMethod.card.time.substring2")}
        paymentIcon={<CreditCardIcon />}
        payment={t(
          "sendMoney.selectAmount.transferMethod.card.method.substring2"
        )}
        charge={THIRD_PARTY_CHARGES.card}
        rate={rate}
      />

      <TransferMethodCard
        label={t("sendMoney.selectAmount.transferMethod.bankAccount.label")}
        method="bankAccount"
        speedIcon={<AccessTimeIcon />}
        speed={t(
          "sendMoney.selectAmount.transferMethod.bankAccount.time.substring2"
        )}
        paymentIcon={<AccountBalanceIcon />}
        payment={t(
          "sendMoney.selectAmount.transferMethod.bankAccount.method.substring2"
        )}
        charge={THIRD_PARTY_CHARGES.bankAccount}
        rate={rate}
      />

      <ContinueButton
        continueAction={
          transfer.recipient?.id
            ? () => dispatch(setTransferStep(TransferStep.SelectPaymentMethod))
            : () => dispatch(goToNextTransferStep())
        }
      />
    </>
  ) : (
    <Typography variant="h5">
      {t("sendMoney.selectAmount.selectCountry")}
    </Typography>
  );
};

export default SelectAmountStep;
