import Box from "@mui/material/Box";
import { Typography, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import useGetTransferStep from "../hooks/useGetTransferStep";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { RootState } from "../redux/store";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { goToPreviousTransferStep } from "../redux/features/transfer/transferSlice";

const SendMoney = () => {
  const theme = useTheme();

  const dispatch = useAppDispatch();

  const transferStep = useAppSelector(
    (state: RootState) => state.transfer.step
  );

  return (
    <>
      {transferStep > 1 && (
        <Button
          sx={{
            borderRadius: "6px",
            padding: "12px",
            "&:hover": {
              backgroundColor: theme.palette.primary.light,
            },
          }}
          onClick={() => dispatch(goToPreviousTransferStep())}
        >
          <ArrowBackIcon />
          <Typography>Back</Typography>
        </Button>
      )}
      <Box sx={{ paddingX: "280px", paddingY: "24px" }}>
        {useGetTransferStep(transferStep).component}
      </Box>
    </>
  );
};

export default SendMoney;
