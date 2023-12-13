import { useState } from "react";
import Navbar from "../components/Navbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SITE_PADDING_X } from "../constants";
import { useTheme } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import TransferCountryMenu from "../components/TransferCountryMenu";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";

const SendMoney = () => {
  const theme = useTheme();

  const transferCountry = useAppSelector(
    (state: RootState) => state.transfer.country
  );

  const [transferCountryMenuAnchorEl, setTransferCountryMenuAnchorEl] =
    useState<null | HTMLElement>(null);

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
    <>
      <Navbar />
      <Box>
        <Box
          display="flex"
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ height: "60px", width: "100%", backgroundColor: "#609000" }}
        >
          <Typography color="#fff" marginRight={"8px"}>
            Send money to
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
            <img
              src={`https://flagsapi.com/${
                transferCountry?.code ?? "CO"
              }/flat/32.png`}
              style={{ marginRight: "8px" }}
            />
            <Typography color={theme.palette.secondary.contrastText}>
              {transferCountry?.name ?? "Colombia"}
            </Typography>
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
        <Box sx={{ paddingX: SITE_PADDING_X, paddingTop: "32px" }}>
          <Box
            sx={{
              width: "100%",
              height: "600px",
              border: `1px solid ${theme.palette.secondary.light}`,
              borderRadius: "6px",
            }}
          >
            <Box sx={{ paddingX: "280px", paddingY: "24px" }}>
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ marginBottom: "24px" }}
              >
                Select a recipient to send money to:
              </Typography>
              <Box
                sx={{
                  height: "60px",
                  border: "1px solid black",
                  borderRadius: "6px",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  paddingX: "16px",
                }}
              >
                <Box display={"flex"}>
                  <PersonAddIcon
                    sx={{
                      marginRight: "8px",
                      color: theme.palette.primary.light,
                    }}
                    fontSize="medium"
                  />
                  <Typography>New Recipient</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  height: "60px",
                  border: "1px solid black",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  paddingX: "16px",
                }}
              >
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  sx={{ width: "100%" }}
                >
                  <Typography>Jair Asprilla</Typography>
                  <NavigateNextIcon />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SendMoney;
