import MuiMenu from "@mui/material/Menu";
import MuiMenuItem from "@mui/material/MenuItem";
import { MenuItem } from "../types";

interface Props {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleClose: () => void;
  handleSelect: () => void;
  menuItems: MenuItem[];
}

const Menu = ({
  anchorEl,
  open,
  handleClick,
  handleClose,
  handleSelect,
  menuItems,
}: Props) => {
  return (
    <MuiMenu
      anchorEl={anchorEl}
      //   id="account-menu"
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
      {menuItems.map((mi) => (
        <MuiMenuItem
          onClick={
            mi.onSelect
              ? () => {
                  mi.onSelect();
                  handleClose();
                }
              : handleSelect
          }
        >
          {mi.item}
        </MuiMenuItem>
      ))}
    </MuiMenu>
  );
};

export default Menu;
