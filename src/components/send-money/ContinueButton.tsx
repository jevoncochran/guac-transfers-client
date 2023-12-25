import Button from "@mui/material/Button";

interface Props {
  text?: string;
  continueAction?: () => void;
  submitBtn?: boolean;
}

const ContinueButton = ({
  text = "Continue",
  continueAction,
  submitBtn,
}: Props) => {
  return (
    <Button
      variant="contained"
      fullWidth
      sx={{ marginTop: "16px", borderRadius: "6px", height: "50px" }}
      onClick={submitBtn ? undefined : continueAction}
      type={submitBtn ? "submit" : "button"}
    >
      {text}
    </Button>
  );
};

export default ContinueButton;
