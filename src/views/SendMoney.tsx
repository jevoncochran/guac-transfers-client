import Box from "@mui/material/Box";
import { SITE_PADDING_X } from "../constants";
import { useTheme } from "@mui/material";
import SelectRecipientStep from "../components/send-money/SelectRecipientStep";
import SelectAmountStep from "../components/send-money/SelectAmountStep";

const SendMoney = () => {
  const theme = useTheme();

  return (
    <Box>
      <Box sx={{ paddingX: SITE_PADDING_X, paddingTop: "32px" }}>
        <Box
          sx={{
            width: "100%",
            minHeight: "600px",
            border: `1px solid ${theme.palette.secondary.light}`,
            borderRadius: "6px",
          }}
        >
          <Box sx={{ paddingX: "280px", paddingY: "24px" }}>
            <SelectAmountStep />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SendMoney;
