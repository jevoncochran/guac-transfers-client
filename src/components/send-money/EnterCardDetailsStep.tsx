import { FormEvent, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import "../../App.css";
import InputGroup from "../InputGroup";
import ContinueButton from "./ContinueButton";
import { StripeCardNumberElement } from "@stripe/stripe-js";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import {
  goToNextTransferStep,
  setPaymentMethod,
} from "../../redux/features/transfer/transferSlice";
import { useTranslation } from "react-i18next";

const EnterCardDetailsStep = () => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector((state: RootState) => state.auth.user?.id);

  const stripe = useStripe();
  const elements = useElements();

  const [customerName, setCustomerName] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const { t } = useTranslation();

  const generateStripeToken = async () => {
    if (!stripe || !elements) {
      console.log("stripe / elements not set");
      return;
    }

    const cardNumElement = elements.getElement(CardNumberElement);

    const { token, error } = await stripe.createToken(
      cardNumElement as StripeCardNumberElement,
      {
        name: customerName,
        address_zip: postalCode,
      }
    );

    if (!token || error) {
      console.log(error || "Token is not set");
      throw error;
    }

    return token;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const token = await generateStripeToken();
      alert(token?.id);
      axios
        .post(`${import.meta.env.VITE_API_URL}/users/${userId}/addCard`, {
          tokenId: token?.id,
        })
        .then((res) => {
          const { data } = res.data;
          console.log(res.data);
          if (res.data.success) {
            dispatch(
              setPaymentMethod({
                type: "card",
                method: {
                  stripeId: data.id,
                  type: data.funding,
                  brand: data.brand,
                  last4: data.last4,
                },
              })
            );
            dispatch(goToNextTransferStep());
          }
        });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div>
      <Typography variant="mainHeading">
        {t("sendMoney.enterCardDetails.label")}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ marginBottom: "16px" }}>
          <InputLabel>
            {t("sendMoney.enterCardDetails.inputs.cardNumber.label")}
          </InputLabel>
          <CardNumberElement id="card-number" className="card-input" />
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          width="full"
          sx={{ marginBottom: "16px" }} //   border="1px dashed black"
        >
          <Box width="48%">
            <InputLabel>
              {t("sendMoney.enterCardDetails.inputs.cardExpiration.label")}
            </InputLabel>
            <CardExpiryElement
              id="card-exp"
              className="card-input card-input-small"
            />
          </Box>

          <Box width="48%">
            <InputLabel>
              {t("sendMoney.enterCardDetails.inputs.cvc.label")}
            </InputLabel>
            <CardCvcElement
              id="card-cvc"
              className="card-input card-input-small"
            />
          </Box>
        </Box>

        <InputGroup
          inputName="postalCode"
          label={t("sendMoney.enterCardDetails.inputs.zip.label")}
          value={postalCode}
          placeholder={t("sendMoney.enterCardDetails.inputs.zip.placeholder")}
          onChange={(e) => setPostalCode(e.target.value)}
        />

        <InputGroup
          inputName="customerName"
          label={t("sendMoney.enterCardDetails.inputs.name.label")}
          value={customerName}
          placeholder={t("sendMoney.enterCardDetails.inputs.name.placeholder")}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <ContinueButton submitBtn />
      </form>
    </div>
  );
};

export default EnterCardDetailsStep;
