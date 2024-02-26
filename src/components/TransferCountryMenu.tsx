import MuiMenu from "@mui/material/Menu";
import MuiMenuItem from "@mui/material/MenuItem";
import { TRANSFER_COUNTRIES } from "../constants";
import { useAppDispatch } from "../redux/hooks";
import { setTransferCountry } from "../redux/features/transfer/transferSlice";
import i18n from "../i18n";

interface Props {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleClose: () => void;
}

const TransferCountryMenu = ({
  anchorEl,
  open,
  handleClick,
  handleClose,
}: Props) => {
  const dispatch = useAppDispatch();

  return (
    <MuiMenu
      anchorEl={anchorEl}
      id="transfer-country-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClick}
      PaperProps={{
        variant: "menu",
        elevation: 0,
        sx: {
          width: "1000px",
          height: "500px",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: "8px",
        },
      }}
      transformOrigin={{ horizontal: "center", vertical: "top" }}
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      sx={{
        "& .css-6hp17o-MuiList-root-MuiMenu-list": {
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
        },

        "& css-r8u8y9": {
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
        },
      }}
    >
      {TRANSFER_COUNTRIES.map((country) => (
        <MuiMenuItem
          key={country.code}
          onClick={() => {
            dispatch(setTransferCountry(country));
            handleClose();
          }}
        >
          <img
            src={`https://flagsapi.com/${country.code}/flat/32.png`}
            style={{ marginRight: "8px" }}
          />
          {country.name[i18n.language]}
        </MuiMenuItem>
      ))}
    </MuiMenu>
  );
};

export default TransferCountryMenu;
