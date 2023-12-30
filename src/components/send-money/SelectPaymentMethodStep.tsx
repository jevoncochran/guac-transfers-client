import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import OptionCard from "./OptionCard";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  goToNextTransferStep,
  setPaymentMethod,
  setTransferStep,
} from "../../redux/features/transfer/transferSlice";
import axios from "axios";
import { RootState } from "../../redux/store";
import { TransferStep } from "../../types";
import { CARD_BRAND_IMG } from "../../constants";
import addCardImg from "../../assets/add_card.svg";

const SelectPaymentMethodStep = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state: RootState) => state.auth.user);

  const [cards, setCards] = useState([]);

  const handleCardSelect = (value: any) => {
    dispatch(
      setPaymentMethod({
        type: "card",
        method: {
          stripeId: value.id,
          type: value.card.funding,
          brand: value.card.brand,
          last4: value.card.last4,
        },
      })
    );
    dispatch(setTransferStep(TransferStep.ConfirmTransfer));
  };

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/users/${
          user?.id
        }/cards?stripeCustomerId=${user?.stripeCustomerId}`
      )
      .then((res) => {
        console.log(res.data);
        setCards(res.data.data);
      });
  }, []);

  return (
    <div>
      <Typography variant="mainHeading">Payment Method</Typography>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {cards.map((card: any) => (
        <OptionCard
          label={`•••• •••• •••• ${card.card.last4}`}
          sublabel={`${card.card.funding} card`.toUpperCase()}
          value={card}
          handleClick={handleCardSelect}
          startAdornment={
            CARD_BRAND_IMG[card.card.brand as "visa" | "mastercard"]
          }
        />
      ))}
      <OptionCard
        label="Add New Card"
        value={undefined}
        handleClick={() => dispatch(goToNextTransferStep())}
        startAdornment={addCardImg}
      />
    </div>
  );
};

export default SelectPaymentMethodStep;
