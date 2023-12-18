import Typography from "@mui/material/Typography";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

const EnterRecipientNameStep = () => {
  const deliveryMethod = useAppSelector(
    (state: RootState) => state.transfer.deliveryMethod
  );

  return (
    <div>
      <Typography variant="transferStepHeading">Recipient Name</Typography>
      <Typography variant="subtitle1">
        {`This information should match the name on your recipient's ${
          deliveryMethod === "bankDeposit"
            ? "bank account"
            : "government-issued ID"
        }`}
      </Typography>
    </div>
  );
};

export default EnterRecipientNameStep;
