import Navbar from "../components/Navbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const SendMoney = () => {
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
      </Box>
    </>
  );
};

export default SendMoney;
