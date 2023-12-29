import Typography from "@mui/material/Typography";
import ContinueButton from "./ContinueButton";
import { useAppDispatch } from "../../redux/hooks";
import { clearTransfer } from "../../redux/features/transfer/transferSlice";

const SuccessStep = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <Typography variant="transferStepHeading">Successful Transfer</Typography>
      <Typography>369,600.00 COP</Typography>
      <Typography>Received by Jair Stiven Asprilla</Typography>

      <Typography>
        We have confirmed your funds were deposited to your recipient's
        Bancolombia account. Your transaction is complete and we hope to see you
        again.
      </Typography>
      <ContinueButton
        text="New Transfer"
        continueAction={() => dispatch(clearTransfer())}
      />
    </div>
  );
};

export default SuccessStep;
