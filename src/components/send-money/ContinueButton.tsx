import Button from "@mui/material/Button";

interface Props {
  continueAction?: () => void;
  submitBtn?: boolean;
}

const ContinueButton = ({ continueAction, submitBtn }: Props) => {
  return (
    <Button
      variant="contained"
      fullWidth
      sx={{ marginTop: "16px", borderRadius: "6px", height: "50px" }}
      onClick={submitBtn ? undefined : continueAction}
      type={submitBtn ? "submit" : "button"}
    >
      Continue
    </Button>
  );
};

export default ContinueButton;
