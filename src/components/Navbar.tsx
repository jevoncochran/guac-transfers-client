import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import guacLogo from "../assets/avocado.png";
import AuthDialog from "./AuthDialog";
import { useTheme } from "@mui/material";
import { RootState } from "../redux/store";
import { useAppSelector } from "../redux/hooks";

const Navbar = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);

  const [open, setOpen] = useState(false);
  const [authDialogType, setAuthDialogType] = useState<string | null>(null);

  const theme = useTheme();

  const openSignIn = () => {
    setAuthDialogType("signIn");
    setOpen(true);
  };

  const openSignUp = () => {
    setAuthDialogType("signUp");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      <Box
        display="flex"
        alignItems={"center"}
      >
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
            width="270px"
            marginBottom={"12px"}
          >
            <Box display="flex" alignItems="center">
              <img
                src="https://flagsapi.com/US/flat/32.png"
                style={{ borderRadius: "16px" }}
              />
              <Typography sx={{ marginX: "8px" }}>United States</Typography>
              <ExpandMoreOutlinedIcon />
            </Box>
            <Box display="flex" alignItems="center">
              <Typography sx={{ marginX: "8px" }}>English</Typography>
              <ExpandMoreOutlinedIcon />
            </Box>
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
                onClick={openSignIn}
              >
                Sign In
              </Button>
              <Button
                variant="contained"
                sx={{
                  mr: "16px",
                }}
                onClick={openSignUp}
              >
                Join Now
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      <AuthDialog open={open} handleClose={handleClose} type={authDialogType} />
    </Box>
  );
};

export default Navbar;
