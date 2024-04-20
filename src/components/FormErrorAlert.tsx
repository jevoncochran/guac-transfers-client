import Alert from "@mui/material/Alert";

interface Props {
  error: string;
}

const FormErrorAlert = ({ error }: Props) => {
  return error ? (
    <Alert severity="error" sx={{ marginBottom: "16px" }}>
      {error}
    </Alert>
  ) : null;
};

export default FormErrorAlert;

