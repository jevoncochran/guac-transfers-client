import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import guacLogo from "../assets/avocado.png";

const Navbar = () => {
  return (
    <Box sx={{ paddingX: "200px", position: "relative" }}>
      <Box display="flex" sx={{ paddingLeft: "70%" }}>
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
      <Box
        position="relative"
        display={"flex"}
        alignItems={"center"}
      >
        <Box display="flex">
          <img src={guacLogo} className="logo" alt="Guac logo" width={50} />
          <Box sx={{ marginLeft: "8px" }}>
            <Typography
              variant="h4"
              fontFamily={"Barlow Condensed"}
              fontWeight={700}
              color={"#609000"}
            >
              Guac
            </Typography>
            <Typography fontFamily={"Barlow Condensed"} color={"#c0b517"}>
              Your Money, Fast
            </Typography>
          </Box>
        </Box>
        <Box
          display={"flex"}
          sx={{
            position: "absolute",
            top: "50%",
            paddingLeft: "70%",
            transform: "translateY(-50%)",
            paddingY: "auto",
          }}
        >
          <Button variant="outlined" sx={{ mr: "16px" }}>
            Sign In
          </Button>
          <Button
            variant="contained"
            sx={{
              mr: "16px",
            }}
          >
            Join Now
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
