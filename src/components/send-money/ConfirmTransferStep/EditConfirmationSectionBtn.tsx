import Button from "@mui/material/Button";
import { TransferStep } from "../../../types";
import { useAppDispatch } from "../../../redux/hooks";
import { setTransferStep } from "../../../redux/features/transfer/transferSlice";
import { useTranslation } from "react-i18next";

interface Props {
  step: TransferStep;
}

const EditConfirmationSectionBtn = ({ step }: Props) => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  return (
    <Button
      variant="outlined"
      sx={{ borderRadius: "4px", textTransform: "capitalize", padding: 0 }}
      onClick={() => dispatch(setTransferStep(step))}
    >
      {t("sendMoney.confirmTransfer.editButton")}
    </Button>
  );
};

export default EditConfirmationSectionBtn;
