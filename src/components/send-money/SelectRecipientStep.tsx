import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  goToNextTransferStep,
  selectPreviousRecipient,
} from "../../redux/features/transfer/transferSlice";
import OptionCard from "./OptionCard";
import axios from "axios";
import { RootState } from "../../redux/store";
import { DeliveryMethod, PreviousTransferRecipient } from "../../types";

const SelectRecipientStep = () => {
  const theme = useTheme();

  const dispatch = useAppDispatch();

  const user = useAppSelector((state: RootState) => state.auth.user);

  const [recipients, setRecipients] = useState<PreviousTransferRecipient[]>([]);

  const parseRecipientDeliveryMethod = (
    deliveryMethod: DeliveryMethod,
    institution: string,
    accountNumber: string | null = null
  ) => {
    if (deliveryMethod === "bankDeposit") {
      return `${institution} account ending in ${accountNumber?.slice(-4)}`;
    } else {
      return `Cash pickup at ${institution}`;
    }
  };

  const handleSelect = (value: unknown) => {
    dispatch(selectPreviousRecipient(value));
    dispatch(goToNextTransferStep());
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/recipients?senderId=${user?.id}`)
      .then((res) => {
        setRecipients(res.data);
      });
  }, []);

  return (
    <>
      <Typography variant="transferStepHeading">
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
      {recipients.map((recipient) => (
        <OptionCard
          key={recipient.id}
          label={`${recipient.firstName} ${recipient.lastName}`}
          sublabel={parseRecipientDeliveryMethod(
            recipient.deliveryMethod,
            recipient.institution,
            recipient.accountNumber
          )}
          handleClick={handleSelect}
          value={recipient}
        />
      ))}
    </>
  );
};

export default SelectRecipientStep;
