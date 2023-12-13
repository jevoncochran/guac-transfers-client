import Button from "@mui/material/Button";

interface Props {
  label: string;
}

const AuthDialogButton = ({ label }: Props) => {
  return (
    <Button variant="contained" sx={{ marginBottom: "16px" }} type="submit">
      {label}
    </Button>
  );
};

export default AuthDialogButton;
