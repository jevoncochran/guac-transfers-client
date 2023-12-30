import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import axios from "axios";
import OptionCard from "./OptionCard";
import {
  goToNextTransferStep,
  setInstitution,
} from "../../redux/features/transfer/transferSlice";
import CashPickupSitesCard from "./CashPickupSitesCard";

const SelectInstitutionStep = () => {
  const dispatch = useAppDispatch();

  const deliveryMethod = useAppSelector(
    (state: RootState) => state.transfer.deliveryMethod
  );
  const transferCountry = useAppSelector(
    (state: RootState) => state.transfer.country
  );

  const [banks, setBanks] = useState([]);
  const [cashPickupSites, setCashPickupSites] = useState([]);

  const onSelect = (value: unknown) => {
    dispatch(setInstitution(value));
    dispatch(goToNextTransferStep());
  };

  useEffect(() => {
    if (deliveryMethod === "bankDeposit") {
      axios
        .get(
          `${import.meta.env.VITE_API_URL}/banks?country=${
            transferCountry?.code
          }`
        )
        .then((res) => {
          console.log(res.data);
          setBanks(res.data);
        });
    } else {
      axios
        .get(
          `${import.meta.env.VITE_API_URL}/cash-pickup-sites?country=${
            transferCountry?.code
          }`
        )
        .then((res) => {
          console.log(res.data);
          setCashPickupSites(res.data);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliveryMethod]);

  return (
    <div>
      <Typography variant="transferStepHeading">
        {deliveryMethod === "bankDeposit" ? "Bank Deposit" : "Cash Pickup"}
      </Typography>
      <Typography variant="subtitle1">
        {deliveryMethod === "bankDeposit"
          ? "Select your recipient's bank"
          : "Select a cash pickup option"}
      </Typography>
      {deliveryMethod === "bankDeposit" ? (
        <>
          {banks?.map((bank) => (
            <OptionCard
              key={bank.id}
              label={bank.name}
              value={bank}
              handleClick={onSelect}
            />
          ))}
        </>
      ) : (
        <>
          <Typography>Banks</Typography>
          {cashPickupSites?.banks?.map((bank) => (
            <OptionCard
              key={bank.id}
              label={bank.name}
              value={bank}
              handleClick={onSelect}
            />
          ))}

          <Typography>Other Locations</Typography>
          <CashPickupSitesCard sites={cashPickupSites?.otherSites} />
        </>
      )}
    </div>
  );
};

export default SelectInstitutionStep;
