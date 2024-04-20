import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import { HTMLInputTypeAttribute } from "react";

interface Props {
  inputName: string;
  label?: string;
  value: string | number;
  type?: HTMLInputTypeAttribute;
  placeholder: string;
  startAdornment?: JSX.Element;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
}

const InputGroup = ({
  inputName,
  label,
  value,
  type,
  placeholder,
  startAdornment,
  onChange,
  error,
}: Props) => {
  return (
    <Box sx={{ marginBottom: "16px" }}>
      {label && <InputLabel>{label}</InputLabel>}
      <TextField
        name={inputName}
        value={value ?? ""}
        type={type}
        variant="outlined"
        fullWidth
        InputProps={{
          startAdornment,
        }}
        InputLabelProps={{ shrink: false }}
        placeholder={value ? "" : placeholder}
        onChange={onChange}
        error={error ? true : false}
      />
    </Box>
  );
};

export default InputGroup;
