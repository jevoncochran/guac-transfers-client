import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import Divider from "./Divider";
import Navbar from "./Navbar";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import { SITE_PADDING_X } from "../constants";
import { useTheme } from "@mui/material";

const PageLayout = () => {
  const theme = useTheme();

  const isLoggedIn = useAppSelector(
    (state: RootState) => state.auth.isLoggedIn
  );

  return (
    <>
      <Navbar />
      {isLoggedIn && <Divider />}
      {isLoggedIn ? (
        <Box sx={{ paddingX: SITE_PADDING_X, paddingTop: "32px" }}>
          <Box
            sx={{
              width: "100%",
              minHeight: "600px",
              border: `1px solid ${theme.palette.secondary.light}`,
              borderRadius: "6px",
              padding: "24px",
            }}
          >
            <Outlet />
          </Box>
        </Box>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PageLayout;
