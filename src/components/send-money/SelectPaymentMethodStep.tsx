import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import OptionCard from "./OptionCard";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { goToNextTransferStep } from "../../redux/features/transfer/transferSlice";
import axios from "axios";
import { RootState } from "../../redux/store";

const SelectPaymentMethodStep = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state: RootState) => state.auth.user);

  const [cards, setCards] = useState([]);

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
      {cards.map((card) => (
        <OptionCard label={`•••• •••• •••• ${card.card.last4}`} />
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
