import Button from "@mui/material/Button";

interface Props {
  continueAction: () => void;
}

const ContinueButton = ({ continueAction }: Props) => {
  return (
    <Button
      variant="contained"
      fullWidth
      sx={{ marginTop: "16px", borderRadius: "6px", height: "50px" }}
      onClick={continueAction}
    >
      Continue
    </Button>
  );
};

export default ContinueButton;
