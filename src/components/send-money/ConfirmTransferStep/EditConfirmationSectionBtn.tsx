import Button from "@mui/material/Button";
import { TransferStep } from "../../../types";
import { useAppDispatch } from "../../../redux/hooks";
import { setTransferStep } from "../../../redux/features/transfer/transferSlice";

interface Props {
  step: TransferStep;
}

const EditConfirmationSectionBtn = ({ step }: Props) => {
  const dispatch = useAppDispatch();
  return (
    <Button
      variant="outlined"
      sx={{ borderRadius: "4px", textTransform: "capitalize", padding: 0 }}
      onClick={() => dispatch(setTransferStep(step))}
    >
      Edit
    </Button>
  );
};

export default EditConfirmationSectionBtn;
