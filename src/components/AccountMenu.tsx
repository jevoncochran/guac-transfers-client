import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Settings from "@mui/icons-material/Settings";
import RedeemIcon from "@mui/icons-material/Redeem";
import HelpIcon from "@mui/icons-material/Help";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

interface Props {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleClose: () => void;
}

const AccountMenu = ({ anchorEl, open, handleClick, handleClose }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onLogoutClick = () => {
    dispatch(logout());
    handleClose();
    navigate("/");
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
      <MenuItem onClick={handleClose}>
        <Settings fontSize="small" sx={{ marginRight: "6px" }} />
        Settings
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <RedeemIcon fontSize="small" sx={{ marginRight: "6px" }} />
        Redeem Offer
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <HelpIcon fontSize="small" sx={{ marginRight: "6px" }} />
        Help
      </MenuItem>
      <MenuItem onClick={onLogoutClick}>
        <LogoutIcon fontSize="small" sx={{ marginRight: "6px" }} />
        Logout
      </MenuItem>
    </Menu>
  );
};

export default AccountMenu;
