import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import TransferCountryMenu from "../components/TransferCountryMenu";
import { useTheme } from "@mui/material";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const Divider = () => {
  const theme = useTheme();

  const transferCountry = useAppSelector(
    (state: RootState) => state.transfer.country
  );

  const [transferCountryMenuAnchorEl, setTransferCountryMenuAnchorEl] =
    useState<null | HTMLElement>(null);

  const { t } = useTranslation();

  const isTransferCountryMenuOpen = Boolean(transferCountryMenuAnchorEl);

  const handleTransferCountryMenuClick = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    if (!transferCountryMenuAnchorEl) {
      setTransferCountryMenuAnchorEl(event.currentTarget);
    }
  };

  const handleTransferCountryMenuClose = () => {
    setTransferCountryMenuAnchorEl(null);
  };

  return (
    <Box
      display="flex"
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ height: "60px", width: "100%", backgroundColor: "#609000" }}
    >
      <Typography color="#fff" marginRight={"8px"}>
        {t("divider.send")}
      </Typography>
      <Box
        display={"flex"}
        alignItems={"center"}
        sx={{
          border: "1px solid white",
          borderRadius: "6px",
          padding: "6px",
        }}
        onClick={handleTransferCountryMenuClick}
      >
        {transferCountry ? (
          <>
            <img
              src={`https://flagsapi.com/${transferCountry?.code}/flat/32.png`}
              style={{ marginRight: "8px" }}
            />
            <Typography color={theme.palette.secondary.contrastText}>
              {transferCountry?.name[i18n.language]}
            </Typography>
          </>
        ) : (
          <Typography
            color={theme.palette.secondary.contrastText}
            fontSize="14px"
          >
            {t("divider.select")}
          </Typography>
        )}
        <ExpandMoreOutlinedIcon
          sx={{ color: theme.palette.secondary.contrastText }}
        />
      </Box>
      {/* Transfer Country Menu */}
      <TransferCountryMenu
        anchorEl={transferCountryMenuAnchorEl}
        open={isTransferCountryMenuOpen}
        handleClick={handleTransferCountryMenuClick}
        handleClose={handleTransferCountryMenuClose}
      />
    </Box>
  );
};

export default Divider;
