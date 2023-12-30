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
import { goToNextTransferStep } from "../../redux/features/transfer/transferSlice";

const EnterCardDetailsStep = () => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector((state: RootState) => state.auth.user?.id);

  const stripe = useStripe();
  const elements = useElements();

  const [customerName, setCustomerName] = useState("");
  const [postalCode, setPostalCode] = useState("");

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
          console.log(res.data);
          if (res.data.success) {
            dispatch(goToNextTransferStep());
          }
        });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div>
      <Typography variant="mainHeading">Add New Card</Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ marginBottom: "16px" }}>
          <InputLabel>Card Number</InputLabel>
          <CardNumberElement id="card-number" className="card-input" />
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          width="full"
          sx={{ marginBottom: "16px" }} //   border="1px dashed black"
        >
          <Box width="48%">
            <InputLabel>Expiration Date</InputLabel>
            <CardExpiryElement
              id="card-exp"
              className="card-input card-input-small"
            />
          </Box>

          <Box width="48%">
            <InputLabel>Security Code</InputLabel>
            <CardCvcElement
              id="card-cvc"
              className="card-input card-input-small"
            />
          </Box>
        </Box>

        <InputGroup
          inputName="postalCode"
          label="Postal Code"
          value={postalCode}
          placeholder="Please enter your postal code"
          onChange={(e) => setPostalCode(e.target.value)}
        />

        <InputGroup
          inputName="customerName"
          label="Your Name (as it appears on card)"
          value={customerName}
          placeholder="Please enter your name as it appears on card"
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <ContinueButton submitBtn />
      </form>
    </div>
  );
};

export default EnterCardDetailsStep;
