import Box from "@mui/material/Box";
import TimelineIcon from "@mui/icons-material/Timeline";
import DiscountIcon from "@mui/icons-material/Discount";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { CONTENT_STYLES } from "../../constants";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

// TODO: Break the different sections of the pitch into their own components
const PitchSection = () => {
  const { t } = useTranslation();

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
          <Typography variant="h5">
            {t("landing.pitch.convenience.label")}
          </Typography>
          <Typography align="center">
            {t("landing.pitch.convenience.text")}
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
          <Typography variant="h5">
            {" "}
            {t("landing.pitch.price.label")}
          </Typography>
          <Typography align="center">
            {t("landing.pitch.price.text")}
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
          <Typography variant="h5">
            {" "}
            {t("landing.pitch.speed.label")}
          </Typography>
          <Typography align="center">
            {t("landing.pitch.speed.text")}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PitchSection;
