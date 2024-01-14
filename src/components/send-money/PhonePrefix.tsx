import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface Props {
  iso: string;
  code: string;
  onClick: () => void;
}

const PhonePrefix = ({ iso, code, onClick }: Props) => {
  return (
    <InputAdornment position="start">
      <Box display="flex" alignItems="center" onClick={onClick}>
        {iso} (+{code}) <ArrowDropDownIcon />
      </Box>
    </InputAdornment>
  );
};

export default PhonePrefix;
