import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useTheme } from "@mui/material";

const SelectRecipientStep = () => {
  const theme = useTheme();

  return (
    <>
      <Typography variant="h6" fontWeight={700} sx={{ marginBottom: "24px" }}>
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
    </>
  );
};

export default SelectRecipientStep;
