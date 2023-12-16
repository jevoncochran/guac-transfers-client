import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useTheme } from "@mui/material";
import { useAppDispatch } from "../../redux/hooks";
import { goToNextTransferStep } from "../../redux/features/transfer/transferSlice";
import OptionCard from "./OptionCard";

const SelectRecipientStep = () => {
  const theme = useTheme();

  const dispatch = useAppDispatch();

  return (
    <>
      <Typography
        variant="transferStepHeading"
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
        <Box
          display={"flex"}
          sx={{ cursor: "pointer" }}
          onClick={() => dispatch(goToNextTransferStep())}
        >
          <PersonAddIcon
            sx={{
              marginRight: "8px",
              color: theme.palette.primary.main,
            }}
            fontSize="medium"
          />
          <Typography>New Recipient</Typography>
        </Box>
      </Box>
      <OptionCard
        label="Jair Asprilla"
        sublabel="Bancolombia account ending in 5569"
      />
    </>
  );
};

export default SelectRecipientStep;
