import Navbar from "../components/Navbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { SITE_PADDING_X } from "../constants";
import { useTheme } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const SendMoney = () => {
  const theme = useTheme();
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
          <FormControl>
            <InputLabel id="demo-simple-select-label" sx={{ color: "#fff" }}>
              {/* <img
                src="https://flagsapi.com/CO/flat/32.png"
                style={{ borderRadius: "16px", marginRight: "8px" }}
              /> */}
              Select Country
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="Age"
              //   onChange={handleChange}
              sx={{
                width: "150px",
                height: "45px",
                color: "#fff",
                border: "1px solid #fff",
              }}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
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
