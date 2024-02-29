import Box from "@mui/material/Box";
import TimelineIcon from "@mui/icons-material/Timeline";
import DiscountIcon from "@mui/icons-material/Discount";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { CONTENT_STYLES } from "../../constants";
import { Typography } from "@mui/material";

// TODO: Break the different sections of the pitch into their own components
const PitchSection = () => {
  return (
    <Box
      height={`calc(100vh - ${CONTENT_STYLES.heights.navBar} - ${CONTENT_STYLES.heights.heroSection})`}
      paddingX={CONTENT_STYLES.sitePaddingX}
      display="flex"
      alignItems="center"
    >
      <Box display="flex" justifyContent="space-between">
        <Box
          width="30%"
          display="flex"
          gap={1}
          flexDirection="column"
          alignItems="center"
        >
          <TimelineIcon fontSize="large" color="primary" />
          <Typography variant="h5">Peace of mind</Typography>
          <Typography align="center">
            Send within minutes from your phone. Status updates for you and your
            recipient.
          </Typography>
        </Box>
        <Box
          width="30%"
          display="flex"
          gap={1}
          flexDirection="column"
          alignItems="center"
        >
          <DiscountIcon fontSize="large" color="primary" />
          <Typography variant="h5">Save on fees</Typography>
          <Typography align="center">
            Send for less. Our fees are much lower than our competitors.
          </Typography>
        </Box>
        <Box
          width="30%"
          display="flex"
          gap={1}
          flexDirection="column"
          alignItems="center"
        >
          <AccessTimeIcon fontSize="large" color="primary" />
          <Typography variant="h5">On time</Typography>
          <Typography align="center">
            Every transfer carries a delivery promise. We deliver your transfer
            on time or your money back.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PitchSection;
