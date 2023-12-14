import Box from "@mui/material/Box";
import { SITE_PADDING_X } from "../constants";
import { useTheme } from "@mui/material";
import SelectRecipientStep from "../components/send-money/SelectRecipientStep";

const SendMoney = () => {
  const theme = useTheme();

  return (
    <Box>
      <Box sx={{ paddingX: SITE_PADDING_X, paddingTop: "32px" }}>
        <Box
          sx={{
            width: "100%",
            height: "600px",
            border: `1px solid ${theme.palette.secondary.light}`,
            borderRadius: "6px",
          }}
        >
          <SelectRecipientStep />
        </Box>
      </Box>
    </Box>
  );
};

export default SendMoney;