import { useRef } from "react";
import Dialog from "@mui/material/Dialog";
import MuiMenu from "@mui/material/Menu";
import MuiMenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { PHONE_PREFIXES, TRANSFER_COUNTRIES } from "../../constants";
import { Typography } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { closePhoneModal } from "../../redux/features/ui/uiSlice";
import { setUserPhoneNum } from "../../redux/features/auth/authSlice";
import { Country } from "../../types";
import { setRecipientPhoneNum } from "../../redux/features/transfer/transferSlice";

interface Props {
  type: "recipient" | "sender";
}

const PhonePrefixMenu = ({ type }: Props) => {
  const dispatch = useAppDispatch();

  const anchorEl = useRef(null);

  const user = useAppSelector((state: RootState) => state.auth.user);
  const recipient = useAppSelector(
    (state: RootState) => state.transfer.recipient
  );
  const phoneDialog = useAppSelector(
    (state: RootState) => state.ui.phoneDialog
  );

  const handleSelect = (
    phoneOwner: "recipient" | "sender",
    phoneCountry: Country,
    phoneBody: string | undefined
  ) => {
    if (phoneOwner === "recipient") {
      dispatch(
        setRecipientPhoneNum({
          iso: phoneCountry.code,
          prefix: `${PHONE_PREFIXES[phoneCountry.code]}`,
          body: phoneBody,
        })
      );
    } else {
      dispatch(
        setUserPhoneNum({
          iso: phoneCountry.code,
          prefix: `${PHONE_PREFIXES[phoneCountry.code]}`,
          body: phoneBody,
        })
      );
    }

    dispatch(closePhoneModal());
  };

  return (
    <Dialog open={phoneDialog.isOpen} ref={anchorEl}>
      <MuiMenu
        id="phone-prefix-menu"
        open={true}
        slotProps={{
          paper: {
            sx: {
              width: "500px",
              height: "500px",
              padding: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "center", vertical: "center" }}
        anchorOrigin={{ horizontal: "center", vertical: "center" }}
      >
        <Box
          display="flex"
          justifyContent="flex-end"
          sx={{ width: "full", height: "20px" }}
        >
          <CloseIcon
            onClick={() => dispatch(closePhoneModal())}
            sx={{ cursor: "pointer" }}
          />
        </Box>
        {TRANSFER_COUNTRIES.map((country) => (
          <MuiMenuItem
            key={country.code}
            onClick={
              type === "recipient"
                ? () => handleSelect(type, country, recipient?.phone?.body)
                : () => handleSelect(type, country, user?.phone?.body)
            }
          >
            <Box display="flex" alignItems="center">
              <Typography sx={{ marginRight: "8px", fontWeight: "bold" }}>
                {country.name}
              </Typography>
              <Typography>{`(+${PHONE_PREFIXES[country.code]})`}</Typography>
            </Box>
          </MuiMenuItem>
        ))}
      </MuiMenu>
    </Dialog>
  );
};

export default PhonePrefixMenu;
