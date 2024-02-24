import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";

interface Props {
  text?: string;
  continueAction?: () => void;
  submitBtn?: boolean;
  isDefault?: boolean;
}

const ContinueButton = ({
  text,
  continueAction,
  submitBtn,
  isDefault = true,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Button
      variant="contained"
      fullWidth
      sx={{
        marginTop: "16px",
        borderRadius: "6px",
        height: "50px",
        cursor: "pointer",
      }}
      onClick={submitBtn ? undefined : continueAction}
      type={submitBtn ? "submit" : "button"}
    >
      {isDefault ? t("sendMoney.continueButtonDefault") : text}
    </Button>
  );
};

export default ContinueButton;
