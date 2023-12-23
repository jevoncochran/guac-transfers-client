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
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputGroup = ({
  inputName,
  label,
  value,
  type,
  placeholder,
  onChange,
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
        InputLabelProps={{ shrink: false }}
        placeholder={value ? "" : placeholder}
        onChange={onChange}
      />
    </Box>
  );
};

export default InputGroup;
