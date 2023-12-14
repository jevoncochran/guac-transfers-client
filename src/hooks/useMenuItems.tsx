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

export const useMenuItems = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state: RootState) => state.auth.user);
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.auth.isLoggedIn
  );

  const accountMenuItems = [
    {
      item: (
        <>
          <Settings fontSize="small" sx={{ marginRight: "6px" }} />
          Settings
        </>
      ),
    },
    {
      item: (
        <>
          <RedeemIcon fontSize="small" sx={{ marginRight: "6px" }} />
          Redeem Offer
        </>
      ),
    },
    {
      item: (
        <>
          <HelpIcon fontSize="small" sx={{ marginRight: "6px" }} />
          Help
        </>
      ),
    },
    {
      item: (
        <>
          <LogoutIcon fontSize="small" sx={{ marginRight: "6px" }} />
          Logout
        </>
      ),
      onSelect: () => {
        dispatch(logout());
        // handleClose();
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
    },
  }));

  const userCountryMenuitems = USER_COUNTRIES.map((country) => ({
    item: country.name,
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
