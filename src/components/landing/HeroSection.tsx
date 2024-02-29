import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import families from "../../assets/families.png";
import { useTranslation } from "react-i18next";
import { CONTENT_STYLES } from "../../constants";

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      sx={{
        height: CONTENT_STYLES.heights.heroSection,
        backgroundColor: "#fcfbe6",
        paddingX: "200px",
      }}
    >
      <Box
        display="flex"
        flexDirection={"column"}
        justifyContent={"center"}
        sx={{ width: "45%" }}
      >
        <Typography
          variant="h3"
          fontFamily={"Barlow Condensed"}
          fontWeight={700}
          color={"#609000"}
          textAlign={"center"}
        >
          {t("landing.hero.tagline")}
        </Typography>
        <Button
          variant="contained"
          sx={{ marginTop: "24px", marginX: "auto", width: "150px" }}
        >
          {t("landing.hero.moreInfoButton")}
        </Button>
      </Box>
      <Box
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ width: "45%" }}
      >
        <img
          src={families}
          className="families"
          alt="Guac families"
          height={400}
        />
      </Box>
    </Box>
  );
};

export default HeroSection;
