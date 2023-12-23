import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";

interface Props {
  inputName: string;
  label: string;
  value: string | number;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TransferInputField = ({
  inputName,
  label,
  value,
  placeholder,
  onChange,
}: Props) => {
  return (
    <Box sx={{ marginBottom: "16px" }}>
      <InputLabel>{label}</InputLabel>
      <TextField
        name={inputName}
        value={value ?? ""}
        variant="outlined"
        fullWidth
        InputLabelProps={{ shrink: false }}
        placeholder={value ? "" : placeholder}
        onChange={onChange}
      />
    </Box>
  );
};

export default TransferInputField;
