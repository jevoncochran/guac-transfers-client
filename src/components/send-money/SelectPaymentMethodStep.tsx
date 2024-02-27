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
import { useTranslation } from "react-i18next";

const SelectPaymentMethodStep = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state: RootState) => state.auth.user);

  const [cards, setCards] = useState([]);

  const { t } = useTranslation();

  // TODO: Remove any value and correctly type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      <Typography variant="mainHeading">
        {t("sendMoney.selectPaymentMethod.mainHeading")}
      </Typography>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {cards.map((card: any) => (
        <OptionCard
          key={card.id}
          label={`•••• •••• •••• ${card.card.last4}`}
          sublabel={
            card.card.funding === "debit"
              ? t(
                  "sendMoney.selectPaymentMethod.options.savedCard.sublabel.debit"
                ).toUpperCase()
              : t(
                  "sendMoney.selectPaymentMethod.options.savedCard.sublabel.credit"
                ).toUpperCase()
          }
          value={card}
          handleClick={handleCardSelect}
          startAdornment={
            CARD_BRAND_IMG[card.card.brand as "visa" | "mastercard"]
          }
        />
      ))}
      <OptionCard
        label={t("sendMoney.selectPaymentMethod.options.newCard.label")}
        value={undefined}
        handleClick={() => dispatch(goToNextTransferStep())}
        startAdornment={addCardImg}
      />
    </div>
  );
};

export default SelectPaymentMethodStep;
