import Button from "@mui/material/Button";

interface Props {
  label: string;
  disabled: boolean;
}

const AuthDialogButton = ({ label, disabled }: Props) => {
  return (
    <Button
      variant="contained"
      sx={{ marginBottom: "16px" }}
      type="submit"
      disabled={disabled}
    >
      {label}
    </Button>
  );
};

export default AuthDialogButton;
