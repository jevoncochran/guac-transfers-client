import Box from "@mui/material/Box";
import { SITE_PADDING_X } from "../constants";
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
    <Box>
      <Box sx={{ paddingX: SITE_PADDING_X, paddingTop: "32px" }}>
        <Box
          sx={{
            width: "100%",
            minHeight: "600px",
            border: `1px solid ${theme.palette.secondary.light}`,
            borderRadius: "6px",
            padding: "24px",
          }}
        >
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
        </Box>
      </Box>
    </Box>
  );
};

export default SendMoney;
