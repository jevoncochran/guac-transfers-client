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
import { useTranslation } from "react-i18next";
import { CashPickupSites, Institution } from "../../types";

const SelectInstitutionStep = () => {
  const dispatch = useAppDispatch();

  const deliveryMethod = useAppSelector(
    (state: RootState) => state.transfer.deliveryMethod
  );
  const transferCountry = useAppSelector(
    (state: RootState) => state.transfer.country
  );

  const [banks, setBanks] = useState<Institution[]>([]);
  const [cashPickupSites, setCashPickupSites] =
    useState<CashPickupSites | null>(null);

  const { t } = useTranslation();

  const onSelect = (value: unknown) => {
    dispatch(setInstitution(value));
    dispatch(goToNextTransferStep());
  };

  useEffect(() => {
    if (deliveryMethod === "bankDeposit") {
      axios
        .get(
          `${process.env.VITE_API_URL}/banks?country=${transferCountry?.code}`
        )
        .then((res) => {
          console.log(res.data);
          setBanks(res.data);
        });
    } else {
      axios
        .get(
          `${process.env.VITE_API_URL}/cash-pickup-sites?country=${transferCountry?.code}`
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
      <Typography variant="mainHeading">
        {deliveryMethod === "bankDeposit"
          ? t("sendMoney.selectInstitution.bank.mainHeading")
          : t("sendMoney.selectInstitution.cash.mainHeading")}
      </Typography>
      <Typography variant="subtitle1">
        {deliveryMethod === "bankDeposit"
          ? t("sendMoney.selectInstitution.bank.subtitle")
          : t("sendMoney.selectInstitution.cash.subtitle")}
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
          <Typography>
            {t("sendMoney.selectInstitution.cash.options.banks")}
          </Typography>
          {cashPickupSites?.banks?.map((bank) => (
            <OptionCard
              key={bank.id}
              label={bank.name}
              value={bank}
              handleClick={onSelect}
            />
          ))}

          <Typography>
            {" "}
            {t("sendMoney.selectInstitution.cash.options.other")}
          </Typography>
          {cashPickupSites && (
            <CashPickupSitesCard sites={cashPickupSites?.otherSites} />
          )}
        </>
      )}
    </div>
  );
};

export default SelectInstitutionStep;
