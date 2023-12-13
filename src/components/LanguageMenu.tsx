import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { LANGUAGES } from "../constants";
import { useAppDispatch } from "../redux/hooks";
import { updateLanguage } from "../redux/features/auth/authSlice";
import { Language } from "../types";

interface Props {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleClose: () => void;
}

const LanguageMenu = ({ anchorEl, open, handleClick, handleClose }: Props) => {
  const dispatch = useAppDispatch();

  const handleLangSelect = (language: Language) => {
    dispatch(updateLanguage(language));
    handleClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClick}
      PaperProps={{
        variant: "menu",
        elevation: 0,
        sx: {
          width: "200px",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: "8px",
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {LANGUAGES.map((language) => (
        <MenuItem onClick={() => handleLangSelect(language)}>
          {language.name}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default LanguageMenu;
