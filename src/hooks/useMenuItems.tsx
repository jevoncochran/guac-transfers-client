import Settings from "@mui/icons-material/Settings";
import RedeemIcon from "@mui/icons-material/Redeem";
import HelpIcon from "@mui/icons-material/Help";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  logout,
  updateCountry,
  updateLanguage,
} from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { LANGUAGES, USER_COUNTRIES } from "../constants";
import { RootState } from "../redux/store";
import axios from "axios";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";
import { setTransferStep } from "../redux/features/transfer/transferSlice";
import { TransferStep } from "../types";

export const useMenuItems = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state: RootState) => state.auth.user);
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.auth.isLoggedIn
  );

  const { t } = useTranslation();

  const accountMenuItems = [
    {
      item: (
        <>
          <Settings fontSize="small" sx={{ marginRight: "6px" }} />
          {t("navBar.accountMenu.settings")}
        </>
      ),
    },
    {
      item: (
        <>
          <RedeemIcon fontSize="small" sx={{ marginRight: "6px" }} />
          {t("navBar.accountMenu.redeem")}
        </>
      ),
    },
    {
      item: (
        <>
          <HelpIcon fontSize="small" sx={{ marginRight: "6px" }} />
          {t("navBar.accountMenu.help")}
        </>
      ),
    },
    {
      item: (
        <>
          <LogoutIcon fontSize="small" sx={{ marginRight: "6px" }} />
          {t("navBar.accountMenu.logout")}
        </>
      ),
      onSelect: () => {
        dispatch(logout());
        dispatch(setTransferStep(TransferStep.SelectRecipient));
        navigate("/");
      },
    },
  ];

  const languageMenuItems = LANGUAGES.map((language) => ({
    item: language.name,
    onSelect: () => {
      if (user && isLoggedIn) {
        // Update language in database (only send language code)
        axios.patch(`${import.meta.env.VITE_API_URL}/users/${user.id}`, {
          language: language.code,
        });
      }
      // Update language in local storage
      localStorage.setItem("language", JSON.stringify(language));
      // Update language in Redux store
      dispatch(updateLanguage(language));
      // Update i18n language
      i18n.changeLanguage(language.code);
    },
  }));

  const userCountryMenuitems = USER_COUNTRIES.map((country) => ({
    item: country.name[i18n.language],
    onSelect: () => {
      if (user && isLoggedIn) {
        // Update country in database (only send country code)
        axios.patch(`${import.meta.env.VITE_API_URL}/users/${user.id}`, {
          country: country.code,
        });
      }
      // Update country in local storage
      localStorage.setItem("country", JSON.stringify(country));
      // Update country in Redux store
      dispatch(updateCountry(country));
    },
  }));

  return {
    account: accountMenuItems,
    langugage: languageMenuItems,
    userCountry: userCountryMenuitems,
  };
};
