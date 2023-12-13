import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import guacLogo from "../assets/avocado.png";
import AuthDialog from "./AuthDialog";
import { useTheme } from "@mui/material";
import { RootState } from "../redux/store";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import {
  openLoginModal,
  openRegisterModal,
  closeAuthModal,
} from "../redux/features/ui/uiSlice";
import Menu from "./Menu";
import { useMenuItems } from "../hooks/useMenuItems";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.auth.user);
  const authDialog = useAppSelector((state: RootState) => state.ui.authDialog);

  const [accountMenuAnchorEl, setAccountMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const [languageMenuAnchorEl, setLanguageMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const [userCountryMenuAnchorEl, setUserCountryMenuAnchorEl] =
    useState<null | HTMLElement>(null);

  const theme = useTheme();

  const isAccountMenuOpen = Boolean(accountMenuAnchorEl);
  const isLanguageMenuOpen = Boolean(languageMenuAnchorEl);
  const isUserCountryMenuOpen = Boolean(userCountryMenuAnchorEl);

  const handleAccountMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!accountMenuAnchorEl) {
      setAccountMenuAnchorEl(event.currentTarget);
    }
  };

  const handleAccountMenuClose = () => {
    setAccountMenuAnchorEl(null);
  };

  const handleLanguageMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!languageMenuAnchorEl) {
      setLanguageMenuAnchorEl(event.currentTarget);
    }
  };

  const handleLanguageMenuClose = () => {
    setLanguageMenuAnchorEl(null);
  };

  const handleUserCountryMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!userCountryMenuAnchorEl) {
      setUserCountryMenuAnchorEl(event.currentTarget);
    }
  };

  const handleUserCountryMenuClose = () => {
    setUserCountryMenuAnchorEl(null);
  };

  return (
    <Box
      sx={{
        paddingX: "200px",
        paddingY: "12px",
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box display="flex" alignItems={"center"}>
        <img src={guacLogo} className="logo" alt="Guac logo" height={50} />
        <Box sx={{ marginLeft: "8px" }}>
          <Typography
            variant="h4"
            fontFamily={"Barlow Condensed"}
            fontWeight={700}
            color={theme.palette.primary.main}
          >
            Guac
          </Typography>
          <Typography fontFamily={"Barlow Condensed"} color={"#c0b517"}>
            Your Money, Fast
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        sx={{
          flexGrow: 1,
        }}
      >
        <Box
          display="flex"
          flexDirection={"column"}
          alignItems={"flex-end"}
          sx={{ width: "100%" }}
        >
          <Box
            display="flex"
            justifyContent={"space-between"}
            width="300px"
            marginBottom={"12px"}
          >
            <Box
              display="flex"
              alignItems="center"
              onClick={handleUserCountryMenuClick}
            >
              <img
                src="https://flagsapi.com/US/flat/32.png"
                style={{ borderRadius: "16px" }}
              />
              <Typography sx={{ marginX: "8px" }}>United States</Typography>
              <ExpandMoreOutlinedIcon />
            </Box>
            {/* User Country Menu */}
            <Menu
              anchorEl={userCountryMenuAnchorEl}
              open={isUserCountryMenuOpen}
              handleClick={handleUserCountryMenuClick}
              handleClose={handleUserCountryMenuClose}
              handleSelect={handleUserCountryMenuClose}
              menuItems={useMenuItems().userCountry}
            />
            <>
              <Box
                display="flex"
                alignItems="center"
                onClick={handleLanguageMenuClick}
              >
                <Typography sx={{ marginX: "8px" }}>
                  {user?.language?.name ?? "English"}
                </Typography>
                <ExpandMoreOutlinedIcon />
              </Box>
              {/* Language Menu */}
              <Menu
                anchorEl={languageMenuAnchorEl}
                open={isLanguageMenuOpen}
                handleClick={handleLanguageMenuClick}
                handleClose={handleLanguageMenuClose}
                handleSelect={handleLanguageMenuClose}
                menuItems={useMenuItems().langugage}
              />
            </>
          </Box>
          {!user && (
            <Box
              display={"flex"}
              sx={{
                width: "270px",
              }}
            >
              <Button
                variant="outlined"
                sx={{ mr: "16px" }}
                onClick={() => dispatch(openLoginModal())}
              >
                Sign In
              </Button>
              <Button
                variant="contained"
                sx={{
                  mr: "16px",
                }}
                onClick={() => dispatch(openRegisterModal())}
              >
                Join Now
              </Button>
            </Box>
          )}
          {user && (
            <>
              <Box
                display="flex"
                alignItems="center"
                onClick={handleAccountMenuClick}
              >
                <Typography sx={{ marginX: "8px" }}>Welcome</Typography>
                <ExpandMoreOutlinedIcon />
              </Box>
              {/* Account Menu */}
              <Menu
                anchorEl={accountMenuAnchorEl}
                open={isAccountMenuOpen}
                handleClick={handleAccountMenuClick}
                handleClose={handleAccountMenuClose}
                handleSelect={handleAccountMenuClose}
                menuItems={useMenuItems().account}
              />
            </>
          )}
        </Box>
      </Box>
      <AuthDialog
        open={authDialog.isOpen}
        handleClose={() => dispatch(closeAuthModal())}
        type={authDialog.dialog}
      />
    </Box>
  );
};

export default Navbar;
