import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import guacLogo from "../assets/avocado.png";
import AuthDialog from "./auth/AuthDialog";
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
import { NavLink } from "react-router-dom";
import { Country, Language } from "../types";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.auth.user);
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.auth.isLoggedIn
  );
  const authDialog = useAppSelector((state: RootState) => state.ui.authDialog);

  const [language, setLanguage] = useState<Language | null>(null);
  const [userCountry, setUserCountry] = useState<Country | null>(null);
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

  useEffect(() => {
    if (user && isLoggedIn) {
      localStorage.setItem("language", JSON.stringify(user.language));
      localStorage.setItem("country", JSON.stringify(user.country));
    } else {
      const storedLanguage = localStorage.getItem("language");
      const storedCountry = localStorage.getItem("country");
      if (!storedLanguage) {
        localStorage.setItem(
          "language",
          JSON.stringify({ code: "en", name: "English" })
        );
      }
      if (!storedCountry) {
        localStorage.setItem(
          "country",
          JSON.stringify({ code: "US", name: "United States" })
        );
      }
    }
    setLanguage(JSON.parse(localStorage.getItem("language")!));
    setUserCountry(JSON.parse(localStorage.getItem("country")!));
  }, [isLoggedIn, user]);

  return (
    <Box
      sx={{
        paddingX: "200px",
        paddingY: "12px",
        display: "flex",
        alignItems: "center",
        height: "68px",
      }}
    >
      {/* LOGO */}
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

      {/* VIEWS */}
      {isLoggedIn && (
        <Box
          flexGrow={1}
          display="flex"
          justifyContent={"space-evenly"}
          alignItems={"flex-end"}
          sx={{ height: "100%" }}
        >
          <Box>
            <NavLink
              to="/transfer/send"
              style={({ isActive }) => {
                return {
                  textDecoration: "none",
                  fontWeight: isActive ? "bold" : "",
                  color: isActive ? theme.palette.secondary.main : "#000",
                };
              }}
            >
              {({ isActive }) => (
                <Box position={"relative"}>
                  Send Money
                  <Box
                    sx={{
                      display: isActive ? "block" : "none",
                      width: "100%",
                      borderBottom: `6px solid ${theme.palette.secondary.main}`,
                      position: "absolute",
                      bottom: "-8px",
                    }}
                  ></Box>
                </Box>
              )}
            </NavLink>
          </Box>
          <NavLink
            to="/transfer/history"
            style={({ isActive }) => {
              return {
                textDecoration: "none",
                fontWeight: isActive ? "bold" : "",
                color: isActive ? theme.palette.secondary.main : "#000",
              };
            }}
          >
            {({ isActive }) => (
              <Box position={"relative"}>
                Transfer History
                <Box
                  sx={{
                    display: isActive ? "block" : "none",
                    width: "100%",
                    borderBottom: `6px solid ${theme.palette.secondary.main}`,
                    position: "absolute",
                    bottom: "-8px",
                  }}
                ></Box>
              </Box>
            )}
          </NavLink>
          <NavLink
            to="/refer"
            style={({ isActive }) => {
              return {
                textDecoration: "none",
                fontWeight: isActive ? "bold" : "",
                color: isActive ? theme.palette.secondary.main : "#000",
              };
            }}
          >
            {({ isActive }) => (
              <Box position={"relative"}>
                Refer Friends
                <Box
                  sx={{
                    display: isActive ? "block" : "none",
                    width: "100%",
                    borderBottom: `6px solid ${theme.palette.secondary.main}`,
                    position: "absolute",
                    bottom: "-8px",
                  }}
                ></Box>
              </Box>
            )}
          </NavLink>
        </Box>
      )}

      <Box
        display="flex"
        sx={{
          flexGrow: isLoggedIn ? 0 : 1,
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
                src={`https://flagsapi.com/${
                  user?.country?.code ??
                  JSON.parse(localStorage.getItem("country")!)?.code
                }/flat/32.png`}
              />
              {userCountry && (
                <Typography sx={{ marginX: "8px" }}>
                  {userCountry.name}
                </Typography>
              )}
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
                {language && (
                  <Typography sx={{ marginX: "8px" }}>
                    {language.name}
                  </Typography>
                )}
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
          {!isLoggedIn && (
            <Box
              display={"flex"}
              justifyContent={"flex-end"}
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
                onClick={() => dispatch(openRegisterModal())}
              >
                Join Now
              </Button>
            </Box>
          )}

          <Box sx={{ display: isLoggedIn ? "block" : "none" }}>
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
          </Box>
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
