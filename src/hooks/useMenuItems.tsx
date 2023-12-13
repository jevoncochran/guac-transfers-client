import Settings from "@mui/icons-material/Settings";
import RedeemIcon from "@mui/icons-material/Redeem";
import HelpIcon from "@mui/icons-material/Help";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppDispatch } from "../redux/hooks";
import { logout, updateLanguage } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { LANGUAGES, USER_COUNTRIES } from "../constants";

export const useMenuItems = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
    onSelect: () => dispatch(updateLanguage(language)),
  }));

  const userCountryMenuitems = USER_COUNTRIES.map((country) => ({
    item: country.name,
  }));

  return {
    account: accountMenuItems,
    langugage: languageMenuItems,
    userCountry: userCountryMenuitems
  };
};
