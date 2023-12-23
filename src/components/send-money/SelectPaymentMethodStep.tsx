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

const SelectPaymentMethodStep = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state: RootState) => state.auth.user);

  const [cards, setCards] = useState([]);

  const handleCardSelect = (value: string) => {
    dispatch(setPaymentMethod({ type: "card", stripeId: value }));
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
      <Typography variant="transferStepHeading">Payment Method</Typography>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {cards.map((card: any) => (
        <OptionCard
          label={`•••• •••• •••• ${card.card.last4}`}
          sublabel={`${card.card.funding} card`.toUpperCase()}
          value={card.id}
          handleClick={handleCardSelect}
        />
      ))}
      <OptionCard
        label="Add New Card"
        value={undefined}
        handleClick={() => dispatch(goToNextTransferStep())}
      />
    </div>
  );
};

export default SelectPaymentMethodStep;
